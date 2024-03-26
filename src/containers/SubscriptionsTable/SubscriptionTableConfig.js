import styles from "./SubscriptionsTable.module.scss";

const getSubscriptionsColumn = (
  intl,
  getImage,
  viewSubscription,
  editSubscription,
  renderColumn
) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.packageName" }),
      dataIndex: "name",
      key: "name",
      renderText: { isTextBold: true, visible: true, isCapitalize: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.packageDescription" }),
      dataIndex: "description",
      key: "description",
      renderText: { visible: true, textStyles: styles.studentStyles },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdBy" }),
      dataIndex: "created_by",
      key: "created_by",
      renderText: { visible: true, textStyles: styles.studentStyles },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.packageValidity" }),
      dataIndex: "validity",
      key: "validity",
      renderText: {
        isDays: true,
        visible: true,
        textStyles: styles.studentStyles,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.price" }),
      dataIndex: "price",
      key: "price",
      renderText: {
        visible: true,
        textStyles: styles.studentStyles,
        isMoney: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.activeInactive" }),
      dataIndex: "status",
      key: "status",
      renderChip: {
        visible: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.actions" }),
      dataIndex: "actions",
      key: "actions",
      renderTwoImage: {
        leftAlt: "eye",
        rightAlt: "edit",
        leftOnClick: (rowData) => viewSubscription(rowData),
        rightOnClick: (rowData) => editSubscription(rowData),
        leftPreview: false,
        rightPreview: false,
        leftSrc: getImage("eye"),
        rightSrc: getImage("edit"),
        visible: true,
      },
    }),
  ];
};

export default getSubscriptionsColumn;
