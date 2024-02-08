import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Input, Select, Typography, InputNumber } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import Base from "../../core/layouts/Base/Base";
import MarkRequired from "../MarkRequired";

import styles from "./CustomInput.module.scss";

const CustomInput = React.forwardRef(
  (
    {
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
              ref={isSuffixRequiredForPassword ? inputFieldRef : null}
              type={type || "text"}
              className={[styles.inputField, customInputStyles].join(" ")}
              {...{
                value,
                placeholder,
                disabled,
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
              type="number"
              controls={false}
              className={[styles.inputNumberStyles, customInputNumberStyles]}
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
  onBlur: () => {},
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
  onBlur: PropTypes.func,
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
