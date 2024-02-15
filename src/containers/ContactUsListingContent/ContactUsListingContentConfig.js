import { Typography } from "antd";
import styles from "./ContactUsListingContent.module.scss";

const getStatusStyles = (status) => {
  if (status === "Closed") {
    return ["statusContainer_success", "statusText_success"];
  }
  if (status === "Pending") {
    return ["statusContainer_failed", "statusText_failed"];
  }
  return ["statusContainer_progress", "statusText_progress"];
};

export const getTicketOrQueryColumn = (
  type,
  intl,
  getImage,
  navigate,
  renderColumn,
  handleSorting
) => {
  if (type === "2") {
    return [
      renderColumn({
        title: intl.formatMessage({ id: "label.queriesId" }),
        dataIndex: "id", //TODO: change key name to another the one which is having alphanumeric value
        key: "id",
        renderText: {
          isTextBold: true,
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      }),
      renderColumn({
        title: intl.formatMessage({ id: "label.studentOrCompany" }),
        dataIndex: "name",
        key: "name",
        sortKey: "name",
        sortTypeText: true,
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      }),
      renderColumn({
        title: intl.formatMessage({
          id: "label.nonRegisteredStudentOrCompany",
        }),
        dataIndex: "type",
        key: "type",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      }),
      {
        title: () => (
          <p className={styles.columnHeading}>
            {intl.formatMessage({ id: "label.mobile" })}
          </p>
        ),
        dataIndex: "mobile",
        key: "mobile",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      },
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
        title: intl.formatMessage({ id: "label.email" }),
        dataIndex: "email",
        key: "email",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
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
        sortDirection: ["ascend"],
        sortKey: "created_at",
        sortTypeDate: true,
        defaultSortOrder: "ascend",
      }),
      renderColumn({
        dataIndex: "see",
        key: "see",
        renderImage: {
          alt: "eye",
          preview: false,
          src: getImage("eye"),
          visible: true,
          onClick: (rowData) => navigate(`query/${rowData?.id}`),
        },
      }),
      renderColumn({
        dataIndex: "check",
        key: "check",
        renderImage: {
          alt: "check",
          preview: false,
          src: getImage("rightIcon"),
          visible: true,
        },
      }),
    ];
  }

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
      handleSorting,
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
