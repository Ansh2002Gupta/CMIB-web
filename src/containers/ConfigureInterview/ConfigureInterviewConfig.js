import dayjs from "dayjs";
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
        getDisabledDate: (current, record) => {
          return current && current < dayjs().add(1, "day").startOf("day");
        },
        getError: (index) => errors[index].schedule_date,
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "centre.placeholder.selectDate",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (val, record, index) => {
          handleInputChange(
            "schedule_date",
            val ? dayjs(val).format("YYYY-MM-DD") : "",
            index
          );
        },
        isEditable: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.start_time" }),
      dataIndex: "start_time",
      key: "start_time",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,

      renderDateTime: {
        getDisabledTime: (current, record) => {
          return (
            current && current.isBefore(dayjs(record?.end_time, "HH:mm:ss"))
          );
        },

        getError: (index) => errors[index].start_time,
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.placeholder.start_time",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (val, record, index) => {
          handleInputChange(
            "start_time",
            val ? dayjs(val).format("HH:mm:ss") : "",
            index
          );
        },
        isEditable: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.end_time" }),
      dataIndex: "end_time",
      key: "end_time",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderDateTime: {
        getError: (index) => errors[index].end_time,
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.placeholder.end_time",
        }),
        customTimeStyle: styles.customTimeStyle,
        onChange: (val, record, index) => {
          handleInputChange(
            "end_time",
            val ? dayjs(val).format("HH:mm:ss") : "",
            index
          );
        },
        isEditable: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.no_of_facilities" }),
      dataIndex: "no_of_facilities",
      key: "facilitiesno_of_facilitiesNumber",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderInput: {
        controls: true,
        getInputError: (index) => errors[index].no_of_facilities,
        inputErrorMessage: errors.no_of_facilities,
        visible: true,
        inputType: "inputNumber",
        inputPlaceholder: intl.formatMessage({
          id: "label.placeholder.no_of_facilities",
        }),
        customInputNumberStyles: styles.customInputStyle,
        onInputChange: (val, record, index) => {
          handleInputChange("no_of_facilities", val, index);
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
        controls: true,
        getInputError: (index) => errors[index].slot_duration,
        visible: true,
        inputType: "inputNumber",
        inputPlaceholder: intl.formatMessage({
          id: "label.placeholder.slot_duration",
        }),
        customInputNumberStyles: styles.customInputStyle,
        onInputChange: (val, record, index) => {
          handleInputChange("slot_duration", val, index);
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
        alternateOnClick: (rowData, index) => {
          handleAdd(rowData, index);
        },
        onClick: (rowData, index) => {
          handleRemove(rowData, index);
        },
        customImageStyle: styles.customImageStyle,
        preview: false,
        src: getImage("minusCircle"),
        alternateSrc: getImage("addCircle"),
        visible: true,
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
        isEditable: false,
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
        isEditable: false,
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
        isEditable: false,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.no_of_facilities" }),
      dataIndex: "no_of_facilities",
      key: "no_of_facilities",
      isRequiredField: true,
      customColumnHeading: styles.customColumnHeading,
      renderInput: {
        visible: false,
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
        visible: false,
      },
    }),
  ];

  return isEdit ? columns : viewColumns;
};

export default getConfigureDateColumns;
