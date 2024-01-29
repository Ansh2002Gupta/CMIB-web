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
      dataIndex: "sNo",
      key: "sNo",
      renderText: {
        visible: true,
        includeDotAfterText: true,
        textStyles: styles.textStyles,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "centreName",
      key: "centreName",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.totalStudentsBooked" }),
      dataIndex: "totalStudentBooked",
      key: "totalStudentBooked",
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
