import styles from "./SubscriptionsTable.module.scss";

const getSubscriptionsColumn = (
  intl,
  getImage,
  goToSubscriptionDetails,
  renderColumn
) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.package_name" }),
      dataIndex: "package_name",
      key: "package_name",
      renderText: { isTextBold: true, visible: true, isCapitalize: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.package_description" }),
      dataIndex: "package_description",
      key: "package_description",
      renderText: { visible: true, textStyles: styles.studentStyles },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.created_by" }),
      dataIndex: "created_by",
      key: "created_by",
      renderText: { visible: true, textStyles: styles.studentStyles },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.package_validity" }),
      dataIndex: "package_validity",
      key: "package_validity",
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
        leftOnClick: (rowData) => {},
        rightOnClick: (rowData) => goToSubscriptionDetails(rowData),
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
