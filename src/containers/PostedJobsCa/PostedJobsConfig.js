const getJobsColumn = ({
  intl,
  isStatusChanging,
  getImage,
  onMenuClick,
  renderColumn,
  onHandleJobStatus,
}) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.jobId" }),
      dataIndex: "job_id",
      key: "job_id",
      renderText: { isTextLink: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.designation" }),
      dataIndex: "designation",
      key: "designation",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.applicants" }),
      dataIndex: "number_of_applications",
      key: "number_of_applications",
      renderText: { isTextLink: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.scheduledInterviews" }),
      dataIndex: "number_of_interviews",
      key: "number_of_interviews",
      renderText: { isTextLink: true, visible: true },
    }),

    renderColumn({
      title: intl.formatMessage({ id: "label.status" }),
      dataIndex: "status",
      key: "status",
      renderSwitch: {
        dataKeyName: "status",
        switchToggleHandler: (data) => onHandleJobStatus(data),
        visible: true,
        checkIsSwitchEditable: (data) => !isStatusChanging,
      },
    }),

    renderColumn({
      title: intl.formatMessage({ id: "label.activeInactive" }),
      dataIndex: "approve",
      key: "approve",
      renderText: {
        visible: true,
        isBooleanHandlerKey: true,
      },
    }),
    renderColumn({
      dataIndex: "more",
      key: "more",
      renderMenu: {
        isConditionalMenu: true,
        items: (rowData) => {
          return [
            {
              key: 1,
              label: intl.formatMessage({ id: "label.view_job_details" }),
            },
            !rowData?.approve
              ? {
                  key: 2,
                  label: intl.formatMessage({ id: "label.approve" }),
                }
              : null,
          ].filter(Boolean);
        },
        onMenuClick: (rowData, item) => onMenuClick(rowData, item),
        menuPreview: false,
        menuSrc: getImage("more"),
        visible: true,
      },
    }),
  ];
};

export default getJobsColumn;
