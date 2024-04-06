import styles from "./ApplicantListingTable.module.scss";

export const getQueryColumn = ({
  intl,
  getImage,
  renderColumn,
  queriesColumnProperties = {},
  handleMenuItems,
}) => {
  const { isSelectedFromTick, selectedItemsList, toggleSelectedQueriesId } =
    queriesColumnProperties;
  const isTableInSelectAllMode =
    selectedItemsList?.length !== 0 && !isSelectedFromTick;

  const handleMenuItemClick = (rowData, item) => {
    handleMenuItems(rowData, item);
  };

  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.applicantName" }),
      customColumnHeading: [styles.extraWidth, styles.columnHeading].join(" "),
      dataIndex: "name",
      key: "name",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: "Application Id",
      customColumnHeading: [styles.extraWidth, styles.columnHeading].join(" "),
      dataIndex: "applicant_id",
      key: "applicant_id",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: "Status",
      customColumnHeading: [styles.extraWidth, styles.columnHeading].join(" "),
      dataIndex: "status",
      key: "status",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
        dataIndex: "more",
        key: "more",
        renderMenu: {
          items: [
            {
              key: 1,
              label: intl.formatMessage({ id: "label.view_job_details" }),
            },
            {
              key: 2,
              label: intl.formatMessage({ id: "label.approve" }),
            },
          ],
          onMenuClick: (rowData, item) => handleMenuItemClick(rowData, item),
          menuPreview: false,
          menuSrc: getImage("more"),
          visible: true,
        },
      }),
  ];
};