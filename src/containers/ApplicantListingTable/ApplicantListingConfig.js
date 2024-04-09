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
      dataIndex: "applicantion_id",
      key: "applicantion_id",
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
      renderActions: {
        customActionPairs: (rowData) => {
          if (rowData?.action) {
            const actionList = rowData?.action?.map((item, index) => {
              return  {
                key: index,
                label: item.name,
              }              
            })
            return actionList;
          }
        },
        onActionClick: (rowData, item) => handleMenuItemClick(rowData, item),
        actionPreview: false,
        actionSrc: getImage("more"),
        visible: true,
      },
    }),
  ];
};