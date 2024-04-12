import styles from "./ScheduledInterviewsListingTable.module.scss";

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
      title: intl.formatMessage({ id: "label.applicantId" }),
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
      title: intl.formatMessage({
        id: "label.interviewType",
      }),
      customColumnHeading: [styles.extraWidth, styles.columnHeading].join(" "),
      dataIndex: "type",
      key: "type",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({
        id: "label.primaryInterviewDate",
      }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "primary_interview_date",
      key: "primary_interview_date",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: false,
      },
    }),
    renderColumn({
      title: intl.formatMessage({
        id: "label.primaryInterviewTime",
      }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "primary_interview_time",
      key: "primary_interview_time",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: false,
      },
    }),
    renderColumn({
      dataIndex: "more",
      key: "more",
      renderMenu: {
        items: [
          {
            key: 1,
            id: 'download_profile_resume',
            label: intl.formatMessage({ id: "label.downloadResumeAndProfile" }),
          },
          {
            key: 2,
            id: 'view_interview_details',
            label: intl.formatMessage({ id: "label.viewInterviewDetails" }),
          },
          {
            key: 3,
            id: 'offer_job',
            label: intl.formatMessage({ id: "label.offerJob" }),
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
