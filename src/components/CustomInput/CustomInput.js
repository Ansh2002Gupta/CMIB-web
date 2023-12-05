import React from "react";
import PropTypes from "prop-types";
import { Input, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";

import styles from "./CustomInput.module.scss";

const CustomInput = ({
  SuffixElement1,
  SuffixElement2,
  customContainerStyles,
  customErrorTextStyles,
  customInputStyles,
  customLabelStyles,
  errorMessage,
  isError,
  isRequired,
  isSuffixRequiredForPassword,
  isTextVisible,
  label,
  onChange,
  onSuffixElementClick,
  placeholder,
  type,
  value,
}) => {
  return (
    <Base className={[styles.container, customContainerStyles].join(" ")}>
      {!!label && (
        <div className={styles.inputLabelContainer}>
          <Typography className={customLabelStyles}>{label}</Typography>
          {isRequired && (
            <Typography className={styles.isRequiredStar}>*</Typography>
          )}
        </div>
      )}
      <div className={styles.formContainer}>
        <Input
          type={type || "text"}
          className={[styles.inputField, customInputStyles].join(" ")}
          {...{
            value,
            placeholder,
            onChange,
          }}
          suffix={
            isSuffixRequiredForPassword ? (
              isTextVisible ? (
                <span
                  className={styles.suffixElement}
                  onClick={() => {
                    onSuffixElementClick && onSuffixElementClick();
                  }}
                >
                  {SuffixElement1}
                </span>
              ) : (
                <span
                  className={styles.suffixElement}
                  onClick={() => {
                    onSuffixElementClick && onSuffixElementClick();
                  }}
                >
                  {SuffixElement2}
                </span>
              )
            ) : null
          }
        />
      </div>
      {isError && (
        <div>
          <Typography
            className={[styles.errorText, customErrorTextStyles].join(" ")}
          >
            * {errorMessage}
          </Typography>
        </div>
      )}
    </Base>
  );
};

CustomInput.defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  value: "",
  customInputStyles: "",
  customLabelStyles: "",
  customContainerStyles: "",
  customErrorTextStyles: "",
  onChange: () => {},
  errorMessage: "",
  isError: false,
  isRequired: false,
  isSuffixRequiredForPassword: false,
  SuffixElement1: null,
  SuffixElement2: null,
  onSuffixElementClick: () => {},
  isTextVisible: true,
};

CustomInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  customInputStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isRequired: PropTypes.bool,
  isSuffixRequiredForPassword: PropTypes.bool,
  SuffixElement1: PropTypes.node,
  SuffixElement2: PropTypes.node,
  onSuffixElementClick: PropTypes.func,
  isTextVisible: PropTypes.bool,
};

export default CustomInput;
