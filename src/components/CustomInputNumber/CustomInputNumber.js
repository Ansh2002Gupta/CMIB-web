import React from "react";
import PropTypes from "prop-types";
import { InputNumber, Typography } from "antd";

import { Base } from "../../core/layouts";

import MarkRequired from "../MarkRequired";
import styles from "./CustomInputNumber.module.scss";
import "./override.css";

const CustomInputNumber = (
  {
    controls,
    customContainerStyles,
    customErrorTextStyles,
    customInputNumberStyles,
    customLabelStyles,
    disabled,
    errorMessage,
    isRequired,
    label,
    onBlur,
    onChange,
    placeholder,
    value,
  },
  ref
) => {
  return (
    <Base className={[styles.container, customContainerStyles].join(" ")}>
      {!!label && (
        <div className={styles.inputLabelContainer}>
          <Typography className={customLabelStyles}>
            {label}
            {isRequired && <MarkRequired />}
          </Typography>
        </div>
      )}
      <div className={styles.formContainer}>
        <InputNumber
          // controls={controls}
          className={[styles.inputNumberStyles, customInputNumberStyles]}
          {...{
            disabled,
            onBlur,
            onChange,
            placeholder,
            value,
          }}
        />
      </div>
      {errorMessage && (
        <div>
          <Typography
            className={[
              styles.errorText,
              customErrorTextStyles,
              errorMessage ? styles.showError : "",
            ].join(" ")}
          >
            {errorMessage ? { errorMessage } : ""}
          </Typography>
        </div>
      )}
    </Base>
  );
};

CustomInputNumber.defaultProps = {
  controls: false,
  customContainerStyles: "",
  customErrorTextStyles: "",
  customInputNumberStyles: "",
  customLabelStyles: "",
  disabled: false,
  errorMessage: "",
  isRequired: false,
  label: "",
  onBlur: () => {},
  onChange: () => {},
  placeholde: "",
  value: null,
};

CustomInputNumber.propTypes = {
  controls: PropTypes.bool,
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  customInputNumberStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.number,
};

export default CustomInputNumber;
