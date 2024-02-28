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
      title: intl.formatMessage({ id: "centre.schedule_date" }),
      dataIndex: "schedule_date",
      key: "schedule_date",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderDateTime: {
        errorMessage: errors.schedule_date,
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "centre.placeholder.selectDate",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (val, record) => {
          handleInputChange("schedule_date", val);
        },
        isEditable: isEdit,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.start_time" }),
      dataIndex: "start_time",
      key: "start_time",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderDateTime: {
        errorMessage: errors.start_time,
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.placeholder.start_time",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (val, record) => {
          handleInputChange("start_time", val);
        },
        isEditable: isEdit,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.end_time" }),
      dataIndex: "end_time",
      key: "end_time",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderDateTime: {
        errorMessage: errors.end_time,
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.placeholder.end_time",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (val, record) => {
          handleInputChange("end_time", val);
        },
        isEditable: isEdit,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.no_of_facilities" }),
      dataIndex: "no_of_facilities",
      key: "facilitiesno_of_facilitiesNumber",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderInput: {
        inputErrorMessage: errors.no_of_facilities,
        visible: isEdit,
        inputType: "inputNumber",
        inputPlaceholder: intl.formatMessage({
          id: "label.placeholder.no_of_facilities",
        }),
        customInputNumberStyles: styles.customInputStyle,
        onInputChange: (val) => {
          handleInputChange("no_of_facilities", val);
        },
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.slot_duration" }),
      dataIndex: "slot_duration",
      key: "slot_duration",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderInput: {
        inputErrorMessage: errors.slot_duration,
        visible: isEdit,
        inputType: "inputNumber",
        inputPlaceholder: intl.formatMessage({
          id: "label.placeholder.slot_duration",
        }),
        customInputNumberStyles: styles.customInputStyle,
        onInputChange: (val) => {
          handleInputChange("slot_duration", val);
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
      title: intl.formatMessage({ id: "centre.schedule_date" }),
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
      title: intl.formatMessage({ id: "label.start_time" }),
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
      title: intl.formatMessage({ id: "label.end_time" }),
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
      title: intl.formatMessage({ id: "label.no_of_facilities" }),
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
      title: intl.formatMessage({ id: "label.slot_duration" }),
      dataIndex: "slot_duration",
      key: "slot_duration",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderInput: {
        inputErrorMessage: errors.slot_duration,
        visible: isEdit,
      },
    }),
  ];

  return isEdit ? columns : viewColumns;
};

export default getConfigureDateColumns;
