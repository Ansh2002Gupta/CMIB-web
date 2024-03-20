import React, { useContext } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { DatePicker, Image, TimePicker, Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import MarkRequired from "../MarkRequired";
import { formatDate, formatTime } from "../../constant/utils";
import classes from "./CustomDateTimePicker.module.scss";
import { styles } from "./CustomDateTimePicker.styles";
import "./Override.css";

const CustomDateTimePicker = ({
  customContainerStyles,
  customErrorTextStyles,
  customLabelStyles,
  customTimeStyle,
  dateFormat,
  defaultValue,
  disabled,
  disabledDate,
  disabledTime,
  errorMessage,
  errorTimeInput,
  format,
  isEditable,
  isRequired,
  isSpacedError,
  label,
  onChange,
  placeholder,
  type,
  use12Hours,
  value,
  useExactDate,
}) => {
  const { getImage } = useContext(ThemeContext);

  return (
    <TwoRow
      className={[styles.container, customContainerStyles].join(" ")}
      topSection={
        label && (
          <div className={styles.inputLabelContainer}>
            <Typography className={customLabelStyles}>
              {label}&nbsp;
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
                    disabledTime,
                  }}
                  use12Hours={true}
                  className={[
                    styles.timeInput,
                    customTimeStyle,
                    errorTimeInput,
                  ]}
                  suffixIcon={<Image src={getImage("clock")} />}
                  value={value ? dayjs(value, "HH:mm:ss") : null}
                  onSelect={onChange}
                  popupClassName="noFooterTimePick"
                  needConfirm={false}
                />
              ) : (
                <Typography className={classes.dateText}>
                  {formatTime({ time: dayjs(value, "HH:mm:ss") })}
                </Typography>
              )
            ) : isEditable ? (
              <DatePicker
                {...{
                  defaultValue,
                  disabled,
                  disabledDate,
                  onChange,
                  placeholder,
                }}
                format={dateFormat}
                className={[styles.timeInput, customTimeStyle, errorTimeInput]}
                suffixIcon={<Image src={getImage("calendar")} />}
                value={value ? dayjs(value) : null}
                style={styles.inputStyle}
              />
            ) : (
              <Typography className={classes.dateText}>
                {formatDate({ date: value, useExactDate: true })}
              </Typography>
            )
          }
          bottomSection={
            <Typography
              className={[classes.errorText, customErrorTextStyles].join(" ")}
            >
              {errorMessage ? `${errorMessage}` : isSpacedError ? `\u00A0` : ""}
            </Typography>
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
  format: "hh:mm a",
  isEditable: true,
  isRequired: false,
  isSpacedError: false,
  label: "",
  onChange: () => {},
  placeholder: "",
  type: "time",
  use12Hours: false,
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
  disabledTime: PropTypes.func,
  disabledDate: PropTypes.func,
  errorMessage: PropTypes.string,
  errorTimeInput: PropTypes.string,
  format: PropTypes.string,
  isEditable: PropTypes.bool,
  isRequired: PropTypes.bool,
  isSpacedError: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  use12Hours: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default CustomDateTimePicker;
