import styles from "./ConfigureInterview.module.scss";

const getConfigureDateColumns = (
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
      dataIndex: "schedule_date",
      key: "schedule_date",
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
      dataIndex: "start_time",
      key: "start_time",
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
      dataIndex: "end_time",
      key: "end_time",
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
      dataIndex: "no_of_facilities",
      key: "facilitiesno_of_facilitiesNumber",
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
      dataIndex: "slot_duration",
      key: "slot_duration",
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
          handleInputChange("slotDurationInMinutes", val);
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

  const viewColumns = [
    renderColumn({
      title: intl.formatMessage({ id: "centre.scheduleDate" }),
      dataIndex: "schedule_date",
      key: "schedule_date",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderDateTime: {
        visible: true,
        type: "date",
        isEditable: isEdit,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.startTime" }),
      dataIndex: "start_time",
      key: "start_time",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderDateTime: {
        visible: true,
        type: "time",
        isEditable: isEdit,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.endTime" }),
      dataIndex: "end_time",
      key: "end_time",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderDateTime: {
        visible: true,
        type: "time",
        isEditable: isEdit,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.facilitiesNumber" }),
      dataIndex: "no_of_facilities",
      key: "no_of_facilities",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderInput: {
        visible: isEdit,
        inputType: "inputNumber",
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.slotDurationInMinutes" }),
      dataIndex: "slot_duration",
      key: "slot_duration",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderInput: {
        inputErrorMessage: errors.slotDurationInMinutes,
        visible: isEdit,
      },
    }),
  ];

  return isEdit ? columns : viewColumns;
};

export default getConfigureDateColumns;
