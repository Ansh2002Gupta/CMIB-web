import React from "react";
import PropTypes from "prop-types";
import { Radio, Typography } from "antd";

import styles from "./CustomRadioButton.module.scss";
import "./override.css";

const CustomRadioButton = ({
  checked,
  children,
  customStyles,
  disabled,
  label,
  onChange,
  value,
}) => {
  return (
    <div className={styles.container}>
      <Radio
        {...{ checked, disabled, onChange, value }}
        className={[
          disabled ? styles.disableButton : styles.button,
          customStyles,
        ].join(" ")}
      />
      {!!label && (
        <Typography className={[styles.label, customStyles].join(" ")}>
          {label}
        </Typography>
      )}
    </div>
  );
};

CustomRadioButton.defaultProps = {
  checked: false,
  customStyles: "",
  disabled: false,
  label: "",
  onChange: () => {},
  value: null,
};

CustomRadioButton.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any, // The value to be used in the radio button input. This prop is not used if the component is used as a standalone without Radio.Group
};

export default CustomRadioButton;
