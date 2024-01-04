import React from "react";
import PropTypes from "prop-types";
import { Typography, TimePicker } from "antd";

import styles from "./CustomTimePicker.module.scss";
import { TwoRow } from "../../core/layouts";

const CustomTimePicker = ({
  customContainerStyles,
  customErrorTextStyles,
  customLabelStyles,
  customTimeStyle,
  errorMessage,
  format,
  isRequired,
  label,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <TwoRow
      className={[styles.container, customContainerStyles].join(" ")}
      topSection={
        <div className={styles.inputLabelContainer}>
          <Typography className={customLabelStyles}>{label}</Typography>
          {isRequired && (
            <Typography className={styles.isRequiredStar}>*</Typography>
          )}
        </div>
      }
      bottomSection={
        <TwoRow
          topSection={
            <TimePicker
              value={value}
              format={format}
              className={[styles.timeInput, customTimeStyle]}
              onChange={onChange}
              placeholder={placeholder}
            />
          }
          bottomSection={
            errorMessage ? (
              <Typography
                className={[styles.errorText, customErrorTextStyles].join(" ")}
              >
                * {errorMessage}
              </Typography>
            ) : (
              <></>
            )
          }
        />
      }
    />
  );
};

CustomTimePicker.defaultProps = {
  customContainerStyles: "",
  customErrorTextStyles: "",
  customLabelStyles: "",
  customTimeStyle: "",
  errorMessage: "",
  format: "h:mm a",
  isRequired: false,
  label: "",
  onChange: () => {},
  placeholder: "",
  value: "",
};

CustomTimePicker.propTypes = {
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  customTimeStyle: PropTypes.string,
  errorMessage: PropTypes.string,
  format: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default CustomTimePicker;
