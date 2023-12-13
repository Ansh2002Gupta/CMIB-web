import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Image, Pagination, Select, Table, Typography } from "antd";

import useResponsive from "../../core/hooks/useResponsive";
import arrowRight from "../../themes/base/assets/images/arrow-right.svg";
import { ROW_PER_PAGE_OPTIONS } from "../../Constants/Constants";
import styles from "./DataTable.module.scss";
import "./override.css";

const DataTable = ({
  columns,
  columnsToBeSearchFrom,
  currentDataLength,
  currentTableData,
  originalData,
  searchedValue,
  setCurrentDataLength,
  setCurrentTableData,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
    setCurrent(1);
    if (searchedValue.trim().length === 0) {
      setCurrentDataLength(originalData.length);
    } else {
      setCurrentDataLength(updatedData.length);
    }
  }, [searchedValue]);

  const handleOnChangePageSize = (size) => {
    setPageSize(size);
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
      setCurrent(page);
    },
    showSizeChanger: false,
  };

  useEffect(() => {
    return () => {
      setCurrent(1);
      setPageSize(10);
    };
  }, []);

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <div
          className={[styles.nextAndPrevArrowContainer, styles.rowReverse].join(
            " "
          )}
        >
          <Image
            src={arrowRight}
            preview={false}
            className={styles.prevArrow}
          />
          {responsive.isLg ? (
            <Typography className={styles.nextAndPrevText}>
              {intl.formatMessage({ id: "label.previous" })}
            </Typography>
          ) : null}
        </div>
      );
    }
    if (type === "next") {
      return (
        <div className={styles.nextAndPrevArrowContainer}>
          <Image src={arrowRight} preview={false} />
          {responsive.isLg ? (
            <Typography className={styles.nextAndPrevText}>
              {intl.formatMessage({ id: "label.next" })}
            </Typography>
          ) : null}
        </div>
      );
    }
    return originalElement;
  };

  useEffect(() => {
    return () => {
      setCurrent(1);
      setPageSize(10);
    };
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={currentTableData}
        pagination={false}
        rowClassName={styles.rowtext}
        scroll={{ x: "max-content" }}
        className={styles.tableBody}
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
          {...{ itemRender }}
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
  originalData: PropTypes.array,
  searchedValue: PropTypes.string,
  setCurrentDataLength: PropTypes.func,
  setCurrentTableData: PropTypes.func,
};

export default DataTable;
