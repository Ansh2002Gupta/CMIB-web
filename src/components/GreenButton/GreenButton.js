import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import styles from "./GreenButton.module.scss";

const GreenButton = ({
  btnText,
  customStyle,
  isBtnDisable,
  loading,
  onClick,
}) => {
  return (
    <div>
      <Button
        className={[styles.btn, customStyle].join(" ")}
        disabled={isBtnDisable}
        {...{ onClick, loading }}
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
  loading: false,
  onClick: () => {},
};

GreenButton.propTypes = {
  btnText: PropTypes.string,
  customStyle: PropTypes.string,
  isBtnDisable: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default GreenButton;
