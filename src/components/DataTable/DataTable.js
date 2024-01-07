import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Pagination, Select, Table, Typography } from "antd";

import PaginationItems from "./PaginationItems";
import { PAGE_SIZE, ROW_PER_PAGE_OPTIONS } from "../../constant/constant";
import styles from "./DataTable.module.scss";
import "./override.css";

const DataTable = ({
  columns,
  currentDataLength,
  customContainerStyles,
  originalData,
  pageSize,
  searchedValue,
  setPageSize,
  setCurrent,
  current,
  pageSize,
}) => {
  const intl = useIntl();

  const handleOnChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
  };

  useEffect(() => {
    searchedValue && setCurrent(1);
  }, [searchedValue]);

  const rightPaginationConfig = {
    current,
    pageSize,
    total: currentDataLength,
    onChange: (page) => {
      setCurrent(page);
    },
    showSizeChanger: false,
  };

  return (
    <div className={[styles.container, customContainerStyles].join(" ")}>
      <Table
        columns={columns}
        dataSource={originalData}
        pagination={false}
        rowClassName={styles.rowtext}
        scroll={{ x: "max-content" }}
        className={styles.table}
        rowKey="id"
      />
      <div className={styles.rowPerPageOptionsAndPaginationContainer}>
        <div className={styles.rowPerPageContainer}>
          <Typography className={styles.rowPerPageText}>
            {intl.formatMessage({ id: "label.rowPerPage" })}
          </Typography>
          <Select
            defaultValue={pageSize}
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
  currentDataLength: 0,
  customContainerStyles: "",
  currentTableData: [],
  originalData: [],
  searchedValue: "",
  paginationApi: () => {},
  pageSize: PAGE_SIZE,
  current: 1,
};

DataTable.propTypes = {
  columns: PropTypes.array,
  currentDataLength: PropTypes.number,
  customContainerStyles: PropTypes.string,
  currentTableData: PropTypes.array,
  originalData: PropTypes.array,
  searchedValue: PropTypes.string,
  paginationApi: PropTypes.func,
  pageSize: PropTypes.number,
  current: PropTypes.number,
};

export default DataTable;
