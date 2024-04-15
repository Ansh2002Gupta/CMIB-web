import { Image, Typography } from "antd";

import { SORT_VALUES } from "../../constant/constant";
import styles from "./PaymentTable.module.scss";

const getStatusStyles = (status) => {
  if (
    status?.toLowerCase() === "success" ||
    status?.toLowerCase() === "refunded"
  ) {
    return ["statusContainer_success", "statusText_success"];
  }
  if (status?.toLowerCase() === "inprogress") {
    return ["statusContainer_progress", "statusText_progress"];
  }
  if (status?.toLowerCase() === "pending") {
    return ["statusContainer_pending", "statusText_pending"];
  }
  if (status?.toLowerCase() === "refund inprogress") {
    return ["statusContainer_refund_progress", "statusText_refund_progress"];
  }
  return ["statusContainer_failed", "statusText_failed"];
};

export const getPaymentColumn = ({
  getImage,
  handleSorting,
  handleRefundPayment,
  intl,
  renderColumn,
  setSortBy,
  sortBy,
}) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.company_name" }),
      dataIndex: "company_name",
      key: "company_name",
      sortKey: "company_name",
      renderSorterColumn: true,
      setSortBy: setSortBy,
      columnSortByHandler: handleSorting,
      customIconStyle: [
        styles[sortBy],
        sortBy === SORT_VALUES.ASCENDING || sortBy === SORT_VALUES.DESCENDING
          ? styles.active
          : "",
      ],
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isDataObject: true,
        dataKey: "company_name",
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.payment_mode" }),
      dataIndex: "payment_mode",
      key: "payment_mode",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isCapitalize: true,
        isDataObject: true,
        dataKey: "payment_mode",
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.payment_amount" }),
      dataIndex: "payment_amt",
      key: "payment_amt",
      renderText: {
        visible: true,
        textStyles: styles.tableCell,
        isDataObject: true,
        dataKey: "payment_amt",
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.payment_date_and_time" }),
      dataIndex: "created_at",
      key: "created_at",
      renderSorterColumn: true,
      setSortBy: setSortBy,
      columnSortByHandler: handleSorting,
      customIconStyle: [
        styles[sortBy],
        sortBy === SORT_VALUES.ASCENDING || sortBy === SORT_VALUES.DESCENDING
          ? styles.active
          : "",
      ],
      renderText: {
        isTypeDate: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        dataKey: "created_at",
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.transaction_id" }),
      dataIndex: "txn_id",
      key: "txn_id",
      renderText: {
        isTextBold: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isDataObject: true,
        dataKey: "txn_id",
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.payment_status" }),
      dataIndex: "payment_status",
      key: "payment_status",
      render: (data, rowData) => {
        const { payment_status } = rowData;
        const styleClassForContainer = getStatusStyles(payment_status)[0];
        const styleClassForText = getStatusStyles(payment_status)[1];
        return (
          <div
            className={[styles.statusBox, styles[styleClassForContainer]].join(
              " "
            )}
          >
            <Typography className={styles[styleClassForText]}>
              {payment_status}
            </Typography>
          </div>
        );
      },
    }),
    renderColumn({
      dataIndex: "more",
      key: "more",
      renderMenu: {
        items: [
          {
            key: 1,
            label: intl.formatMessage({ id: "label.refund_payment" }),
          },
        ],
        onMenuClick: (rowData) => handleRefundPayment(rowData),
        menuPreview: false,
        menuSrc: getImage("more"),
        visible: true,
      },
    }),
  ];
};
