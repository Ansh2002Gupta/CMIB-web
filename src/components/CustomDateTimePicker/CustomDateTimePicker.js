import React from "react";
import PropTypes from "prop-types";
import { Typography, TimePicker, DatePicker } from "antd";
import moment from "moment";

import styles from "./CustomDateTimePicker.module.scss";
import { TwoRow } from "../../core/layouts";

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
        <div className={styles.inputLabelContainer}>
          <Typography className={customLabelStyles}>
            {label}
            {isRequired && <span className={styles.isRequiredStar}> *</span>}
          </Typography>
        </div>
      }
      bottomSection={
        <TwoRow
          topSection={
            type === "time" ? (
              <TimePicker
                value={value}
                format={format}
                className={[styles.timeInput, customTimeStyle]}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
              />
            ) : (
              <DatePicker
                value={value}
                format={dateFormat}
                className={[styles.timeInput, customTimeStyle]}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
              />
            )
          }
          bottomSection={
            errorMessage ? (
              <Typography
                className={[styles.errorText, customErrorTextStyles].join(" ")}
              >
                * {errorMessage}
              </Typography>
            ) : (
              <Typography></Typography>
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
  defaultValue: moment(),
  disabled: false,
  errorMessage: "",
  format: "h:mm a",
  isRequired: false,
  label: "",
  onChange: () => {},
  placeholder: "",
  type: "time",
  value: moment(),
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
