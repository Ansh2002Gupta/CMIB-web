import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Table, InputNumber, Image, Typography } from "antd";
import moment from "moment";

import { SETUP_CENTRE_DETAILS } from "../../dummyData";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomDateTimePicker from "../../components/CustomDateTimePicker/CustomDateTimePicker";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";

import styles from "./CentreTable.module.scss";
import "./Override.css";

const CentreTable = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();

  const handleRemove = (rowData) => {
    console.log(rowData);
  };

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
      render: () => (
        <CustomDateTimePicker value={moment()} type="date" disabled={true} />
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
      render: (text) => (
        <CustomInput
          value={text}
          disabled={true}
          customContainerStyles={styles.customContainerStyles}
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
      render: (text) => (
        <CustomInput
          value={text}
          disabled={true}
          customContainerStyles={styles.customContainerStyles}
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
      render: (text) => (
        <InputNumber min={0} max={10} value={text} disabled={true} />
      ),
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
      render: (text) => (
        <CustomInput
          value={text}
          disabled={true}
          customContainerStyles={styles.customContainerStyles}
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
      render: (text) => (
        <CustomInput
          value={text}
          disabled={true}
          customContainerStyles={styles.customContainerStyles}
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
      render: (text) => (
        <CustomInput
          value={text}
          disabled={true}
          customContainerStyles={styles.customContainerStyles}
        />
      ),
    },
    {
      dataIndex: "remove",
      key: "remove",
      onClick: (rowData) => handleRemove(rowData),
      render: () => (
        <Image
          src={getImage("minusCircle")}
          alt="remove"
          preview={false}
          onClick={(rowData) => handleRemove(rowData)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={SETUP_CENTRE_DETAILS}
      pagination={false}
      rowClassName={styles.rowtext}
      scroll={{ x: "max-content" }}
      className={[styles.table, "customTable"]}
    />
  );
};
export default CentreTable;
