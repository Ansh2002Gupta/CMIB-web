import React from "react";
import { useIntl } from "react-intl";
import { Table } from "antd";

import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import DataTable from "../../components/DataTable/DataTable";
import { CONSENT_MARKING_REGESTRATION_DETAILS } from "../../dummyData";
import styles from "./ConsentTable.module.scss";
import "./Override.css";

const ConsentTable = () => {
  const { renderColumn } = useRenderColumn();
  const intl = useIntl();

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.sNo" }),
      dataIndex: "sNo",
      key: "sNo",
      renderText: {
        visible: true,
        includeDotAfterText: true,
        textStyles: styles.textStyles,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "centreName",
      key: "centreName",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.companyStartDate" }),
      dataIndex: "companyStartDate",
      key: "companyStartDate",
      renderText: { visible: true, isTypeDate: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.consentFromDate" }),
      dataIndex: "companyEndDate",
      key: "companyEndDate",
      renderText: { visible: true, isTypeDate: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.consentFromDate" }),
      dataIndex: "consentFromDate",
      key: "consentFromDate",
      renderText: { visible: true, isTypeDate: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.consentToDate" }),
      dataIndex: "consentToDate",
      key: "consentToDate",
      renderText: { visible: true, isTypeDate: true },
    }),
  ];

  return (
    <Table
      columns={columns}
      dataSource={CONSENT_MARKING_REGESTRATION_DETAILS}
      pagination={false}
      rowClassName={styles.rowtext}
      scroll={{ x: "max-content" }}
      className={[styles.table, "customConsentTable"]}
      rowKey="id"
    />
  );
};
export default ConsentTable;
