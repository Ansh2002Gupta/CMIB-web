import React from "react";
import { useIntl } from "react-intl";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import CustomInput from "../CustomInput/CustomInput";
import CustomDateTimePicker from "../CustomDateTimePicker/CustomDateTimePicker";
import { MODULE_KEYS } from "../../constant/constant";
import styles from "./EditCentreSetupFeeAndTime.module.scss";

const EditCentreSetupFeeAndTime = ({
  formData,
  handleInputChange,
  isEdit,
  selectedModule,
}) => {
  const intl = useIntl();
  const handleDisabledEndTime = () => {
    if (!formData.centreStartTime) {
      return {};
    }
    const startTime = dayjs(formData.centreStartTime, "HH:mm:ss");
    return {
      disabledHours: () => {
        const hours = [];
        for (let i = 0; i < startTime.hour(); i++) {
          hours.push(i);
        }
        return hours;
      },
      disabledMinutes: (selectedHour) => {
        const minutes = [];
        if (selectedHour === startTime.hour()) {
          for (let i = 0; i < startTime.minute(); i++) {
            minutes.push(i);
          }
        }
        return minutes;
      },
    };
  };
  return (
    <div className={styles.topSectionStyle}>
      {selectedModule === MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY && (
        <CustomInput
          customLabelStyles={styles.inputLabel}
          customInputStyles={styles.input}
          customContainerStyles={styles.customContainerStyles}
          isRequired
          label={intl.formatMessage({ id: "label.writtenTestFee" })}
          onChange={(val) => {
            handleInputChange(val.target.value, "PsychometricFee");
          }}
          placeholder={intl.formatMessage({
            id: `label.placeholder.writtenTestFee`,
          })}
          value={formData?.PsychometricFee}
          disabled={!isEdit}
        />
      )}
      <CustomDateTimePicker
        customLabelStyles={styles.inputLabel}
        customTimeStyle={styles.timeInput}
        customContainerStyles={styles.customContainerStyles}
        isRequired
        label={intl.formatMessage({ id: "label.centreStartTime" })}
        onChange={(momentValue, timeString) => {
          handleInputChange(
            dayjs(momentValue).format("HH:mm:ss"),
            "centreStartTime"
          );
        }}
        placeholder={intl.formatMessage({
          id: "label.placeholder.centreStartTime",
        })}
        value={
          formData?.centreStartTime &&
          dayjs(formData?.centreStartTime, "HH:mm:ss")
        }
        disabled={!isEdit}
      />
      <CustomDateTimePicker
        customLabelStyles={styles.inputLabel}
        customTimeStyle={styles.timeInput}
        customContainerStyles={styles.customContainerStyles}
        isRequired
        label={intl.formatMessage({ id: "label.centreEndTime" })}
        onChange={(momentValue) => {
          handleInputChange(
            dayjs(momentValue).format("HH:mm:ss"),
            "centreEndTime"
          );
        }}
        disabledTime={handleDisabledEndTime}
        placeholder={intl.formatMessage({
          id: "label.placeholder.centreEndTime",
        })}
        value={
          formData?.centreEndTime && dayjs(formData?.centreEndTime, "HH:mm:ss")
        }
        disabled={!isEdit}
      />
    </div>
  );
};

EditCentreSetupFeeAndTime.propTypes = {
  formData: PropTypes.object,
  handleInputChange: PropTypes.func,
  isEdit: PropTypes.bool,
};

export default EditCentreSetupFeeAndTime;
