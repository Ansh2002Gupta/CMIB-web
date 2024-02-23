import React, { useContext } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { DatePicker, Image, TimePicker, Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import MarkRequired from "../MarkRequired";
import { formatDate, formatTime } from "../../constant/utils";
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
  errorTimeInput,
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
              {isRequired && <MarkRequired />}
            </Typography>
          </div>
        )
      }
      bottomSection={
        <TwoRow
          topSection={
            type === "time" ? (
              isEditable ? (
                <TimePicker
                  {...{
                    format,
                    defaultValue,
                    onChange,
                    placeholder,
                    disabled,
                  }}
                  className={[
                    styles.timeInput,
                    customTimeStyle,
                    errorTimeInput,
                  ]}
                  suffixIcon={<Image src={getImage("clock")} />}
                  value={value ? dayjs(value) : null}
                />
              ) : (
                <Typography className={styles.dateText}>
                  {formatTime(value)}
                </Typography>
              )
            ) : isEditable ? (
              <DatePicker
                {...{ defaultValue, onChange, placeholder, disabled }}
                format={dateFormat}
                className={[styles.timeInput, customTimeStyle, errorTimeInput]}
                suffixIcon={<Image src={getImage("calendar")} />}
                value={value ? dayjs(value) : null}
              />
            ) : (
              <Typography className={styles.dateText}>
                {formatDate({ date: value })}
              </Typography>
            )
          }
          bottomSection={
            errorMessage && (
              <Typography
                className={[styles.errorText, customErrorTextStyles].join(" ")}
              >
                {errorMessage}
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
  errorTimeInput: "",
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
  errorTimeInput: PropTypes.string,
  format: PropTypes.string,
  isEditable: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default CustomDateTimePicker;
