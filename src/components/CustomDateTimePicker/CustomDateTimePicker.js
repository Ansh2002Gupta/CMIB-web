import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DatePicker, Image, TimePicker, Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import { formatDate } from "../../constant/utils";
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
  isEditable,
  isRequired,
  label,
  onChange,
  placeholder,
  type,
  value,
}) => {
  const { getImage } = useContext(ThemeContext);

  return (
    <TwoRow
      className={[styles.container, customContainerStyles].join(" ")}
      topSection={
        label && (
          <div className={styles.inputLabelContainer}>
            <Typography className={customLabelStyles}>
              {label}
              {isRequired && <span className={styles.isRequiredStar}> *</span>}
            </Typography>
          </div>
        )
      }
      bottomSection={
        <TwoRow
          topSection={
            type === "time" ? (
              <TimePicker
                {...{
                  format,
                  defaultValue,
                  onChange,
                  placeholder,
                  disabled,
                  value,
                }}
                className={[styles.timeInput, customTimeStyle]}
              />
            ) : isEditable ? (
              <DatePicker
                {...{ defaultValue, onChange, placeholder, disabled, value }}
                format={dateFormat}
                className={[styles.timeInput, customTimeStyle]}
                suffixIcon={<Image src={getImage("calendar")} />}
              />
            ) : (
              <Typography className={styles.dateText}>
                {formatDate(value)}
              </Typography>
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
  defaultValue: null,
  disabled: false,
  errorMessage: "",
  format: "h:mm a",
  isEditable: true,
  isRequired: false,
  label: "",
  onChange: () => {},
  placeholder: "",
  type: "time",
  value: null,
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
  isEditable: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.object,
};

export default CustomDateTimePicker;
