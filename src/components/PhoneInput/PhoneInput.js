import React from "react";
import PropTypes from "prop-types";
import { InputNumber, Select, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";

import MarkRequired from "../MarkRequired";
import { classes } from "./PhoneInput.styles";
import styles from "./PhoneInput.module.scss";

const PhoneInput = React.forwardRef(
  (
    {
      customContainerStyles,
      customErrorTextStyles,
      customInputNumberStyles,
      customLabelStyles,
      customSelectInputStyles,
      disabled,
      errorMessage,
      isError,
      isRequired,
      isSelectBoxDisable,
      label,
      messageStyles: customMessageStyles,
      messageToShow,
      mobilePrefix,
      onChange,
      onSelectItem,
      onBlur,
      placeholder,
      selectOptions,
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
        <div
          className={[styles.formContainer, styles.mobile].join(" ")}
          ref={ref}
        >
          <Select
            className={[
              styles.selectInput,
              customSelectInputStyles,
              styles.selectOptionsMobileStyles,
              "editUserDetails",
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
          <InputNumber
            type="phone"
            maxLength={10}
            controls={false}
            className={[styles.inputNumberStyles, customInputNumberStyles]}
            {...{
              value,
              placeholder,
              onChange,
              disabled,
              onBlur,
            }}
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
  }
);

PhoneInput.defaultProps = {
  customContainerStyles: "",
  customErrorTextStyles: "",
  customLabelStyles: "",
  customSelectInputStyles: "",
  disabled: false,
  errorMessage: "",
  isError: false,
  isRequired: false,
  isSelectBoxDisable: false,
  label: "",
  messageStyles: "",
  messageToShow: "",
  mobilePrefix: "+91",
  onChange: () => {},
  onSelectItem: () => {},
  placeholder: "",
  selectOptions: [],
  value: "",
};

PhoneInput.propTypes = {
  customContainerStyles: PropTypes.string,
  customErrorTextStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  customSelectInputStyles: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isRequired: PropTypes.bool,
  isSelectBoxDisable: PropTypes.bool,
  label: PropTypes.string,
  messageStyles: PropTypes.string,
  messageToShow: PropTypes.string,
  mobilePrefix: PropTypes.string,
  onChange: PropTypes.func,
  onSelectItem: PropTypes.func,
  placeholder: PropTypes.string,
  selectOptions: PropTypes.array,
  value: PropTypes.string,
};

export default PhoneInput;
