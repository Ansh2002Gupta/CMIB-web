import dayjs from "dayjs";
import React, { useContext } from "react";
import { ThemeContext } from "core/providers/theme";
import { useIntl } from "react-intl";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";

import CandidateSettingsTemplate from "./CandidateSettingsTemplate";
import styles from "./CandidateSettings.module.scss";
import { classes } from "./CandidateSettings.styles";
import { Image } from "antd";

const CandidateSettings = ({
  errors,
  formErrors,
  formFields,
  getInitialFields,
  handleInputChange,
  handleAdd,
  handleRemove,
  handleTableChange,
  tableData,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();

  const fields = getInitialFields(
    formFields?.max_no_of_interview,
    formFields?.max_no_of_offer,
    formFields?.big_centre_start_date,
    formFields?.big_centre_end_date,
    formFields?.small_centre_start_date,
    formFields?.small_centre_end_date
  );

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.centre" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "centre",
      key: "centre",
      renderInput: {
        customSelectInputStyles: styles.customInputStyle,
        visible: true,
        inputType: "select",
        inputPlaceholder: intl.formatMessage({
          id: "label.placeholder.select_centre",
        }),
        getInputError: (index) => errors[index].centre,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.from_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "from_date",
      key: "from_date",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledTime: (current, record) => {},
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "label.select_from_date",
        }),
        onChange: (val, record, index) => {
          handleTableChange(
            val ? dayjs(val).format("YYYY-MM-DD") : "",
            "from_date",
            index
          );
        },
        isEditable: true,
        getError: (index) => errors[index].from_date,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.to_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "to_date",
      key: "to_date",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledTime: (current, record) => {},
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "label.select_to_date",
        }),
        onChange: (val, record, index) => {
          handleTableChange(
            val ? dayjs(val).format("YYYY-MM-DD") : "",
            "to_date",
            index
          );
        },
        isEditable: true,
        getError: (index) => errors[index].to_date,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.from_time" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "from_time",
      key: "from_time",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledTime: (current, record) => {},
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.select_from_time",
        }),
        onChange: (val, record, index) => {
          handleTableChange(
            val ? dayjs(val).format("HH:mm:ss") : "",
            "from_time",
            index
          );
        },
        isEditable: true,
        getError: (index) => errors[index].from_date,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.to_time" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "to_time",
      key: "to_time",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledTime: (current, record) => {},
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.select_to_time",
        }),
        onChange: (val, record, index) => {
          handleTableChange(
            val ? dayjs(val).format("HH:mm:ss") : "",
            "to_time",
            index
          );
        },
        isEditable: true,
        getError: (index) => errors[index].to_time,
      },
    }),
    {
      title: " ",
      dataIndex: "remove",
      key: "remove",
      render: (text, record, index) => (
        <Image
          className={styles.customImageStyle}
          src={getImage(record?.isAddRow ? "addCircle" : "minusCircle")}
          alt="add/remove"
          preview={false}
          onClick={() => {
            if (record?.isAddRow) {
              handleAdd(index);
            } else {
              handleRemove(index);
            }
          }}
        />
      ),
    },
  ];

  return (
    <CandidateSettingsTemplate
      {...{
        fields,
        formErrors,
        handleInputChange,
        intl,
        columns,
        tableData,
      }}
    />
  );
};

export default CandidateSettings;
