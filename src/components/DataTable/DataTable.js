import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Pagination, Select, Table, Typography } from "antd";

import PaginationItems from "./PaginationItems";
import {
  PAGE_SIZE,
  ROW_PER_PAGE_OPTIONS,
} from "../../constant/constant";
import styles from "./DataTable.module.scss";
import "./override.css";

const DataTable = ({
  columns,
  columnsToBeSearchFrom,
  currentDataLength,
  customContainerStyles,
  originalData,
  searchedValue,
  setCurrentDataLength,
  setPageSize,
  setCurrent,
  current,
  pageSize,
}) => {
  const intl = useIntl();

  const [currentTableData, setCurrentTableData] = useState(originalData);

  const handleOnChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
  };

  useEffect(() => {
    setCurrentTableData(originalData);
  }, [originalData]);

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
    <div className={customContainerStyles}>
      <Table
        columns={columns}
        dataSource={currentTableData}
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
            defaultValue={PAGE_SIZE}
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
  paginationApi: () => {},
};

DataTable.propTypes = {
  columns: PropTypes.array,
  columnsToBeSearchFrom: PropTypes.array,
  currentDataLength: PropTypes.number,
  customContainerStyles: PropTypes.string,
  originalData: PropTypes.array,
  searchedValue: PropTypes.string,
  setCurrentDataLength: PropTypes.func,
  paginationApi: PropTypes.func,
};

export default DataTable;
