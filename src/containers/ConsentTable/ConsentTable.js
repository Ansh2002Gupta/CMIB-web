import React, { useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import {
  useConsentTableColumns,
  onDateChange as handleDateChange,
  updateTableData,
  onChangePageSize,
  onChangeCurrentPage,
  usePaginationEffect,
} from "./ConsentTableConfig";
import DataTable from "../../components/DataTable/DataTable";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { PAGINATION_PROPERTIES } from "../../constant/constant";
import styles from "./ConsentTable.module.scss";
import "./Override.css";

const ConsentTable = ({
  isEdit,
  originalData,
  registration = false,
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

  const columns = useConsentTableColumns(
    isEdit,
    registration,
    handleDateChange(tableData, setTableData)
  );

  const updateData = updateTableData(originalData, setTableData);
  const changePageSize = onChangePageSize(
    setSearchParams,
    setPageSize,
    setCurrent,
    updateData
  );
  const changeCurrentPage = onChangeCurrentPage(
    setSearchParams,
    setCurrent,
    updateData,
    pageSize
  );

  usePaginationEffect(searchParams, setSearchParams);

  return (
    <DataTable
      columns={columns}
      current={current}
      pageSize={pageSize}
      onChangePageSize={changePageSize}
      onChangeCurrentPage={changeCurrentPage}
      currentDataLength={originalData.length}
      customContainerStyles={[styles.table, "customConsentTable"].join(" ")}
      originalData={tableData}
    />
  );
};

ConsentTable.defaultProps = {
  isEdit: false,
  originalData: [],
  registration: false,
  setTableData: () => {},
  tableData: [],
};

ConsentTable.propTypes = {
  isEdit: PropTypes.bool,
  originalData: PropTypes.array,
  registration: PropTypes.bool,
  setTableData: PropTypes.func,
  tableData: PropTypes.array,
};

export default ConsentTable;
