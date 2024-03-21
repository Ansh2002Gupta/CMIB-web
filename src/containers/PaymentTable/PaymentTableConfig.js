import { Image, Typography } from "antd";

import { SORT_VALUES } from "../../constant/constant";
import styles from "./PaymentTable.module.scss";

const getStatusStyles = (status) => {
  if (status?.toLowerCase() === "payment completed") {
    return ["statusContainer_success", "statusText_success"];
  }
  if (status?.toLowerCase() === "payment inprogress") {
    return ["statusContainer_progress", "statusText_progress"];
  }
  if (status?.toLowerCase() === "payment pending") {
    return ["statusContainer_pending", "statusText_pending"];
  }
  if (status?.toLowerCase() === "refund inprogress") {
    return ["statusContainer_refund_progress", "statusText_refund_progress"];
  }
  return ["statusContainer_failed", "statusText_failed"];
};

const handleRefundPayment = () => {};

export const getPaymentColumn = ({
  getImage,
  handleClickAssign,
  handleTicketIcon,
  handleSorting,
  intl,
  renderColumn,
  setSortBy,
  sortBy,
  userProfileDetails,
}) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.company_name" }),
      dataIndex: "created_by",
      key: "created_by",
      sortKey: "created_by",
      renderSorterColumn: true,
      setSortBy: setSortBy,
      columnSortByHandler: handleSorting,
      customIconStyle: [
        styles[sortBy],
        sortBy === SORT_VALUES.ASCENDING || sortBy === SORT_VALUES.DESCENDING
          ? styles.active
          : "",
      ],
      renderText: { visible: true, textStyles: [styles.tableCell].join(" ") },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.payment_mode" }),
      dataIndex: "role",
      key: "role",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isCapitalize: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.payment_amount" }),
      dataIndex: "query_type",
      key: "query_type",
      renderText: {
        visible: true,
        textStyles: styles.tableCell,
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
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.transaction_id" }),
      dataIndex: "readable_id",
      key: "readable_id",
      renderText: {
        isTextBold: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.payment_status" }),
      dataIndex: "status",
      key: "status",
      render: (data, rowData) => {
        const { status } = rowData;
        const styleClassForContainer = getStatusStyles(status)[0];
        const styleClassForText = getStatusStyles(status)[1];
        return (
          <div
            className={[styles.statusBox, styles[styleClassForContainer]].join(
              " "
            )}
          >
            <Typography className={styles[styleClassForText]}>
              {status}
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
