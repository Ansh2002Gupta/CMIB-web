import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import styles from "./Chip.module.scss";

const Chip = ({
  bgStyles,
  customContainerStyles,
  customLabelStyles,
  label,
  onClick,
  textStyles,
  color,
}) => {
  const getCurrentTheme = () => {
    if (color === "orange") {
      return ["statusContainer_failed", "statusText_failed"];
    }
    if (color === "green") {
      return ["statusContainer_success", "statusText_success"];
    }
    if (color === "blue") {
      return ["statusContainer_progress", "statusText_progress"];
    }
  };

  return (
    <div
      {...{ onClick }}
      className={[
        styles.container,
        color ? styles[getCurrentTheme()[0]] : "",
        bgStyles,
        customContainerStyles,
      ].join(" ")}
    >
      <Typography
        className={[
          styles.text,
          color ? styles[getCurrentTheme()[1]] : "",
          textStyles,
          customLabelStyles,
        ].join(" ")}
      >
        {label}
      </Typography>
    </div>
  );
};

Chip.defaultProps = {
  bgStyles: "",
  customContainerStyles: "",
  customLabelStyles: "",
  label: "",
  onClick: () => {},
  textStyles: "",
};

Chip.propTypes = {
  bgStyles: PropTypes.string,
  customContainerStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  textStyles: PropTypes.string,
};

export default Chip;
