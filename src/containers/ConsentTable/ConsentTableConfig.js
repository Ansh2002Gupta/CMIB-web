import React, { useLayoutEffect } from "react";
import { useIntl } from "react-intl";

import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";
import styles from "./ConsentTable.module.scss";
import "./Override.css";

export const updateTableData =
  (originalData, setTableData) => (currentPageNumber, currentPageSize) => {
    const startIndex = (currentPageNumber - 1) * currentPageSize;
    const endIndex = currentPageNumber * currentPageSize;
    const updatedData = originalData.slice(startIndex, endIndex);
    setTableData(updatedData);
  };

export const onChangePageSize =
  (setSearchParams, setPageSize, setCurrent, updateTableData) => (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, size);
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      return prev;
    });
    updateTableData(1, size);
  };

export const onChangeCurrentPage =
  (setSearchParams, setCurrent, updateTableData, pageSize) =>
  (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, newPageNumber);
      return prev;
    });
    updateTableData(newPageNumber, pageSize);
  };

export const usePaginationEffect = (searchParams, setSearchParams) => {
  useLayoutEffect(() => {
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (!currentPage || isNaN(currentPage) || currentPage <= 0) {
      setSearchParams((prev) => {
        prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        return prev;
      });
    }

    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      setSearchParams((prev) => {
        prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, DEFAULT_PAGE_SIZE);
        return prev;
      });
    }
  }, [searchParams, setSearchParams]);
};

export const useConsentTableColumns = (isEdit, registration, onDateChange) => {
  const { renderColumn } = useRenderColumn();
  const intl = useIntl();

  // Define the columns based on registration prop and isEdit state
  const columns = registration
    ? [
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
          title: intl.formatMessage({ id: "label.lastRegistrationDate" }),
          dataIndex: "lastRegistrationDate",
          key: "lastRegistrationDate",
          isRequiredField: true,
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.lastRegistrationDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "lastRegistrationDate", date),
          },
          renderText: { visible: !isEdit, isTypeDate: true },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.psychometricTestDate" }),
          dataIndex: "psychometricTestDate",
          isRequiredField: true,
          key: "psychometricTestDate",
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.psychometricTestDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "psychometricTestDate", date),
          },
          renderText: { visible: true, isTypeDate: true },
        }),
      ]
    : [
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
          title: intl.formatMessage({ id: "label.companyStartDate" }),
          dataIndex: "companyStartDate",
          key: "companyStartDate",
          isRequiredField: true,
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.companyStartDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "companyStartDate", date),
          },
          renderText: { visible: !isEdit, isTypeDate: true },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.consentFromDate" }),
          dataIndex: "companyEndDate",
          isRequiredField: true,
          key: "companyEndDate",
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.companyEndDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "companyEndDate", date),
          },
          renderText: { visible: true, isTypeDate: true },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.consentFromDate" }),
          dataIndex: "consentFromDate",
          isRequiredField: true,
          key: "consentFromDate",
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.consentFromDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "consentFromDate", date),
          },
          renderText: { visible: true, isTypeDate: true },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.consentToDate" }),
          dataIndex: "consentToDate",
          isRequiredField: true,
          key: "consentToDate",
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.consentToDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "consentToDate", date),
          },
          renderText: { visible: true, isTypeDate: true },
        }),
      ];

  return columns;
};

export const onDateChange =
  (tableData, setTableData) => (record, key, value) => {
    const index = tableData.findIndex((item) => item.sNo === record.sNo);
    const newData = [...tableData];
    newData[index][key] = value;
    setTableData(newData);
  };
