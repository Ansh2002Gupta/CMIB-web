import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

import {
  useConsentTableColumns,
  onDateChange as handleDateChange,
} from "./ConsentTableConfig";
import DataTable from "../../components/DataTable/DataTable";
import styles from "./ConsentTable.module.scss";
import "./Override.css";

const ConsentTable = ({
  isEdit,
  originalData,
  registration = false,
  setTableData,
  tableData,
}) => {
  const columns = useConsentTableColumns(
    isEdit,
    registration,
    handleDateChange(tableData, setTableData)
  );

  return (
    // <Table
    //   columns={columns}
    //   dataSource={tableData}
    //   pagination={false}
    //   rowClassName={styles.rowtext}
    //   scroll={{ x: "max-content" }}
    //   className={[styles.table, "customConsentTable"]}
    //   rowKey="id"
    // />
    <DataTable
      {...{
        columns,
        // current,
        // pageSize,
        // onChangePageSize,
        // onChangeCurrentPage,
        originalData,
      }}
      currentDataLength={originalData.length}
      customContainerStyles={[styles.table]}
      // customContainerStyles={styles.tableContainer}
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
