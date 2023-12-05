import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import Base from "../../core/layouts/Base/Base";

import styles from "./CustomInput.module.scss";

const CustomInput = ({
  label,
  type,
  placeholder,
  value,
  customInputStyles,
  customLabelStyles,
  customContainerStyles,
  customErrorTextStyles,
  onChange,
  errorMessage,
  isError,
  isRequired,
}) => {
  const [showPassword, setShowPassword] = useState(false);
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
        {type?.toLowerCase() === "password" && (
          <Input
            type={showPassword ? "text" : "password"}
            className={[styles.inputField, customInputStyles].join(" ")}
            {...{
              value,
              placeholder,
              onChange,
            }}
            suffix={
              <>
                {!showPassword ? (
                  <EyeOutlined
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </>
            }
          />
        )}
        {type === "text" && (
          <Input
            className={[styles.inputField, customInputStyles].join(" ")}
            {...{
              value,
              placeholder,
              onChange,
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
    </Base>
  );
};

CustomInput.defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  value: "",
  customInputStyles: {},
  customLabelStyles: {},
  customContainerStyles: {},
  customErrorTextStyles: {},
  onChange: () => {},
  errorMessage: "",
  isError: false,
  isRequired: false,
};

CustomInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  customInputStyles: PropTypes.object,
  customLabelStyles: PropTypes.object,
  customContainerStyles: PropTypes.object,
  customErrorTextStyles: PropTypes.object,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default CustomInput;
