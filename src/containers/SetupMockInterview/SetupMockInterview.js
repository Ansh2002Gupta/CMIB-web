import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "../../core/layouts";

import DataTable from "../../components/DataTable/DataTable";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useFetch from "../../core/hooks/useFetch";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import getSetupMockColumn from "./SetupMockInterviewConfig";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";
import { MOCK_INTERVIEW } from "../../dummyData";
import { SESSION, SETUP_MOCK_INTERVIEW } from "../../routes/routeNames";
import {
  CORE_ROUTE,
  MOCK_INTERVIEWS,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { classes } from "./SetupMockInterview.styles";
import styles from "./SetupMockInterview.module.scss";

const SetupMockInterviewContent = () => {
  const intl = useIntl();
  const isEdit = true;
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();

  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;

  const roundId = 172;
  const { data, error, isLoading } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      MOCK_INTERVIEWS,
  });
  const [currentTableData, setCurrentTableData] = useState(data?.records || []);
  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );

  console.log(data, "data..");

  const goToConfigureInterview = (rowData, isEdit) => {
    const centreId = rowData?.id;
    navigate(
      `/${currentlySelectedModuleKey}/${SESSION}${SETUP_MOCK_INTERVIEW}details/${centreId}?mode=${
        isEdit ? "edit" : "view"
      }`,
      false,
      { current: current, pageSize: pageSize }
    );
  };

  const updateTableData = (currentPageNumber, currentPageSize) => {
    const startIndex = (currentPageNumber - 1) * currentPageSize;
    const endIndex = currentPageNumber * currentPageSize;
    const updatedData = data?.records?.slice(startIndex, endIndex);
    setCurrentTableData(updatedData);
  };

  const onChangePageSize = (size) => {
    //TODO : Replace this code with API Pagination
    setPageSize(Number(size));
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    updateTableData(1, size);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    //TODO : Replace this code with API Pagination
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
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
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );

    let startIndex = (currentPage - 1) * currentPagePerRow;
    let endIndex = currentPage * currentPagePerRow;
    const availalblePage = Math.ceil(data?.records.length / currentPagePerRow);
    if (
      !currentPage ||
      isNaN(currentPage) ||
      currentPage <= 0 ||
      currentPage > availalblePage
    ) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
        return prev;
      });
      setCurrent(1);
      startIndex = 0;
      endIndex = currentPagePerRow;
    }
    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], DEFAULT_PAGE_SIZE);
        return prev;
      });
      startIndex = currentPage;
      endIndex = DEFAULT_PAGE_SIZE;
    }
    const updatedData = data?.records.slice(startIndex, endIndex);
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
          currentDataLength={data?.records.length}
          customContainerStyles={styles.tableContainer}
          originalData={currentTableData}
        />
      }
      bottomSectionStyle={classes.bottomSectionStyle}
    />
  );
};
export default SetupMockInterviewContent;
