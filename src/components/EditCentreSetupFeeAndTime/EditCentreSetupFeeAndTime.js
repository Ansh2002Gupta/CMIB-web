import React from "react";
import { useIntl } from "react-intl";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import CustomInput from "../CustomInput/CustomInput";
import CustomDateTimePicker from "../CustomDateTimePicker/CustomDateTimePicker";
import { getTimeWithZeroSec } from "../../constant/utils";
import { MAX_CTC_LENGTH, MODULE_KEYS } from "../../constant/constant";
import styles from "./EditCentreSetupFeeAndTime.module.scss";

const EditCentreSetupFeeAndTime = ({
  formData,
  handleInputChange,
  hasRoundTwo,
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

  const handleOnChangeEndTime = (momentValue) => {
    const time = dayjs(momentValue).format("HH:mm:ss");
    const endTime = getTimeWithZeroSec(time);
    const startTime = formData?.centreStartTime;
    if (
      !startTime ||
      dayjs(endTime, "HH:mm:ss").isAfter(dayjs(startTime, "HH:mm:ss"))
    ) {
      handleInputChange(endTime, "centreEndTime");
    } else {
      handleInputChange("", "centreEndTime");
    }
  };

  return (
    <div className={styles.topSectionStyle}>
      {selectedModule === MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY && (
        <>
          {!hasRoundTwo && (
            <CustomInput
              type="inputNumber"
              customInputNumberStyles={styles.input}
              customLabelStyles={styles.inputLabel}
              customContainerStyles={styles.customContainerStyles}
              isRequired
              label={intl.formatMessage({ id: "label.writtenTestFee" })}
              onChange={(val) => {
                handleInputChange(val, "PsychometricFee");
              }}
              maxLength={MAX_CTC_LENGTH}
              placeholder={intl.formatMessage({
                id: `label.placeholder.writtenTestFee`,
              })}
              value={formData?.PsychometricFee}
              disabled={!isEdit}
            />
          )}
        </>
      )}
      <CustomDateTimePicker
        customLabelStyles={styles.inputLabel}
        customTimeStyle={styles.timeInput}
        customContainerStyles={styles.customDatePickerStyles}
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
        customContainerStyles={styles.customDatePickerStyles}
        isRequired
        label={intl.formatMessage({ id: "label.centreEndTime" })}
        onChange={handleOnChangeEndTime}
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
