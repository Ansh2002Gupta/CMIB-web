import styles from "./AllJobsTable.module.scss";

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
      title: intl.formatMessage({ id: "label.jobId" }),
      customColumnHeading: [styles.extraWidth, styles.columnHeading].join(" "),
      dataIndex: "job_id",
      key: "job_id",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.company_name" }),
      customColumnHeading: [styles.extraWidth, styles.columnHeading].join(" "),
      dataIndex: "company_name",
      key: "company_name",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({
        id: "label.designation",
      }),
      customColumnHeading: [styles.extraWidth, styles.columnHeading].join(" "),
      dataIndex: "designation",
      key: "designation",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({
        id: "label.applicants",
      }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "number_of_applications",
      key: "number_of_applications",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: false,
      },
    }),
    renderColumn({
      title: intl.formatMessage({
        id: "label.scheduled_interview",
      }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "number_of_interviews",
      key: "number_of_interviews",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: false,
      },
    }),
    renderColumn({
      title: intl.formatMessage({
        id: "label.active/inactive",
      }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "status",
      key: "status",
      renderChip: {
        visible: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({
        id: "label.approval_by_admin",
      }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "approve",
      key: "approve",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: false,
        isBooleanHandlerKey: "approved",
      },
    }),
    renderColumn({
      dataIndex: "more",
      key: "more",
      renderActions: {
        customActionPairs: (rowData) => {
          if (rowData.approve) {
            return [
              {
                key: 1,
                label: intl.formatMessage({ id: "label.view_job_details" }),
              },
            ];
          }
          return [
            {
              key: 1,
              label: intl.formatMessage({ id: "label.view_job_details" }),
            },
            {
              key: 2,
              label: intl.formatMessage({ id: "label.approve" }),
            },
          ];
        },
        onActionClick: (rowData, item) => handleMenuItemClick(rowData, item),
        actionPreview: false,
        actionSrc: getImage("more"),
        visible: true,
      },
    }),
  ];
};
