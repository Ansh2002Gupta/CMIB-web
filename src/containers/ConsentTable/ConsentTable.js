import React from "react";
import PropTypes from "prop-types";

import DataTable from "../../components/DataTable/DataTable";
import useConsentTableColumns from "./ConsentTableConfig";
import styles from "./ConsentTable.module.scss";
import "./Override.css";

const ConsentTable = ({
  isEdit,
  registration,
  setTableData,
  tableData,
  totalData,
}) => {
  const onDateChange = (record, key, value) => {
    const index = tableData.findIndex((item) => item.sNo === record.sNo);
    const newData = [...tableData];
    newData[index][key] = value;
    setTableData(newData);
  };

  const columns = useConsentTableColumns(isEdit, registration, onDateChange);

  return (
    <DataTable
      {...{ columns }}
      currentDataLength={totalData.length}
      customContainerStyles={[styles.table, "customConsentTable"].join(" ")}
      hidePagination
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
