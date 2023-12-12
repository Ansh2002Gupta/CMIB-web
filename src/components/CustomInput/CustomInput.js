import React from "react";
import PropTypes from "prop-types";
import { Input, Select, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";

import styles from "./CustomInput.module.scss";

const CustomInput = ({
  customContainerStyles,
  customErrorTextStyles,
  customInputStyles,
  customLabelStyles,
  defaultSelectValue,
  errorMessage,
  isError,
  isRequired,
  isPrefixRequired,
  isSuffixRequiredForPassword,
  isTextVisible,
  label,
  messageStyles: customMessageStyles,
  messageToShow,
  onChange,
  onSelectItem,
  onSuffixElementClick,
  placeholder,
  prefixElement,
  selectOptions,
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
        {type !== "select" && (
          <Input
            type={type || "text"}
            className={[styles.inputField, customInputStyles].join(" ")}
            {...{
              value,
              placeholder,
              onChange,
            }}
            prefix={isPrefixRequired ? prefixElement : null}
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
        )}
        {type === "select" && (
          <>
            <Select
              className={customInputStyles}
              onChange={(e) => onSelectItem(e)}
              options={selectOptions}
              defaultValue={"1"}
            />
          </>
        )}
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
  defaultSelectValue: "",
  errorMessage: "",
  isError: false,
  isPrefixRequired: false,
  isRequired: false,
  isSuffixRequiredForPassword: false,
  isTextVisible: true,
  label: "",
  messageStyles: "",
  messageToShow: "",
  onChange: () => {},
  onSelectItem: () => {},
  onSuffixElementClick: () => {},
  placeholder: "",
  prefixElement: null,
  selectOptions: [],
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
  defaultSelectValue: PropTypes.string,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isPrefixRequired: PropTypes.bool,
  isRequired: PropTypes.bool,
  isSuffixRequiredForPassword: PropTypes.bool,
  isTextVisible: PropTypes.bool,
  label: PropTypes.string,
  messageStyles: PropTypes.string,
  messageToShow: PropTypes.string,
  onChange: PropTypes.func,
  onSelectItem: PropTypes.func,
  onSuffixElementClick: PropTypes.func,
  placeholder: PropTypes.string,
  prefixElement: PropTypes.node,
  selectOptions: PropTypes.array,
  SuffixElement1: PropTypes.node,
  SuffixElement2: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default CustomInput;
