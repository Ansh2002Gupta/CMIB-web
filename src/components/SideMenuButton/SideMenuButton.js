import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import styles from "./SideMenuButton.module.scss";

const SideMenuButton = ({ btnText, onBtnClick }) => {
  return (
    <Button
      size="small"
      shape="round"
      type="text"
      className={styles.btnStyle}
      onClick={onBtnClick}
    >
      {btnText}
    </Button>
  );
};

SideMenuButton.defaultProps = {
  btnText: "",
  onBtnClick: () => {},
};

SideMenuButton.propTypes = {
  btnText: PropTypes.string,
  onBtnClick: PropTypes.func,
};

export default SideMenuButton;
