import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Input, Select, Typography, InputNumber } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import Base from "../../core/layouts/Base/Base";

import MarkRequired from "../MarkRequired";
import styles from "./CustomInput.module.scss";
import { classes } from "./CustomInput.styles";
import "./override.css";

const CustomInput = React.forwardRef(
  (
    {
      controls,
      customContainerStyles,
      customErrorTextStyles,
      customInputNumberStyles,
      customInputStyles,
      customLabelStyles,
      customSelectInputStyles,
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
      precision,
      rows,
      selectOptions,
      SuffixIcon,
      type,
      value,
    },
    ref
  ) => {
    const inputFieldRef = useRef();
    const { TextArea } = Input;

    const restoreCursorPosition = () => {
      let selectionStart = inputFieldRef?.current?.input?.selectionStart;
      let selectionEnd = inputFieldRef?.current?.input?.selectionEnd;

      onSuffixElementClick();

      requestAnimationFrame(() => {
        inputFieldRef?.current?.setSelectionRange(selectionStart, selectionEnd);
      });
    };

    const handleInputChange = (newValue) => {
      if (
        maxLength &&
        !isNaN(newValue) &&
        newValue?.toString()?.length <= maxLength
      ) {
        onChange(newValue);
        return;
      }
      onChange(newValue);
    };

    const handleKeyDown = (e) => {
      const currentValue = e?.target?.value;
      const key = e.key;
      if (
        maxLength &&
        !isNaN(key) &&
        currentValue &&
        currentValue?.toString()?.length >= maxLength
      ) {
        e.preventDefault();
      }
    };
    return (
      <Base className={[styles.container, customContainerStyles].join(" ")}>
        {!!label && (
          <div className={styles.inputLabelContainer}>
            <Typography className={customLabelStyles}>
              {label}&nbsp;
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
            <Select
              mode={isMultiSelect ? "multiple" : ""}
              className={[
                styles.selectInput,
                customSelectInputStyles,
                isError && errorMessage ? styles.selectBoxError : "",
              ].join(" ")}
              onChange={(changedValue) => {
                onSelectItem({
                  target: {
                    value: changedValue,
                  },
                });
              }}
              value={value}
              options={selectOptions}
              placeholder={placeholder}
              disabled={isSelectBoxDisable}
            />
          )}
          {type === "textArea" && (
            <TextArea
              rows={rows}
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
          {type !== "select" &&
            type !== "inputNumber" &&
            type !== "mobile" &&
            type !== "textArea" && (
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
              maxLength={maxLength}
              controls={controls}
              precision={precision}
              type="number"
              className={[
                styles.inputNumberStyles,
                customInputNumberStyles,
                isError && errorMessage ? errorInput : "",
              ].join(" ")}
              formatter={(value) => (value !== undefined ? `${value}` : "")}
              parser={(value) => value.replace(/[^\d]/g, "")} // Allows only digits
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              prefix={isPrefixRequired ? prefixElement : null}
              {...{
                value,
                placeholder,
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
              {errorMessage ? `${errorMessage}` : " "}
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
  controls: false,
  customContainerStyles: "",
  customErrorTextStyles: "",
  customInputNumberStyles: "",
  customInputStyles: "",
  customLabelStyles: "",
  customSelectInputStyles: "",
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
  precision: 0,
  ref: null,
  rows: 4,
  selectOptions: [],
  SuffixIcon: null,
  type: "",
  value: "",
};

CustomInput.propTypes = {
  controls: PropTypes.PropTypes.bool,
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  customInputNumberStyles: PropTypes.string,
  customInputStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  customSelectInputStyles: PropTypes.string,
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
  precision: PropTypes.number,
  ref: PropTypes.func,
  rows: PropTypes.number,
  selectOptions: PropTypes.array,
  SuffixIcon: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomInput;
