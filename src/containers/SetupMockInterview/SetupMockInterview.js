import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "../../core/layouts";

import DataTable from "../../components/DataTable/DataTable";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import getSetupMockColumn from "./SetupMockInterviewConfig";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";
import { MOCK_INTERVIEW } from "../../dummyData";
import { SESSION, SETUP_MOCK_INTERVIEW } from "../../routes/routeNames";
import { classes } from "./SetupMockInterview.styles";
import styles from "./SetupMockInterview.module.scss";

const SetupMockInterviewContent = () => {
  const intl = useIntl();
  const isEdit = true;
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const [currentTableData, setCurrentTableData] = useState(MOCK_INTERVIEW);
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [current, setCurrent] = useState(
    getValidPageNumber(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE)
    )
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    )
  );

  const goToConfigureInterview = (rowData, isEdit) => {
    const centreId = rowData?.id;
    navigate(
      `/${
        selectedModule?.key
      }/${SESSION}${SETUP_MOCK_INTERVIEW}details/${centreId}?mode=${
        isEdit ? "edit" : "view"
      }`,
      false,
      { current: current, pageSize: pageSize }
    );
  };

  const updateTableData = (currentPageNumber, currentPageSize) => {
    const startIndex = (currentPageNumber - 1) * currentPageSize;
    const endIndex = currentPageNumber * currentPageSize;
    const updatedData = MOCK_INTERVIEW.slice(startIndex, endIndex);
    setCurrentTableData(updatedData);
  };

  const onChangePageSize = (size) => {
    //TODO : Replace this code with API Pagination
    setPageSize(Number(size));
    setCurrent(1);
    const queryParams = {
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: size,
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: 1,
    };
    urlService.setMultipleQueryStringValues(queryParams);
    updateTableData(1, size);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    //TODO : Replace this code with API Pagination
    setCurrent(newPageNumber);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE,
      newPageNumber
    );
    updateTableData(newPageNumber, pageSize);
  };

  const columns = getSetupMockColumn(
    intl,
    isEdit,
    getImage,
    goToConfigureInterview,
    renderColumn
  );

  useEffect(() => {
    const currentPage = +urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE
    );
    const currentPagePerRow = +urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );

    let startIndex = (currentPage - 1) * currentPagePerRow;
    let endIndex = currentPage * currentPagePerRow;
    const availalblePage = Math.ceil(MOCK_INTERVIEW.length / currentPagePerRow);
    if (
      !currentPage ||
      isNaN(currentPage) ||
      currentPage <= 0 ||
      currentPage > availalblePage
    ) {
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      setCurrent(1);
      startIndex = 0;
      endIndex = currentPagePerRow;
    }
    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      urlService.setQueryStringValue(
        PAGINATION_PROPERTIES.ROW_PER_PAGE,
        DEFAULT_PAGE_SIZE
      );
      startIndex = currentPage;
      endIndex = DEFAULT_PAGE_SIZE;
    }
    const updatedData = MOCK_INTERVIEW.slice(startIndex, endIndex);
    setCurrentTableData(updatedData);
  }, []);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <HeadingAndSubHeading
          customContainerStyles={styles.customContainerStyles}
          headingText={intl.formatMessage({
            id: "label.session.setupMockInterviews",
          })}
          subHeadingText={intl.formatMessage({
            id: "label.warning.setupMockInterviews",
          })}
        />
      }
      bottomSection={
        <DataTable
          {...{
            columns,
            current,
            pageSize,
            onChangePageSize,
            onChangeCurrentPage,
          }}
          currentDataLength={MOCK_INTERVIEW.length}
          customContainerStyles={styles.tableContainer}
          originalData={currentTableData}
        />
      }
      bottomSectionStyle={classes.bottomSectionStyle}
    />
  );
};
export default SetupMockInterviewContent;
