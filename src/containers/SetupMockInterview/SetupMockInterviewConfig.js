import styles from "./SetupMockInterview.module.scss";

const getSetupMockColumn = (
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
      renderText: {
        visible: true,
        includeDotAfterText: true,
        textStyles: styles.textStyles,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "centre_name",
      key: "centre_name",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.totalStudentsBooked" }),
      dataIndex: "total_participants_booked",
      key: "total_participants_booked",
      renderText: { visible: true, textStyles: styles.studentStyles },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.actions" }),
      dataIndex: "actions",
      key: "actions",
      renderTwoImage: {
        leftAlt: "download",
        rightAlt: "edit",
        leftOnClick: (rowData) => {},
        rightOnClick: (rowData) => goToConfigureInterview(rowData, isEdit),
        leftPreview: false,
        rightPreview: false,
        leftSrc: getImage("download"),
        rightSrc: getImage("edit"),
        visible: true,
      },
    }),
  ];
};

export default getSetupMockColumn;
