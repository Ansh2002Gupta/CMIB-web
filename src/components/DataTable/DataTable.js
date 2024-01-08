import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Pagination, Select, Table, Typography } from "antd";

import PaginationItems from "./PaginationItems";
import {
  DEFAULT_PAGE_SIZE,
  ROW_PER_PAGE_OPTIONS,
} from "../../constant/constant";
import styles from "./DataTable.module.scss";
import "./Override.css";

const DataTable = ({
  columns,
  currentDataLength,
  customContainerStyles,
  originalData,
  current,
  pageSize,
  handleOnChangePageSize,
  handleOnChangeCurrentPage,
}) => {
  const intl = useIntl();

  const rightPaginationConfig = {
    current,
    pageSize,
    total: currentDataLength,
    onChange: handleOnChangeCurrentPage,
    showSizeChanger: false,
  };

  return (
    <div className={[styles.container, customContainerStyles].join(" ")}>
      <Table
        columns={columns}
        dataSource={originalData}
        pagination={false}
        rowClassName={styles.rowtext}
        scroll={{ x: "max-content", y: 600 }}
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
  originalData: [],
  searchedValue: "",
  paginationApi: () => {},
  pageSize: DEFAULT_PAGE_SIZE,
  current: 1,
  handleOnChangePageSize: () => {},
  handleOnChangeCurrentPage: () => {},
};

DataTable.propTypes = {
  columns: PropTypes.array,
  currentDataLength: PropTypes.number,
  customContainerStyles: PropTypes.string,
  originalData: PropTypes.array,
  searchedValue: PropTypes.string,
  paginationApi: PropTypes.func,
  pageSize: PropTypes.number,
  current: PropTypes.number,
  handleOnChangePageSize: PropTypes.func,
  handleOnChangeCurrentPage: PropTypes.func,
};

export default DataTable;
