import styles from "./SetupMockInterview.module.scss";

const getSetupMockColumn = (intl, getImage, renderColumn) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.sNo" }),
      customColumnHeading: styles.customColumnHeading,
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
      customColumnHeading: styles.customColumnHeading,
      dataIndex: "centreName",
      key: "centreName",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.totalStudentsBooked" }),
      customColumnHeading: styles.customColumnHeading,
      dataIndex: "totalStudentBooked",
      key: "totalStudentBooked",
      renderText: { visible: true, textStyles: styles.studentStyles },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.actions" }),
      customColumnHeading: styles.customColumnHeading,
      dataIndex: "actions",
      key: "actions",
      renderTwoImage: {
        leftAlt: "download",
        rightAlt: "edit",
        leftOnClick: (rowData) => {},
        rightOnClick: (rowData) => {},
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
