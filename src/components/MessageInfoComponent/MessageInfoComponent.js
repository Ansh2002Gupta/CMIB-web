import React from "react";
import PropTypes from "prop-types";

import { Typography } from "antd";
import styles from "./MessageInfoComponent.module.scss";

const MessageInfoComponent = ({ message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Typography className={styles.textSize}>{message}</Typography>
      </div>
    </div>
  );
};

MessageInfoComponent.defaultProps = {
  assigneName: "",
  message: "",
};

MessageInfoComponent.propTypes = {
  assigneName: PropTypes.string,
  message: PropTypes.string,
};

export default MessageInfoComponent;
