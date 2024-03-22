import React from "react";
import dayjs from "dayjs";
import { Table, Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import {
  MAX_REGISTRATION_FEE_LENGTH,
  TIMER_OF_1_MINUTES,
} from "../../constant/constant";
import commonStyles from "../../common/commonStyles.module.scss";
import { classes } from "./CandidateSettings.styles";
import styles from "./CandidateSettings.module.scss";
import "./Override.css";
import { compareTwoDayjsDates, isNotAFutureDate } from "../../constant/utils";

const CandidateSettingsTemplate = ({
  editConfigurations,
  fields,
  formErrors,
  handleInputChange,
  intl,
  isEditable,
  tableData,
  viewConfigurations,
}) => {
  const getDateValues = (fields) => {
    return fields.reduce((acc, row) => {
      row.forEach((field) => {
        if (field.isDateTimePicker && field.value) {
          acc[field.label] = dayjs(field.value);
        }
      });
      return acc;
    }, {});
  };

  const disabledDate = (current, label) => {
    if (isNotAFutureDate(current)) return true;

    const dateLimits = {
      big_centre_start_date: {
        after: ["big_centre_end_date"],
      },
      big_centre_end_date: {
        before: ["big_centre_start_date"],
      },
      small_centre_start_date: {
        after: ["small_centre_end_date"],
      },
      small_centre_end_date: {
        before: ["small_centre_start_date"],
      },
    };

    const limits = dateLimits[label];
    if (!limits) return false;
    const dateValues = getDateValues(fields);

    if (limits.before) {
      const beforeKey = limits.before;
      if (dateValues[beforeKey]) {
        if (
          compareTwoDayjsDates({
            current,
            date: dateValues[beforeKey],
            checkForFuture: false,
          })
        ) {
          return true;
        }
      }
    }

    if (limits.after) {
      const afterKeys = limits.after;
      for (let afterKey of afterKeys) {
        if (dateValues[afterKey]) {
          if (
            compareTwoDayjsDates({
              current,
              date: dateValues[afterKey],
              checkForFuture: true,
            })
          ) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const renderBottomSection = (field) => {
    if (!isEditable) {
      return (
        <Typography className={styles.inputLabel}>{field.value}</Typography>
      );
    }

    if (field.isDateTimePicker) {
      return (
        <CustomDateTimePicker
          customLabelStyles={styles.inputLabel}
          customInputStyle={classes.inputStyle}
          type="date"
          onChange={(val) => {
            handleInputChange(
              val ? dayjs(val).format("YYYY-MM-DD") : "",
              field.label
            );
          }}
          disabledDate={(current) => disabledDate(current, field.label)}
          placeholder={intl.formatMessage({
            id: `placeholder.${field.headingIntl}`,
          })}
          value={field.value}
          isEditable={isEditable}
        />
      );
    }

    return (
      <CustomInput
        controls
        value={field.value}
        customLabelStyles={styles.inputLabel}
        customInputNumberStyles={styles.input}
        customContainerStyles={styles.customContainerStyles}
        onChange={(val) => handleInputChange(val, field.label)}
        min={TIMER_OF_1_MINUTES}
        max={MAX_REGISTRATION_FEE_LENGTH}
        type={"inputNumber"}
        placeholder={intl.formatMessage({
          id: `placeholder.${field.headingIntl}`,
        })}
        isError={formErrors[field.label]}
        errorMessage={
          formErrors[field.label]
            ? intl.formatMessage({
                id: `label.error.${formErrors[field.label]}`,
              })
            : ""
        }
      />
    );
  };

  return (
    <div className={commonStyles.mainContainer}>
      <Typography className={styles.heading}>
        {intl.formatMessage({ id: "session.candidateSettings" })}
      </Typography>
      {fields?.map((row, rowIndex) => (
        <CustomGrid
          key={rowIndex}
          customStyle={`${commonStyles.customGridStyle} ${styles.row}`}
        >
          {row.map((field, columnIndex) => (
            <TwoRow
              key={columnIndex}
              className={`${styles.gridItem} ${styles.column}`}
              topSection={
                <Typography className={styles.grayText}>
                  {intl.formatMessage({
                    id: `label.${field.headingIntl}`,
                  })}
                  {field.rules.isRequired && (
                    <span className={styles.redText}> *</span>
                  )}
                </Typography>
              }
              bottomSection={renderBottomSection(field)}
            />
          ))}
        </CustomGrid>
      ))}
      <Typography className={styles.subHeadingStyle}>
        {intl.formatMessage({ id: "label.allow_consent_for_candidate" })}
      </Typography>
      <div
        className={`${
          isEditable ? styles.editContainer : styles.viewContainer
        }`}
      >
        <Table
          columns={isEditable ? editConfigurations : viewConfigurations}
          dataSource={tableData}
          pagination={false}
          rowClassName={!isEditable ? styles.rowtext : ""}
          scroll={{ x: "max-content" }}
          className={`${isEditable ? "customTable" : ""} ${
            styles.customContainerStyles
          } customTableNoHover`}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default CandidateSettingsTemplate;
