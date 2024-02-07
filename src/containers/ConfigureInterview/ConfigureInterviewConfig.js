import styles from "./ConfigureInterview.module.scss";

const getConfigureDateCoumns = (
  errors,
  intl,
  isEdit,
  handleAdd,
  handleRemove,
  getImage,
  handleInputChange,
  renderColumn
) => {
  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "centre.scheduleDate" }),
      dataIndex: "scheduleDate",
      key: "scheduleDate",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderDateTime: {
        errorMessage: errors.scheduleDate,
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "centre.placeholder.selectDate",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (val, record) => {
          handleInputChange("scheduleDate", val);
        },
        isEditable: isEdit,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.startTime" }),
      dataIndex: "startTime",
      key: "startTime",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderDateTime: {
        errorMessage: errors.startTime,
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.placeholder.startTime",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (val, record) => {
          handleInputChange("startTime", val);
        },
        isEditable: isEdit,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.endTime" }),
      dataIndex: "endTime",
      key: "endTime",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderDateTime: {
        errorMessage: errors.endTime,
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.placeholder.endTime",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (val, record) => {
          handleInputChange("endTime", val);
        },
        isEditable: isEdit,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.facilitiesNumber" }),
      dataIndex: "facilitiesNumber",
      key: "facilitiesNumber",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderInput: {
        inputErrorMessage: errors.facilitiesNumber,
        visible: isEdit,
        inputType: "inputNumber",
        inputPlaceholder: intl.formatMessage({
          id: "label.placeholder.facilitiesNumber",
        }),
        customInputNumberStyles: styles.customInputStyle,
        onInputChange: (val) => {
          handleInputChange("facilitiesNumber", val);
        },
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.slotDurationInMinutes" }),
      dataIndex: "slotDurationInMinutes",
      key: "slotDurationInMinutes",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderInput: {
        inputErrorMessage: errors.slotDurationInMinutes,
        visible: isEdit,
        inputType: "inputNumber",
        inputPlaceholder: intl.formatMessage({
          id: "label.placeholder.slotDurationInMinutes",
        }),
        customInputNumberStyles: styles.customInputStyle,
        onInputChange: (val) => {
          handleInputChange("slotDurationInMinutes", val.target.value);
        },
      },
    }),

    renderColumn({
      title: " ",
      dataIndex: "minusCircle",
      key: "minusCircle",
      customColumnHeading: styles.customColumnHeading,
      renderImage: {
        alt: "minusCircle/addCircle",
        alternateOnClick: (rowData) => {
          handleAdd(rowData);
        },
        onClick: (rowData) => {
          handleRemove(rowData);
        },
        preview: false,
        src: getImage("minusCircle"),
        alternateSrc: getImage("addCircle"),
        visible: isEdit,
      },
    }),
  ];

  return columns;
};

export default getConfigureDateCoumns;
