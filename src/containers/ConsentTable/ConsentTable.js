import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import DataTable from "../../components/DataTable/DataTable";
import useConsentTableColumns from "./ConsentTableConfig";
import styles from "./ConsentTable.module.scss";
import "./Override.css";

const ConsentTable = ({
  errors,
  isEdit,
  onDateChange,
  registration,
  registrationDatesData,
  tableData,
}) => {
  const columns = useConsentTableColumns(
    errors,
    isEdit,
    registration,
    registrationDatesData,
    onDateChange
  );

  return (
    <DataTable
      {...{ columns }}
      currentDataLength={tableData.length}
      customContainerStyles={[styles.table, "customConsentTable"].join(" ")}
      isRowVerticalTop={false}
      hidePagination
      originalData={tableData}
      showTableBorderBottom={isEdit}
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
