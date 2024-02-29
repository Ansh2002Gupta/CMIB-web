import React from "react";
import { useIntl } from "react-intl";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import CustomInput from "../CustomInput/CustomInput";
import CustomDateTimePicker from "../CustomDateTimePicker/CustomDateTimePicker";
import styles from "./EditCentreSetupFeeAndTime.module.scss";

const EditCentreSetupFeeAndTime = ({ formData, handleInputChange, isEdit }) => {
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
      <CustomInput
        type="inputNumber"
        customContainerStyles={styles.customContainerStyles}
        customInputNumberStyles={styles.input}
        customLabelStyles={styles.inputLabel}
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
      <CustomDateTimePicker
        customLabelStyles={styles.inputLabel}
        customTimeStyle={styles.timeInput}
        customContainerStyles={styles.customContainerStyles}
        isRequired
        label={intl.formatMessage({ id: "label.centreStartTime" })}
        onChange={(momentValue, timeString) => {
          handleInputChange(
            momentValue ? dayjs(momentValue).format("HH:mm:ss") : "",
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
          const endTime = momentValue
            ? dayjs(formData?.centreEndTime).format("HH:mm:ss")
            : "";
          const startTime = formData?.centreStartTime;
          if (
            !startTime ||
            dayjs(endTime, "HH:mm:ss").isAfter(dayjs(startTime, "HH:mm:ss"))
          ) {
            handleInputChange(endTime, "centreEndTime");
          } else {
            handleInputChange("", "centreEndTime");
          }
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
