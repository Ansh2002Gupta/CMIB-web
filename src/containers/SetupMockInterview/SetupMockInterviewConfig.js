import styles from "./SetupMockInterview.module.scss";

const getSetupMockColumn = (
  downloadInterviewDates,
  isDownloadingInterview,
  intl,
  isEdit,
  getImage,
  goToConfigureInterview,
  renderColumn
) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.sNo" }),
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => {
        return {
          props: {
            className: styles.customStyles,
          },
          children: <p>{index + 1}.</p>,
        };
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "centre_name",
      key: "centre_name",
      renderText: { isTextBold: true, visible: true, isCapitalize: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.totalStudentsBooked" }),
      dataIndex: "total_participants_booked",
      key: "total_participants_booked",
      renderText: {
        visible: true,
        textStyles: styles.studentStyles,
        isNumber: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.actions" }),
      dataIndex: "actions",
      key: "actions",
      renderTwoImage: {
        leftDisabled: isDownloadingInterview,
        leftAlt: "download",
        rightAlt: "edit",
        leftOnClick: (rowData) => {
          downloadInterviewDates(rowData.id);
        },
        rightOnClick: (rowData) => goToConfigureInterview(rowData, isEdit),
        leftPreview: false,
        rightPreview: false,
        leftSrc: getImage("download"),
        rightSrc: getImage(isEdit ? "edit" : "eye"),
        visible: true,
      },
    }),
  ];
};

export default getSetupMockColumn;
