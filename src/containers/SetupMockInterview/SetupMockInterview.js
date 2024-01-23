import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "../../core/layouts";

import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";
import { MOCK_INTERVIEW } from "../../dummyData";
import DataTable from "../../components/DataTable/DataTable";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { classes } from "./SetupMockInterview.styles";
import styles from "./SetupMockInterview.module.scss";

const SetupMockInterviewContent = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTableData, setCurrentTableData] = useState(MOCK_INTERVIEW);
  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );

  const updateTableData = (currentPageNumber, currentPageSize) => {
    const startIndex = (currentPageNumber - 1) * currentPageSize;
    const endIndex = currentPageNumber * currentPageSize;
    const updatedData = MOCK_INTERVIEW.slice(startIndex, endIndex);
    setCurrentTableData(updatedData);
  };

  const onChangePageSize = (size) => {
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
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
    updateTableData(newPageNumber, pageSize);
  };

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.sNo" }),
      dataIndex: "sNo",
      key: "sNo",
      renderText: {
        visible: true,
        includeDotAfterText: true,
        textStyles: styles.textStyles,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "centreName",
      key: "centreName",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.totalStudentsBooked" }),
      dataIndex: "totalStudentBooked",
      key: "totalStudentBooked",
      renderText: { visible: true, textStyles: styles.studentStyles },
    }),

    renderColumn({
      title: intl.formatMessage({ id: "label.actions" }),
      dataIndex: "actions",
      key: "actions",
      renderTwoImage: {
        leftAlt: "download",
        rightAlt: "edit",
        leftOnClick: (rowData) => console.log(rowData),
        rightOnClick: (rowData) => console.log(rowData),
        leftPreview: false,
        rightPreview: false,
        leftSrc: getImage("download"),
        rightSrc: getImage("edit"),
        visible: true,
      },
    }),
  ];

  useEffect(() => {
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
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
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
        return prev;
      });
      startIndex = 0;
      endIndex = DEFAULT_PAGE_SIZE;
    }

    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], DEFAULT_PAGE_SIZE);
        return prev;
      });
      startIndex = 0;
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
