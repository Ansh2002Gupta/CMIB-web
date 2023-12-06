import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import styles from "./GreenButton.module.scss";

const GreenButton = ({ btnText, customStyle, isBtnDisable, onClick }) => {
  return (
    <div>
      <Button
        className={[styles.btn, customStyle].join(" ")}
        disabled={isBtnDisable}
        {...{ onClick }}
        block
      >
        {btnText}
      </Button>
    </div>
  );
};

GreenButton.defaultProps = {
  btnText: "",
  customStyle: "",
  isBtnDisable: false,
  onClick: () => {},
};

GreenButton.propTypes = {
  btnText: PropTypes.string,
  customStyle: PropTypes.string,
  isBtnDisable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default GreenButton;
