import styles from "./ConfigureInterview.module.scss";

const getConfigureDateCoumns = (intl, isEdit, getImage, renderColumn) => {
  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "centre.scheduleDate" }),
      dataIndex: "scheduleDate",
      key: "scheduleDate",
      isRequiredField: true,
      renderDateTime: {
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "centre.placeholder.selectDate",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (date, record) => {},
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.startTime" }),
      dataIndex: "startTime",
      key: "startTime",
      isRequiredField: true,
      renderDateTime: {
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.placeholder.startTime",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (date, record) => {},
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.endTime" }),
      dataIndex: "endTime",
      key: "endTime",
      isRequiredField: true,
      renderDateTime: {
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.placeholder.endTime",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (date, record) => {},
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.facilitiesNumber" }),
      dataIndex: "facilitiesNumber",
      key: "facilitiesNumber",
      isRequiredField: true,
      renderInput: {
        visible: true,
        inputType: "inputNumber",
        inputPlaceholder: intl.formatMessage({
          id: "label.placeholder.facilitiesNumber",
        }),
        customInputNumberStyles: styles.customTimeStyle,
        onChange: (date, record) => {},
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.slotDurationInMinutes" }),
      dataIndex: "slotDurationInMinutes",
      key: "slotDurationInMinutes",
      isRequiredField: true,
      renderInput: {
        visible: true,
        inputType: "text",
        inputPlaceholder: intl.formatMessage({
          id: "label.placeholder.slotDurationInMinutes",
        }),
        customInputStyles: styles.customTimeStyle,
        onChange: (date, record) => {},
      },
    }),

    renderColumn({
      dataIndex: "minusCircle",
      key: "minusCircle",
      renderImage: {
        alt: "minusCircle/addCircle",
        onClick: (rowData) => {},
        preview: false,
        src: getImage(true ? "minusCircle" : "addCircle"),
        visible: isEdit,
      },
    }),
  ];

  return columns;
};

export default getConfigureDateCoumns;
