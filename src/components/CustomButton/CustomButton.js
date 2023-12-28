import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import styles from "./CustomButton.module.scss";

const CustomButton = ({
  btnText,
  customStyle,
  iconStyles,
  IconElement,
  isBtnDisable,
  loading,
  onClick,
  type,
}) => {
  return (
    <div>
      <Button
        icon={IconElement ? <IconElement className={iconStyles} /> : null}
        className={[styles.btn, customStyle].join(" ")}
        disabled={isBtnDisable}
        {...{ onClick, loading }}
        htmlType={type}
        block
      >
        {btnText}
      </Button>
    </div>
  );
};

CustomButton.defaultProps = {
  btnText: "",
  customStyle: "",
  iconStyles: "",
  IconElement: null,
  isBtnDisable: false,
  loading: false,
  onClick: () => {},
  type: "",
};

CustomButton.propTypes = {
  btnText: PropTypes.string,
  customStyle: PropTypes.string,
  iconStyles: PropTypes.string,
  IconElement: PropTypes.node,
  isBtnDisable: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default CustomButton;
