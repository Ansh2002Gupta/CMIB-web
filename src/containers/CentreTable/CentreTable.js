import React, { useContext } from "react";
import PropTypes from "prop-types";
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

const CentreTable = ({ tableData, setTableData }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();

  const handleRemove = (rowData) => {
    const filteredData = tableData.filter((item) => item.id !== rowData.id);
    setTableData(filteredData);
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
    renderColumn({
      title: " ",
      dataIndex: "remove",
      key: "remove",
      renderImage: {
        alt: "edit",
        onClick: (rowData) => handleRemove(rowData),
        preview: false,
        src: getImage("minusCircle"),
        visible: true,
      },
    }),
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
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
