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
  isHoverEffectRequired,
  isRowVerticalTop,
  hidePagination,
  keytoFindSelectedRow,
  onChangeCurrentPage,
  onChangePageSize,
  originalData,
  pageSize,
  showTableBorderBottom,
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
          hidePagination && !showTableBorderBottom && "nopagination",
          isHoverEffectRequired ? "customTableHover" : "customTableNoHover",
          isRowVerticalTop ? "tableRowStyle" : "",
        ]}
        rowClassName={setRowClassName}
        rowKey="id"
      />
      {!hidePagination && (
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
  isHoverEffectRequired: true,
  isRowVerticalTop: true,
  keytoFindSelectedRow: "id",
  hidePagination: false,
  onChangeCurrentPage: () => {},
  onChangePageSize: () => {},
  originalData: [],
  pageSize: DEFAULT_PAGE_SIZE,
  keytoFindSelectedRow: "id",
};

DataTable.propTypes = {
  arrayContainingSelectedRow: PropTypes.array,
  columns: PropTypes.array,
  current: PropTypes.number,
  currentDataLength: PropTypes.number,
  customContainerStyles: PropTypes.string,
  isHoverEffectRequired: PropTypes.bool,
  isRowVerticalTop: PropTypes.bool,
  keytoFindSelectedRow: PropTypes.string,
  hidePagination: PropTypes.bool,
  onChangeCurrentPage: PropTypes.func,
  onChangePageSize: PropTypes.func,
  originalData: PropTypes.array,
  keytoFindSelectedRow: PropTypes.string,
  pageSize: PropTypes.number,
  showTableBorderBottom: PropTypes.bool,
};

export default DataTable;
