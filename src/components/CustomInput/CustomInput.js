import React from "react";
import PropTypes from "prop-types";
import { Input, Select, Typography, InputNumber } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import Base from "../../core/layouts/Base/Base";
import { NUMERIC_VALUE_REGEX } from "../../constant/regex";
import styles from "./CustomInput.module.scss";

const CustomInput = ({
  currentSelectedValue,
  customContainerStyles,
  customErrorTextStyles,
  customInputNumberStyles,
  customInputStyles,
  customLabelStyles,
  customSelectInputStyles,
  defaultSelectValueArray,
  defaultSelectValueString,
  disabled,
  errorMessage,
  isError,
  isMultiSelect,
  isRequired,
  isPrefixRequired,
  isSuffixRequiredForPassword,
  isTextVisible,
  isSelectBoxDisable,
  label,
  max,
  messageStyles: customMessageStyles,
  messageToShow,
  min,
  onChange,
  onSelectItem,
  onSuffixElementClick,
  placeholder,
  prefixElement,
  selectOptions,
  SuffixIcon,
  type,
  value,
}) => {

  const handleKeyPress = (event) => {
    const charCode = typeof event.which === "undefined" ? event.keyCode : event.which;
    const charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/) && !event.ctrlKey && !event.metaKey && !event.altKey && charCode !== 8 && charCode !== 13) {
      event.preventDefault();
    }
  };

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
      <div
        className={[
          styles.formContainer,
          type === "mobile" ? styles.mobile : "",
        ].join(" ")}
      >
        {(type === "select" || type === "mobile") && (
          <>
            <Select
              mode={isMultiSelect ? "multiple" : ""}
              className={[styles.selectInput, customSelectInputStyles].join(
                " "
              )}
              onChange={(changedValue) => {
                onSelectItem({
                  target: {
                    value: changedValue,
                  },
                });
              }}
              options={selectOptions}
              defaultValue={
                isMultiSelect
                  ? defaultSelectValueArray
                  : defaultSelectValueString
              }
              disabled={isSelectBoxDisable}
            />
          </>
        )}
        {((type !== "select" && type !== "inputNumber") ||
          type === "mobile") && (
          <Input
            type={type || "text"}
            className={[
              styles.inputField,
              type === "mobile" ? styles.mobileInput : "",
              ,
              customInputStyles,
            ].join(" ")}
            onChange={(event) => {
              if (
                event.target.value === "" ||
                NUMERIC_VALUE_REGEX.test(event.target.value)
              ) {
                onChange(event);
              }
            }}
            {...{
              value,
              placeholder,
              disabled,
            }}
            prefix={isPrefixRequired ? prefixElement : null}
            suffix={
              <>
                {isSuffixRequiredForPassword &&
                  (isTextVisible ? (
                    <span
                      className={styles.suffixElement}
                      onClick={() => {
                        onSuffixElementClick && onSuffixElementClick();
                      }}
                    >
                      <EyeOutlined />
                    </span>
                  ) : (
                    <span
                      className={styles.suffixElement}
                      onClick={() => {
                        onSuffixElementClick && onSuffixElementClick();
                      }}
                    >
                      <EyeInvisibleOutlined />
                    </span>
                  ))}
                {SuffixIcon && (
                  <SuffixIcon
                    onClick={() => {
                      onSuffixElementClick && onSuffixElementClick();
                    }}
                  />
                )}
              </>
            }
          />
        )}
        {type === "inputNumber" && (
          <InputNumber
            className={[styles.inputNumberStyles, customInputNumberStyles]}
            onKeyDown={handleKeyPress}
            {...{
              value,
              placeholder,
              onChange,
              disabled,
              min,
              max,
            }}
          />
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
  currentSelectedValue: "",
  customContainerStyles: "",
  customErrorTextStyles: "",
  customInputNumberStyles: "",
  customInputStyles: "",
  customLabelStyles: "",
  customSelectInputStyles: "",
  defaultSelectValueArray: [],
  defaultSelectValueString: "",
  disabled: false,
  errorMessage: "",
  isError: false,
  isMultiSelect: false,
  isPrefixRequired: false,
  isRequired: false,
  isSuffixRequiredForPassword: false,
  isTextVisible: true,
  isSelectBoxDisable: false,
  label: "",
  max: 10,
  messageStyles: "",
  messageToShow: "",
  min: 0,
  onChange: () => {},
  onSelectItem: () => {},
  onSuffixElementClick: () => {},
  placeholder: "",
  prefixElement: null,
  selectOptions: [],
  SuffixIcon: null,
  type: "",
  value: "",
};

CustomInput.propTypes = {
  currentSelectedValue: PropTypes.string,
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  customInputNumberStyles: PropTypes.string,
  customInputStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  customSelectInputStyles: PropTypes.string,
  defaultSelectValueArray: PropTypes.array,
  defaultSelectValueString: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  isPrefixRequired: PropTypes.bool,
  isRequired: PropTypes.bool,
  isSuffixRequiredForPassword: PropTypes.bool,
  isTextVisible: PropTypes.bool,
  isSelectBoxDisable: PropTypes.bool,
  label: PropTypes.string,
  max: PropTypes.number,
  messageStyles: PropTypes.string,
  messageToShow: PropTypes.string,
  min: PropTypes.number,
  onChange: PropTypes.func,
  onSelectItem: PropTypes.func,
  onSuffixElementClick: PropTypes.func,
  placeholder: PropTypes.string,
  prefixElement: PropTypes.node,
  selectOptions: PropTypes.array,
  SuffixIcon: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default CustomInput;
