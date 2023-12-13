import React from "react";
import PropTypes from "prop-types";
import { Input, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";

import styles from "./CustomInput.module.scss";

const CustomInput = ({
  customContainerStyles,
  customErrorTextStyles,
  customInputStyles,
  customLabelStyles,
  disabled,
  errorMessage,
  isError,
  isRequired,
  isSuffixRequiredForPassword,
  isTextVisible,
  label,
  messageStyles: customMessageStyles,
  messageToShow,
  onChange,
  onSuffixElementClick,
  placeholder,
  SuffixElement1,
  SuffixElement2,
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
            disabled,
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
      {!!messageToShow && (
        <div>
          <Typography
            className={[styles.messageText, customMessageStyles].join(" ")}
          >
            {messageToShow}
          </Typography>
        </div>
      )}
    </Base>
  );
};

CustomInput.defaultProps = {
  customContainerStyles: "",
  customErrorTextStyles: "",
  customInputStyles: "",
  customLabelStyles: "",
  disabled: false,
  errorMessage: "",
  isError: false,
  isRequired: false,
  isSuffixRequiredForPassword: false,
  isTextVisible: true,
  label: "",
  messageStyles: "",
  messageToShow: "",
  onChange: () => {},
  onSuffixElementClick: () => {},
  placeholder: "",
  SuffixElement1: null,
  SuffixElement2: null,
  type: "",
  value: "",
};

CustomInput.propTypes = {
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  customInputStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isRequired: PropTypes.bool,
  isSuffixRequiredForPassword: PropTypes.bool,
  isTextVisible: PropTypes.bool,
  label: PropTypes.string,
  messageStyles: PropTypes.string,
  messageToShow: PropTypes.string,
  onChange: PropTypes.func,
  onSuffixElementClick: PropTypes.func,
  placeholder: PropTypes.string,
  SuffixElement1: PropTypes.node,
  SuffixElement2: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default CustomInput;
