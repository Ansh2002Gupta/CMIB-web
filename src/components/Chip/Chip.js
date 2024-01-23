import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import styles from "./Chip.module.scss";

const Chip = ({
  bgColor,
  customContainerStyles,
  customLabelStyles,
  label,
  textColor,
}) => {
  return (
    <div
      className={[styles.container, bgColor, customContainerStyles].join(" ")}
    >
      <Typography
        className={[styles.text, textColor, customLabelStyles].join(" ")}
      >
        {label}
      </Typography>
    </div>
  );
};

Chip.defaultProps = {
  bgColor: "",
  customContainerStyles: "",
  customLabelStyles: "",
  label: "",
  textColor: "",
};

Chip.propTypes = {
  bgColor: PropTypes.string,
  customContainerStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  label: PropTypes.string,
  textColor: PropTypes.string,
};

export default Chip;
