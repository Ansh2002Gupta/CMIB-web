import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import useConsentTableColumns from "./ConsentTableConfig";
import DataTable from "../../components/DataTable/DataTable";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
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

  const updateTableData = (currentPageNumber, currentPageSize) => {
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
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE,
      newPageNumber
    );
    updateTableData(newPageNumber, pageSize);
  };

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    const queryParams = {
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: size,
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: 1,
    };
    urlService.setMultipleQueryStringValues(queryParams);
    updateTableData(1, size);
  };

  const columns = useConsentTableColumns(isEdit, registration, onDateChange);

  useEffect(() => {
    const currentPage = +urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE
    );
    const currentPagePerRow = +urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    const availablePage = Math.ceil(totalData.length / currentPagePerRow);

    let startIndex = (currentPage - 1) * currentPagePerRow;
    let endIndex = currentPage * currentPagePerRow;

    if (
      !currentPage ||
      isNaN(currentPage) ||
      currentPage <= 0 ||
      currentPage > availablePage
    ) {
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      startIndex = 0;
      endIndex = DEFAULT_PAGE_SIZE;
    }

    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      urlService.setQueryStringValue(
        PAGINATION_PROPERTIES.ROW_PER_PAGE,
        DEFAULT_PAGE_SIZE
      );
      startIndex = 0;
      endIndex = DEFAULT_PAGE_SIZE;
    }
    const updatedData = totalData.slice(startIndex, endIndex);
    setTableData(updatedData);
  }, [activeTab]);

  return (
    <DataTable
      {...{ columns, pageSize, onChangePageSize, onChangeCurrentPage }}
      current={
        +urlService.getQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE)
      }
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
