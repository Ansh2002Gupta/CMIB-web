import React from "react";
import PropTypes from "prop-types";
import { Radio } from "antd";

import styles from "./CustomRadioButton.module.scss";
import "./override.css";

const CustomRadioButton = ({
  checked,
  children,
  customStyles,
  disabled,
  onChange,
  value,
}) => {
  return (
    <Radio
      {...{ checked, disabled, onChange, value }}
      className={[
        disabled ? styles.disableButton : styles.button,
        customStyles,
      ].join(" ")}
    />
  );
};

CustomRadioButton.defaultProps = {
  checked: false,
  customStyles: "",
  disabled: false,
  onChange: () => {},
  value: null,
};

CustomRadioButton.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any, // The value to be used in the radio button input. This prop is not used if the component is used as a standalone without Radio.Group
};

export default CustomRadioButton;
