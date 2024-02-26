import React, { useContext } from "react";
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
  arrayContainingSelectedRow,
  columns,
  current,
  currentDataLength,
  customContainerStyles,
  customTableClassName,
  hover,
  keytoFindSelectedRow,
  onChangeCurrentPage,
  onChangePageSize,
  originalData,
  pageSize,
  pagination,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  const setRowClassName = (record, index) => {
    if (arrayContainingSelectedRow.includes(record?.[keytoFindSelectedRow])) {
      return [styles.rowBG, styles.rowtext].join(" ");
    }
    return styles.rowtext;
  };

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
        scroll={responsiveStyle}
        className={[
          styles.table,
          customTableClassName,
          !pagination && "nopagination",
          hover ? "customTableHover" : "customTableNoHover",
        ]}
        rowClassName={setRowClassName}
        rowKey="id"
      />
      {pagination && (
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
            className={[styles.paginationContainer].join(" ")}
            itemRender={(current, type, originalElement) => (
              <PaginationItems
                {...{ current, type, originalElement }}
                disabled={originalData.length <= 0}
              />
            )}
            showLessItems
          />
        </div>
      )}
    </div>
  );
};

DataTable.defaultProps = {
  arrayContainingSelectedRow: [],
  columns: [],
  current: 1,
  currentDataLength: 0,
  customContainerStyles: "",
  hover: true,
  keytoFindSelectedRow: "id",
  onChangeCurrentPage: () => {},
  onChangePageSize: () => {},
  originalData: [],
  pageSize: DEFAULT_PAGE_SIZE,
  pagination: true,
};

DataTable.propTypes = {
  arrayContainingSelectedRow: PropTypes.array,
  columns: PropTypes.array,
  current: PropTypes.number,
  currentDataLength: PropTypes.number,
  customContainerStyles: PropTypes.string,
  hover: PropTypes.bool,
  keytoFindSelectedRow: PropTypes.string,
  onChangeCurrentPage: PropTypes.func,
  onChangePageSize: PropTypes.func,
  originalData: PropTypes.array,
  pageSize: PropTypes.number,
  pagination: PropTypes.bool,
};

export default DataTable;
