import React from "react";
import PropTypes from "prop-types";
import { Input, Select, Typography } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import Base from "../../core/layouts/Base/Base";

import styles from "./CustomInput.module.scss";

const CustomInput = ({
  currentSelectedValue,
  customContainerStyles,
  customErrorTextStyles,
  customInputStyles,
  customLabelStyles,
  customSelectInputStyles,
  disabled,
  defaultSelectValue,
  disabled,
  errorMessage,
  isError,
  isMultiSelect,
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
  SuffixIcon,
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
              onChange={(changedValue) =>
                onSelectItem({
                  target: {
                    value: changedValue,
                  },
                })
              }
              options={selectOptions}
              defaultValue={defaultSelectValue}
              {...{ disabled }}
            />
          </>
        )}
        {(type !== "select" || type === "mobile") && (
          <Input
            type={type === "mobile" ? "number" : type || "text"}
            className={[
              styles.inputField,
              type === "mobile" ? styles.mobileInput : "",
              ,
              customInputStyles,
            ].join(" ")}
            {...{
              value,
              placeholder,
              onChange,
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
  customInputStyles: "",
  customLabelStyles: "",
  customSelectInputStyles: "",
  disabled: false,
  defaultSelectValue: "",
  disabled: false,
  errorMessage: "",
  isError: false,
  isMultiSelect: false,
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
  SuffixIcon: null,
  type: "",
  value: "",
};

CustomInput.propTypes = {
  currentSelectedValue: PropTypes.string,
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  customInputStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  customSelectInputStyles: PropTypes.string,
  disabled: PropTypes.bool,
  defaultSelectValue: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
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
  SuffixIcon: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default CustomInput;
