import React from "react";
import PropTypes from "prop-types";
import { Typography, TimePicker, DatePicker } from "antd";

import { TwoRow } from "../../core/layouts";

import styles from "./CustomDateTimePicker.module.scss";

const CustomDateTimePicker = ({
  customContainerStyles,
  customErrorTextStyles,
  customLabelStyles,
  customTimeStyle,
  dateFormat,
  defaultValue,
  disabled,
  errorMessage,
  format,
  isRequired,
  label,
  onChange,
  placeholder,
  type,
  value,
}) => {
  return (
    <TwoRow
      className={[styles.container, customContainerStyles].join(" ")}
      topSection={
        label && (
          <div className={styles.inputLabelContainer}>
            <Typography className={customLabelStyles}>{label}</Typography>
            {isRequired && (
              <Typography className={styles.isRequiredStar}>*</Typography>
            )}
          </div>
        )
      }
      bottomSection={
        <TwoRow
          topSection={
            type === "time" ? (
              <TimePicker
                {...{
                  value,
                  format,
                  defaultValue,
                  onChange,
                  placeholder,
                  disabled,
                }}
                className={[styles.timeInput, customTimeStyle]}
              />
            ) : (
              <DatePicker
                {...{ value, defaultValue, onChange, placeholder, disabled }}
                format={dateFormat}
                className={[styles.timeInput, customTimeStyle]}
              />
            )
          }
          bottomSection={
            errorMessage && (
              <Typography
                className={[styles.errorText, customErrorTextStyles].join(" ")}
              >
                * {errorMessage}
              </Typography>
            )
          }
        />
      }
    />
  );
};

CustomDateTimePicker.defaultProps = {
  customContainerStyles: "",
  customErrorTextStyles: "",
  customLabelStyles: "",
  customTimeStyle: "",
  dateFormat: "DD/MM/YYYY",
  defaultValue: "",
  disabled: false,
  errorMessage: "",
  format: "h:mm a",
  isRequired: false,
  label: "",
  onChange: () => {},
  placeholder: "",
  type: "time",
  value: {},
};

CustomDateTimePicker.propTypes = {
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  customTimeStyle: PropTypes.string,
  dateFormat: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  format: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.object,
};

export default CustomDateTimePicker;
