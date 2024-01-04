import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Table, InputNumber, Image, Typography } from "antd";
import moment from "moment";

import CustomInput from "../../components/CustomInput/CustomInput";
import CustomDateTimePicker from "../../components/CustomDateTimePicker/CustomDateTimePicker";

import styles from "./CentreTable.module.scss";
import "./Override.css";
import { TwoColumn } from "../../core/layouts";

const CentreTable = ({ tableData, setTableData }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const [addTableData, setAddTableData] = useState({
    id: Math.random().toString(),
    isAddRow: true,
    scheduleDate: null,
    participationFee: "",
    firmFee: "",
    uptoPartners: "1",
    firm: { firmFee: "", uptoPartners: "1" },
    norm1: "",
    norm2: "",
    norm2MinVacancy: "",
  });

  const handleRemove = (record) => {
    const filteredData = tableData.filter((item) => item.id !== record.id);
    setTableData(filteredData);
  };

  const handleAdd = (record) => {
    delete record.isAddRow;
    console.log(record, "record");
    setTableData([...tableData, record]);
    setAddTableData({
      id: Math.random().toString(),
      isAddRow: true,
      scheduleDate: null,
      participationFee: "",
      firmFee: "",
      uptoPartners: "1",
      firm: { firmFee: "", uptoPartners: "1" },
      norm1: "",
      norm2: "",
      norm2MinVacancy: "",
    });
  };

  const handleInputChange = (value, name, nestedName) => {
    if (nestedName) {
      setAddTableData((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          [nestedName]: value,
        },
      }));
    } else {
      setAddTableData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const extendedTableData = [...tableData, addTableData];

  const columns = [
    {
      title: () => (
        <Typography className={styles.tableHeader}>
          {intl.formatMessage({ id: "centre.scheduleDate" })}
          <span className={styles.redText}> *</span>
        </Typography>
      ),
      className: styles.tableHeader,
      key: "scheduleDate",
      render: (text, record) => (
        <CustomDateTimePicker
          value={text?.scheduleDate ? moment(text?.scheduleDate) : null}
          type="date"
          disabled={record.isAddRow ? false : true}
          onChange={(val, dateString) => {
            handleInputChange(val, "scheduleDate");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.selectDate",
          })}
        />
      ),
    },
    {
      title: () => (
        <Typography className={styles.tableHeader}>
          {intl.formatMessage({ id: "centre.participationFee" })}
          <span className={styles.redText}> *</span>
        </Typography>
      ),
      dataIndex: "participationFee",
      key: "participationFee",
      render: (text, record) => (
        <CustomInput
          value={text}
          disabled={record.isAddRow ? false : true}
          customContainerStyles={styles.customContainerStyles}
          onChange={(val) => {
            handleInputChange(val.target.value, "participationFee");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.enterFee",
          })}
        />
      ),
    },
    {
      title: () => (
        <Typography className={styles.tableHeader}>
          {intl.formatMessage({ id: "centre.firmFee" })}
          <span className={styles.redText}> *</span>
        </Typography>
      ),
      dataIndex: "firmFee",
      key: "firmFee",
      render: (text, record) => (
        <CustomInput
          value={text}
          disabled={record.isAddRow ? false : true}
          customContainerStyles={styles.customContainerStyles}
          onChange={(val) => {
            handleInputChange(val.target.value, "firmFee");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.enterFee",
          })}
        />
      ),
    },
    {
      title: () => (
        <Typography className={styles.tableHeader}>
          {intl.formatMessage({ id: "centre.uptoPartners" })}
          <span className={styles.redText}> *</span>
        </Typography>
      ),
      dataIndex: "uptoPartners",
      key: "uptoPartners",
      render: (text, record) => (
        <InputNumber
          min={0}
          max={10}
          value={text}
          disabled={record.isAddRow ? false : true}
          onChange={(val) => {
            handleInputChange(val, "uptoPartners");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.enterpartner",
          })}
        />
      ),
    },
    {
      title: () => (
        <TwoColumn
          className={styles.twoJointContainer}
          leftSection={
            <Typography className={styles.tableHeader}>
              {intl.formatMessage({ id: "centre.firmFee" })}
              <span className={styles.redText}> *</span>
            </Typography>
          }
          rightSection={
            <Typography className={styles.tableHeader}>
              {intl.formatMessage({ id: "centre.uptoPartners" })}
              <span className={styles.redText}> *</span>
            </Typography>
          }
        />
      ),
      dataIndex: "firm",
      key: "firm",
      render: (text, record) => {
        return (
          <TwoColumn
            leftSection={
              <CustomInput
                value={text?.firmFee}
                disabled={record.isAddRow ? false : true}
                customContainerStyles={styles.customContainerStyles}
                onChange={(val) => {
                  handleInputChange(val.target.value, "firm", "firmFee");
                }}
                placeholder={intl.formatMessage({
                  id: "centre.placeholder.enterFee",
                })}
              />
            }
            rightSection={
              <InputNumber
                min={0}
                max={10}
                value={text?.uptoPartners}
                disabled={record.isAddRow ? false : true}
                onChange={(val) => {
                  handleInputChange(val, "firm", "uptoPartners");
                }}
                placeholder={intl.formatMessage({
                  id: "centre.placeholder.enterpartner",
                })}
              />
            }
          />
        );
      },
    },
    {
      title: () => (
        <Typography className={styles.tableHeader}>
          {intl.formatMessage({ id: "centre.norm1" })}
          <span className={styles.redText}> *</span>
        </Typography>
      ),
      dataIndex: "norm1",
      key: "norm1",
      render: (text, record) => (
        <CustomInput
          value={text}
          disabled={record.isAddRow ? false : true}
          customContainerStyles={styles.customContainerStyles}
          onChange={(val) => {
            handleInputChange(val.target.value, "norm1");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.enterNorm1",
          })}
        />
      ),
    },
    {
      title: () => (
        <Typography className={styles.tableHeader}>
          {intl.formatMessage({ id: "centre.norm2" })}
          <span className={styles.redText}> *</span>
        </Typography>
      ),
      dataIndex: "norm2",
      key: "norm2",
      render: (text, record) => (
        <CustomInput
          value={text}
          disabled={record.isAddRow ? false : true}
          customContainerStyles={styles.customContainerStyles}
          onChange={(val) => {
            handleInputChange(val.target.value, "norm2");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.enterNorm2",
          })}
        />
      ),
    },
    {
      title: () => (
        <Typography className={styles.tableHeader}>
          {intl.formatMessage({ id: "centre.norm2MinVacancy" })}
          <span className={styles.redText}> *</span>
        </Typography>
      ),
      dataIndex: "norm2MinVacancy",
      key: "norm2MinVacancy",
      render: (text, record) => (
        <CustomInput
          value={text}
          disabled={record.isAddRow ? false : true}
          customContainerStyles={styles.customContainerStyles}
          onChange={(val) => {
            handleInputChange(val.target.value, "norm2MinVacancy");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.enterVacancy",
          })}
        />
      ),
    },
    {
      title: " ",
      dataIndex: "remove",
      key: "remove",
      render: (text, record) => (
        <Image
          src={getImage(record?.isAddRow ? "addCircle" : "minusCircle")}
          alt="add/remove"
          preview={false}
          onClick={() => {
            if (record?.isAddRow) {
              handleAdd(record);
            } else {
              handleRemove(record);
            }
          }}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={extendedTableData}
      pagination={false}
      rowClassName={styles.rowtext}
      scroll={{ x: "max-content" }}
      className={[styles.table, "customTable"]}
    />
  );
};

CentreTable.defaultProps = {
  tableData: [],
  setTableData: () => {},
};

CentreTable.propTypes = {
  tableData: PropTypes.object,
  setTableData: PropTypes.func,
};

export default CentreTable;
