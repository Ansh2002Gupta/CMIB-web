import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import styles from "./Chip.module.scss";

const Chip = ({
  bgColor,
  bgStyles,
  customContainerStyles,
  customLabelStyles,
  label,
  onClick,
  textColor,
  textStyles,
}) => {
  return (
    <div
      {...{ onClick }}
      className={[
        styles.container,
        bgStyles,
        bgColor,
        customContainerStyles,
      ].join(" ")}
    >
      <Typography
        className={[styles.text, textStyles, textColor, customLabelStyles].join(
          " "
        )}
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
  onClick: () => {},
  textColor: "",
};

Chip.propTypes = {
  bgColor: PropTypes.string,
  customContainerStyles: PropTypes.string,
  customLabelStyles: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  textColor: PropTypes.string,
};

export default Chip;
