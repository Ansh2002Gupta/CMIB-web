import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Input, Select, Typography, InputNumber } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import Base from "../../core/layouts/Base/Base";

import MarkRequired from "../MarkRequired";
import styles from "./CustomInput.module.scss";
import { classes } from "./CustomInput.styles";

const CustomInput = React.forwardRef(
  (
    {
      showControls = false,
      customContainerStyles,
      customErrorTextStyles,
      customInputNumberStyles,
      customInputStyles,
      customLabelStyles,
      customSelectInputStyles,
      defaultSelectValueArray,
      defaultSelectValueString,
      disabled,
      errorInput,
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
      maxLength,
      messageStyles: customMessageStyles,
      messageToShow,
      min,
      onBlur,
      onChange,
      onSelectItem,
      onSuffixElementClick,
      placeholder,
      prefixElement,
      selectOptions,
      SuffixIcon,
      type,
      value,
    },
    ref
  ) => {
    const inputFieldRef = useRef();

    const restoreCursorPosition = () => {
      let selectionStart = inputFieldRef?.current?.input?.selectionStart;
      let selectionEnd = inputFieldRef?.current?.input?.selectionEnd;

      onSuffixElementClick();

      requestAnimationFrame(() => {
        inputFieldRef?.current?.setSelectionRange(selectionStart, selectionEnd);
      });
    };

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
        <div
          className={[
            styles.formContainer,
            type === "mobile" ? styles.mobile : "",
          ].join(" ")}
          ref={ref}
        >
          {type === "select" && (
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
          {type !== "select" && type !== "inputNumber" && type !== "mobile" && (
            <Input
              ref={isSuffixRequiredForPassword ? inputFieldRef : ref}
              type={type || "text"}
              style={classes.inputStyle}
              className={[
                styles.inputField,
                customInputStyles,
                isError && errorMessage ? styles.errorInput : "",
              ].join(" ")}
              {...{
                value,
                placeholder,
                disabled,
                maxLength,
                onChange,
                onBlur,
              }}
              prefix={isPrefixRequired ? prefixElement : null}
              suffix={
                <>
                  {isSuffixRequiredForPassword &&
                    (isTextVisible ? (
                      <span
                        className={styles.suffixElement}
                        onClick={() => {
                          onSuffixElementClick && restoreCursorPosition();
                        }}
                      >
                        <EyeOutlined />
                      </span>
                    ) : (
                      <span
                        className={styles.suffixElement}
                        onClick={() => {
                          onSuffixElementClick && restoreCursorPosition();
                        }}
                      >
                        <EyeInvisibleOutlined />
                      </span>
                    ))}
                  {SuffixIcon && (
                    <span className={styles.suffixElement}>
                      <SuffixIcon
                        onClick={() => {
                          onSuffixElementClick && onSuffixElementClick();
                        }}
                      />
                    </span>
                  )}
                </>
              }
            />
          )}
          {type === "inputNumber" && (
            <InputNumber
              type="number"
              controls={showControls}
              className={[
                styles.inputNumberStyles,
                customInputNumberStyles,
                isError && errorMessage ? errorInput : "",
              ].join(" ")}
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
        {errorMessage && (
          <div>
            <Typography
              className={[
                styles.errorText,
                customErrorTextStyles,
                isError ? styles.showError : "",
              ].join(" ")}
            >
              {errorMessage ? ` * ${errorMessage}` : ""}
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
  }
);

CustomInput.defaultProps = {
  customContainerStyles: "",
  customErrorTextStyles: "",
  customInputNumberStyles: "",
  customInputStyles: "",
  customLabelStyles: "",
  customSelectInputStyles: "",
  defaultSelectValueArray: [],
  defaultSelectValueString: "",
  disabled: false,
  errorInput: "",
  errorMessage: "",
  isError: false,
  isMultiSelect: false,
  isPrefixRequired: false,
  isRequired: false,
  isSuffixRequiredForPassword: false,
  isTextVisible: true,
  isSelectBoxDisable: false,
  label: "",
  maxLength: 100,
  messageStyles: "",
  messageToShow: "",
  min: 0,
  onBlur: () => {},
  onChange: () => {},
  onSelectItem: () => {},
  onSuffixElementClick: () => {},
  placeholder: "",
  prefixElement: null,
  ref: null,
  selectOptions: [],
  SuffixIcon: null,
  type: "",
  value: "",
};

CustomInput.propTypes = {
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  customInputNumberStyles: PropTypes.string,
  customInputStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  customSelectInputStyles: PropTypes.string,
  defaultSelectValueArray: PropTypes.array,
  defaultSelectValueString: PropTypes.string,
  disabled: PropTypes.bool,
  errorInput: PropTypes.string,
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
  maxLength: PropTypes.number,
  messageStyles: PropTypes.string,
  messageToShow: PropTypes.string,
  min: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSelectItem: PropTypes.func,
  onSuffixElementClick: PropTypes.func,
  placeholder: PropTypes.string,
  prefixElement: PropTypes.node,
  ref: PropTypes.func,
  selectOptions: PropTypes.array,
  SuffixIcon: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomInput;
