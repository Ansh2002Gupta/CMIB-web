import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import DataTable from "../../components/DataTable/DataTable";
import useConsentTableColumns from "./ConsentTableConfig";
import styles from "./ConsentTable.module.scss";
import "./Override.css";

const ConsentTable = ({ isEdit, registration, setTableData, tableData }) => {
  const onDateChange = (record, key, value) => {
    const index = tableData.findIndex((item) => item.id === record.id);
    const newData = [...tableData];
    newData[index][key] = value && dayjs(value).format("YYYY-MM-DD");
    setTableData(newData);
  };

  const columns = useConsentTableColumns(isEdit, registration, onDateChange);

  return (
    <DataTable
      {...{ columns }}
      currentDataLength={tableData.length}
      customContainerStyles={[styles.table, "customConsentTable"].join(" ")}
      hidePagination
      originalData={tableData}
    />
  );
};

ConsentTable.defaultProps = {
  isEdit: false,
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
