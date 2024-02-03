import React from "react";
import PropTypes from "prop-types";
import { Input, Select, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";

import { classes } from "./PhoneInput.styles";
import styles from "./PhoneInput.module.scss";

const PhoneInput = ({
  customContainerStyles,
  customErrorTextStyles,
  customInputStyles,
  customLabelStyles,
  customSelectInputStyles,
  disabled,
  errorMessage,
  isError,
  isRequired,
  isPrefixRequired,
  isSuffixRequiredForPassword,
  isSelectBoxDisable,
  label,
  messageStyles: customMessageStyles,
  messageToShow,
  mobilePrefix,
  onChange,
  onSelectItem,
  onSuffixElementClick,
  placeholder,
  prefixElement,
  selectOptions,
  SuffixIcon,
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
      <div className={[styles.formContainer, styles.mobile].join(" ")}>
        <Select
          className={[
            styles.selectInput,
            customSelectInputStyles,
            styles.selectOptionsMobileStyles,
          ].join(" ")}
          value={mobilePrefix}
          onChange={(value) => {
            onSelectItem({ target: { value } });
          }}
          disabled={isSelectBoxDisable}
          optionLabelProp="label"
        >
          {selectOptions?.map((country) => (
            <Select.Option
              key={country.dial_code}
              value={country.dial_code}
              label={
                <div>
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    style={classes.flagContainer}
                  />
                  {country.dial_code}
                </div>
              }
            >
              <div>
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  style={classes.flagContainer}
                />
                {country.dial_code}
              </div>
            </Select.Option>
          ))}
        </Select>
        <Input
          type={"number"}
          className={[
            styles.inputField,
            styles.mobileInput,
            ,
            customInputStyles,
          ].join(" ")}
          {...{
            value,
            placeholder,
            disabled,
            onChange,
          }}
          prefix={isPrefixRequired ? prefixElement : null}
          suffix={
            SuffixIcon && (
              <SuffixIcon
                onClick={() => {
                  onSuffixElementClick && onSuffixElementClick();
                }}
              />
            )
          }
        />
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
};

PhoneInput.defaultProps = {
  customContainerStyles: "",
  customErrorTextStyles: "",
  customInputStyles: "",
  customLabelStyles: "",
  customSelectInputStyles: "",
  disabled: false,
  errorMessage: "",
  isError: false,
  isPrefixRequired: false,
  isRequired: false,
  isSuffixRequiredForPassword: false,
  isSelectBoxDisable: false,
  label: "",
  messageStyles: "",
  messageToShow: "",
  mobilePrefix: "+91",
  onChange: () => {},
  onSelectItem: () => {},
  onSuffixElementClick: () => {},
  placeholder: "",
  prefixElement: null,
  selectOptions: [],
  SuffixIcon: null,
  value: "",
};

PhoneInput.propTypes = {
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  customInputStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  customSelectInputStyles: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isPrefixRequired: PropTypes.bool,
  isRequired: PropTypes.bool,
  isSuffixRequiredForPassword: PropTypes.bool,
  isSelectBoxDisable: PropTypes.bool,
  label: PropTypes.string,
  messageStyles: PropTypes.string,
  messageToShow: PropTypes.string,
  mobilePrefix: PropTypes.string,
  onChange: PropTypes.func,
  onSelectItem: PropTypes.func,
  onSuffixElementClick: PropTypes.func,
  placeholder: PropTypes.string,
  prefixElement: PropTypes.node,
  selectOptions: PropTypes.array,
  SuffixIcon: PropTypes.node,
  value: PropTypes.string,
};

export default PhoneInput;
