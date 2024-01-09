import React from "react";
import PropTypes from "prop-types";

import styles from "./StatusChip.module.scss";
import { Typography } from "antd";

const StatusChip = ({
  customContainerStyles,
  customTextStyles,
  isPending,
  isProgress,
  isSuccess,
  statusText,
}) => {
  const getStatusContainerStyles = () => {
    if (isPending) {
      return "pending_bg";
    }
    if (isProgress) {
      return "progress_bg";
    }
    return "success_bg";
  };

  const getStatusTextStyles = () => {
    if (isPending) {
      return "pending_color";
    }
    if (isProgress) {
      return "progress_color";
    }
    return "success_color";
  };

  return (
    <div
      className={[
        styles.container,
        styles[getStatusContainerStyles()],
        customContainerStyles,
      ].join(" ")}
    >
      <Typography
        className={[
          styles.text,
          styles[getStatusTextStyles()],
          customTextStyles,
        ]}
      >
        {statusText}
      </Typography>
    </div>
  );
};

StatusChip.defaultProps = {
  customContainerStyles: "",
  customTextStyles: "",
  isPending: false,
  isProgress: false,
  isSuccess: false,
  statusText: "",
};

StatusChip.propTypes = {
  customContainerStyles: PropTypes.string,
  customTextStyles: PropTypes.string,
  isPending: PropTypes.bool,
  isProgress: PropTypes.bool,
  isSuccess: PropTypes.bool,
  statusText: PropTypes.string,
};

export default StatusChip;
