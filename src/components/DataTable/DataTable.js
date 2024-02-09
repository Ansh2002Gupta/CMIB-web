import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Image, Pagination, Select, Table, Typography } from "antd";

import { ThemeContext } from "core/providers/theme";

import PaginationItems from "./PaginationItems";
import {
  DEFAULT_PAGE_SIZE,
  ROW_PER_PAGE_OPTIONS,
} from "../../constant/constant";
import styles from "./DataTable.module.scss";
import "./overrides.css";

const DataTable = ({
  columns,
  current,
  currentDataLength,
  customContainerStyles,
  onChangeCurrentPage,
  onChangePageSize,
  originalData,
  pageSize,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  const rightPaginationConfig = {
    current,
    pageSize,
    total: currentDataLength,
    onChange: onChangeCurrentPage,
    showSizeChanger: false,
  };

  const responsiveStyle = { x: "max-content" };

  return (
    <div className={[styles.container, customContainerStyles].join(" ")}>
      <Table
        columns={columns}
        dataSource={originalData}
        pagination={false}
        rowClassName={styles.rowtext}
        scroll={responsiveStyle}
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
            onChange={onChangePageSize}
            options={ROW_PER_PAGE_OPTIONS}
            suffixIcon={
              <Image src={getImage("blackArrowDown")} preview={false} />
            }
          />
        </div>
        <Pagination
          disabled={originalData.length <= 0}
          {...rightPaginationConfig}
          className={styles.paginationContainer}
          itemRender={(current, type, originalElement) => (
            <PaginationItems
              {...{ current, type, originalElement }}
              disabled={originalData.length <= 0}
            />
          )}
          showLessItems
        />
      </div>
    </div>
  );
};

DataTable.defaultProps = {
  columns: [],
  current: 1,
  currentDataLength: 0,
  customContainerStyles: "",
  onChangeCurrentPage: () => {},
  onChangePageSize: () => {},
  originalData: [],
  pageSize: DEFAULT_PAGE_SIZE,
};

DataTable.propTypes = {
  columns: PropTypes.array,
  current: PropTypes.number,
  currentDataLength: PropTypes.number,
  customContainerStyles: PropTypes.string,
  onChangeCurrentPage: PropTypes.func,
  onChangePageSize: PropTypes.func,
  originalData: PropTypes.array,
  pageSize: PropTypes.number,
};

export default DataTable;