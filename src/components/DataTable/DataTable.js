import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Pagination, Select, Table, Typography } from "antd";

import PaginationItems from "./PaginationItems";
import useQueryParams from "../../core/hooks/useQueryParams";
import { PAGE_SIZE, ROW_PER_PAGE_OPTIONS } from "../../constant/constant";
import styles from "./DataTable.module.scss";
import "./Override.css";

const DataTable = ({
  columns,
  columnsToBeSearchFrom,
  currentDataLength,
  currentTableData,
  customContainerStyles,
  originalData,
  searchedValue,
  setCurrentDataLength,
  setCurrentTableData,
}) => {
  const intl = useIntl();

  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const { setQueryParams, getQueryParams, removeQueryParams } =
    useQueryParams();
  const [current, setCurrent] = useState(
    Number(getQueryParams("current-page")) || 1
  );

  useEffect(() => {
    const updatedData = originalData?.filter((item) => {
      let isPresent = false;
      for (const [key, value] of Object.entries(item)) {
        if (
          columnsToBeSearchFrom.includes(key) &&
          value.toLowerCase().includes(searchedValue.toLowerCase())
        ) {
          isPresent = true;
        }
      }
      return isPresent;
    });
    setCurrentTableData(updatedData);
    searchedValue && setCurrent(1);
    searchedValue && setQueryParams("current-page", 1);
    if (!searchedValue?.trim()?.length) {
      setCurrentDataLength(originalData.length);
    } else {
      setCurrentDataLength(updatedData.length);
    }
  }, [searchedValue]);

  const handleOnChangePageSize = (size) => {
    setPageSize(Number(size));
    setQueryParams("page-size", Number(size));
    setCurrent(1);
  };

  useEffect(() => {
    const startIndex = (current - 1) * pageSize;
    const endIndex = current * pageSize;
    const updatedData = originalData.slice(startIndex, endIndex);
    setCurrentTableData(updatedData);
  }, [current, pageSize]);

  const rightPaginationConfig = {
    current,
    pageSize,
    total: currentDataLength,
    onChange: (page) => {
      setQueryParams("current-page", page);
      setCurrent(page);
    },
    showSizeChanger: false,
  };

  useEffect(() => {
    return () => {
      setCurrent(1);
      setPageSize(PAGE_SIZE);
      //removeQueryParams();
    };
  }, []);

  return (
    <div className={customContainerStyles}>
      <Table
        columns={columns}
        dataSource={currentTableData}
        pagination={false}
        rowClassName={styles.rowtext}
        scroll={{ x: "max-content" }}
        className={styles.table}
      />
      <div className={styles.rowPerPageOptionsAndPaginationContainer}>
        <div className={styles.rowPerPageContainer}>
          <Typography className={styles.rowPerPageText}>
            {intl.formatMessage({ id: "label.rowPerPage" })}
          </Typography>
          <Select
            defaultValue={"10"}
            className={styles.rowPerPageCount}
            onChange={handleOnChangePageSize}
            options={ROW_PER_PAGE_OPTIONS}
          />
        </div>
        <Pagination
          {...rightPaginationConfig}
          className={styles.paginationContainer}
          itemRender={(current, type, originalElement) => (
            <PaginationItems {...{ current, type, originalElement }} />
          )}
          showLessItems
        />
      </div>
    </div>
  );
};

DataTable.defaultProps = {
  columns: [],
  columnsToBeSearchFrom: [],
  currentDataLength: 0,
  currentTableData: [],
  customContainerStyles: "",
  originalData: [],
  searchedValue: "",
  setCurrentDataLength: () => {},
  setCurrentTableData: () => {},
};

DataTable.propTypes = {
  columns: PropTypes.array,
  columnsToBeSearchFrom: PropTypes.array,
  currentDataLength: PropTypes.number,
  currentTableData: PropTypes.array,
  customContainerStyles: PropTypes.string,
  originalData: PropTypes.array,
  searchedValue: PropTypes.string,
  setCurrentDataLength: PropTypes.func,
  setCurrentTableData: PropTypes.func,
};

export default DataTable;
