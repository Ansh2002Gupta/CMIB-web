import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import { useConsentTableColumns } from "./ConsentTableConfig";
import DataTable from "../../components/DataTable/DataTable";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import {
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
  DEFAULT_PAGE_SIZE,
} from "../../constant/constant";
import styles from "./ConsentTable.module.scss";
import "./Override.css";

const ConsentTable = ({
  activeTab,
  isEdit,
  totalData,
  registration,
  setTableData,
  tableData,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );

  const updateTableData =
    (totalData, setTableData) => (currentPageNumber, currentPageSize) => {
      const startIndex = (currentPageNumber - 1) * currentPageSize;
      const endIndex = currentPageNumber * currentPageSize;
      const updatedData = totalData.slice(startIndex, endIndex);
      setTableData(updatedData);
    };

  const onDateChange = (record, key, value) => {
    const index = tableData.findIndex((item) => item.sNo === record.sNo);
    const newData = [...tableData];
    newData[index][key] = value;
    setTableData(newData);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, newPageNumber);
      return prev;
    });
    updateTableData(newPageNumber, pageSize);
  };

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, size);
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      return prev;
    });
    updateTableData(1, size);
  };

  const columns = useConsentTableColumns(isEdit, registration, onDateChange);

  useLayoutEffect(() => {
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    const availalblePage = Math.ceil(totalData.length / currentPagePerRow);
    if (
      !currentPage ||
      isNaN(currentPage) ||
      currentPage <= 0 ||
      currentPage > availalblePage
    ) {
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

  useEffect(() => {
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    const availalblePage = Math.ceil(totalData.length / currentPagePerRow);
    const startIndex =
      availalblePage >= currentPage ? (currentPage - 1) * currentPagePerRow : 0;
    const endIndex = currentPage * currentPagePerRow;
    const updatedData = totalData.slice(startIndex, endIndex);
    setTableData(updatedData);

    console.log();
  }, [current, pageSize, searchParams, activeTab]);

  return (
    <DataTable
      columns={columns}
      current={searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE)}
      pageSize={pageSize}
      onChangePageSize={onChangePageSize}
      onChangeCurrentPage={onChangeCurrentPage}
      currentDataLength={totalData.length}
      customContainerStyles={[styles.table, "customConsentTable"].join(" ")}
      originalData={tableData}
    />
  );
};

ConsentTable.defaultProps = {
  isEdit: false,
  totalData: [],
  registration: false,
  setTableData: () => {},
  tableData: [],
};

ConsentTable.propTypes = {
  isEdit: PropTypes.bool,
  totalData: PropTypes.array,
  registration: PropTypes.bool,
  setTableData: PropTypes.func,
  tableData: PropTypes.array,
};

export default ConsentTable;
