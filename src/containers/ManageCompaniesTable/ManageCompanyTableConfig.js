const getCompaniesColumn = (
  intl,
  getImage,
  viewCompanyDetails,
  renderColumn
) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.approvedCompanyName" }),
      dataIndex: "name",
      key: "name",
      renderText: { isTextBold: true, visible: true, isCapitalize: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.userName" }),
      dataIndex: "user_name",
      key: "user_name",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.password" }),
      dataIndex: "entity",
      key: "entity",
      renderText: { visible: true },
    }),
  ];
};

export default getCompaniesColumn;
