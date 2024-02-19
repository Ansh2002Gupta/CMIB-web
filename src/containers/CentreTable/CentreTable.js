import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Image, Table, Typography } from "antd";

import { TwoColumn } from "../../core/layouts";

import CustomDateTimePicker from "../../components/CustomDateTimePicker/CustomDateTimePicker";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "./CentreTable.module.scss";
import "./Override.css";

const CentreTable = ({ isEdit, tableData, setTableData }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const [addTableData, setAddTableData] = useState({
    id: Math.random().toString(),
    isAddRow: true,
    scheduleDate: null,
    participationFee: "",
    firm: { firmFee: "", uptoPartners: "" },
    norm1: "",
    norm2: "",
    norm2MinVacancy: "",
  });
  const [errors, setErrors] = useState({
    scheduleDate: "",
    participationFee: "",
    firm: { firmFee: "", uptoPartners: "" },
    norm1: "",
    norm2: "",
    norm2MinVacancy: "",
  });

  const handleRemove = (record) => {
    const filteredData = tableData.filter((item) => item.id !== record.id);
    setTableData(filteredData);
  };

  const handleAdd = (record) => {
    if (validate()) {
      setTableData((prevTableData) => {
        const newRecord = { ...record };
        delete newRecord.isAddRow;
        return [...prevTableData, newRecord];
      });

      setAddTableData({
        id: Math.random().toString(),
        isAddRow: true,
        scheduleDate: null,
        participationFee: "",
        firm: { firmFee: "", uptoPartners: "" },
        norm1: "",
        norm2: "",
        norm2MinVacancy: "",
      });
    }
  };

  const handleSetError = (error, name, nestedName) => {
    if (nestedName) {
      setErrors((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          [nestedName]: error,
        },
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
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
      setErrors((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          [nestedName]: "",
        },
      }));
    } else {
      setAddTableData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    let errorCount = 0;
    if (!addTableData?.scheduleDate) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.selectDate" }),
        "scheduleDate"
      );
      errorCount += 1;
    }
    if (!addTableData?.participationFee) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterParticipationFee" }),
        "participationFee"
      );
      errorCount += 1;
    }
    if (!addTableData?.firm?.firmFee) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterFirmFee" }),
        "firm",
        "firmFee"
      );
      errorCount += 1;
    }
    if (!addTableData?.firm?.uptoPartners) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterpartner" }),
        "firm",
        "uptoPartners"
      );
      errorCount += 1;
    }
    if (!addTableData?.norm1) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterNorm1" }),
        "norm1"
      );
      errorCount += 1;
    }
    if (!addTableData?.norm2) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterNorm2" }),
        "norm2"
      );
      errorCount += 1;
    }
    if (!addTableData?.norm2MinVacancy) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterVacancy" }),
        "norm2MinVacancy"
      );
      errorCount += 1;
    }

    if (errorCount > 0) return false;

    return true;
  };

  const extendedTableData = isEdit ? [...tableData, addTableData] : tableData;

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
          customContainerStyles={styles.customDateContainerStyles}
          value={text?.scheduleDate ? dayjs(text?.scheduleDate) : null}
          type="date"
          disabled={!record.isAddRow}
          onChange={(val, dateString) => {
            handleInputChange(val, "scheduleDate");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.selectDate",
          })}
          errorMessage={record.isAddRow && errors?.scheduleDate}
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
          disabled={!record.isAddRow}
          customContainerStyles={styles.customContainerStyles}
          onChange={(val) => {
            handleInputChange(val.target.value, "participationFee");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.enterFee",
          })}
          errorMessage={record.isAddRow && errors?.participationFee}
          isError={!!(record.isAddRow && errors?.participationFee)}
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
                disabled={!record.isAddRow}
                customContainerStyles={styles.customContainerStyles}
                customInputStyles={styles.joinedCustomContainerStyles}
                onChange={(val) => {
                  handleInputChange(val.target.value, "firm", "firmFee");
                }}
                placeholder={intl.formatMessage({
                  id: "centre.placeholder.enterFee",
                })}
                errorMessage={record.isAddRow && errors?.firm?.firmFee}
                isError={!!(record.isAddRow && errors?.firm?.firmFee)}
              />
            }
            rightSection={
              <CustomInput
                type="inputNumber"
                customContainerStyles={styles.customContainerStyles}
                customInputNumberStyles={styles.inputNumberStyle}
                value={text?.uptoPartners}
                disabled={!record.isAddRow}
                onChange={(val) => {
                  handleInputChange(val, "firm", "uptoPartners");
                }}
                placeholder={intl.formatMessage({
                  id: "centre.placeholder.enterpartner",
                })}
                errorMessage={record.isAddRow && errors?.firm?.uptoPartners}
                isError={!!(record.isAddRow && errors?.firm?.uptoPartners)}
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
          disabled={!record.isAddRow}
          customContainerStyles={styles.customContainerStyles}
          onChange={(val) => {
            handleInputChange(val.target.value, "norm1");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.enterNorm1",
          })}
          errorMessage={record.isAddRow && errors?.norm1}
          isError={!!(record.isAddRow && errors?.norm1)}
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
          disabled={!record.isAddRow}
          customContainerStyles={styles.customContainerStyles}
          onChange={(val) => {
            handleInputChange(val.target.value, "norm2");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.enterNorm2",
          })}
          errorMessage={record.isAddRow && errors?.norm2}
          isError={!!(record.isAddRow && errors?.norm2)}
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
          disabled={!record.isAddRow}
          customContainerStyles={styles.customContainerStyles}
          onChange={(val) => {
            handleInputChange(val.target.value, "norm2MinVacancy");
          }}
          placeholder={intl.formatMessage({
            id: "centre.placeholder.enterVacancy",
          })}
          errorMessage={record.isAddRow && errors?.norm2MinVacancy}
          isError={!!(record.isAddRow && errors?.norm2MinVacancy)}
        />
      ),
    },

    {
      title: " ",
      dataIndex: "remove",
      key: "remove",
      render: (text, record) =>
        isEdit && (
          <Image
            className={styles.imageStyle}
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
      rowKey="id"
    />
  );
};

CentreTable.defaultProps = {
  isEdit: true,
  tableData: [],
  setTableData: () => {},
};

CentreTable.propTypes = {
  isEdit: PropTypes.bool,
  tableData: PropTypes.array,
  setTableData: PropTypes.func,
};

export default CentreTable;
