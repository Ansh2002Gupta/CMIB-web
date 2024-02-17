import { Typography } from "antd";
import { SORT_VALUES } from "../../constant/constant";

import styles from "./TicketTable.module.scss";

const getStatusStyles = (status) => {
  if (
    status?.toLowerCase() === "closed" ||
    status?.toLowerCase() === "answered"
  ) {
    return ["statusContainer_success", "statusText_success"];
  }
  if (status?.toLowerCase() === "pending") {
    return ["statusContainer_failed", "statusText_failed"];
  }
  return ["statusContainer_progress", "statusText_progress"];
};

export const getTicketOrQueryColumn = ({
  intl,
  getImage,
  handleClickAssign,
  renderColumn,
  setSortBy,
  sortBy,
  handleSorting,
}) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.ticketId" }),
      dataIndex: "readable_id",
      key: "readable_id",
      renderText: {
        isTextBold: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdBy" }),
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
      title: intl.formatMessage({ id: "label.role" }),
      dataIndex: "role",
      key: "role",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isCapitalize: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.registrationOrMembershipNumber" }),
      dataIndex: "registration_no",
      key: "registration_no",
      renderText: { visible: true, textStyles: [styles.tableCell].join(" ") },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.queryType" }),
      dataIndex: "query_type",
      key: "query_type",
      renderText: {
        visible: true,
        textStyles: styles.tableCell,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.status" }),
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
      title: intl.formatMessage({ id: "label.assignedTo" }),
      dataIndex: "assigned_to",
      key: "assigned_to",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isCapitalize: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdOn" }),
      dataIndex: "created_at",
      key: "created_at",
      renderText: {
        isTypeDate: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      dataIndex: "see",
      key: "see",
      renderImage: {
        alt: "msg",
        preview: false,
        src: getImage("messageText"),
        visible: true,
        onClick: (data) => {
          handleClickAssign(data);
        },
      },
    }),
    renderColumn({
      dataIndex: "see",
      key: "see",
      renderImage: {
        alt: "options",
        preview: false,
        src: getImage("more"),
        visible: true,
      },
    }),
  ];
};
