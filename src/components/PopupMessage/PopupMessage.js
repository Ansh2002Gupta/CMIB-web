import React from "react";
import { Typography } from "antd";

import styles from "./PopupMessage.module.scss";

const PopupMessage = ({ message, customStyle, onPopupClick }) => {
  return (
    <button className={customStyle} onClick={onPopupClick}>
      <Typography className={styles.message}>{message}</Typography>
    </button>
  );
};

export default PopupMessage;
