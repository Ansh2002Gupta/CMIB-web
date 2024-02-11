import React from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";

import styles from "./CustomButton.module.scss";

const CustomButton = ({
  btnText,
  customButtonContainerStyle,
  customStyle,
  iconStyles,
  IconElement,
  isBtnDisable,
  loading,
  onClick,
  textStyle,
  type,
}) => {
  return (
    <div className={customButtonContainerStyle}>
      <Button
        icon={IconElement ? <IconElement className={iconStyles} /> : null}
        className={[styles.btn, customStyle].join(" ")}
        disabled={isBtnDisable}
        {...{ onClick, loading }}
        htmlType={type}
        block
      >
        <Typography className={[styles.buttonTextStyle, textStyle]}>
          {btnText}
        </Typography>
      </Button>
    </div>
  );
};

CustomButton.defaultProps = {
  btnText: "",
  customButtonContainerStyle: "",
  customStyle: "",
  iconStyles: "",
  IconElement: null,
  isBtnDisable: false,
  loading: false,
  onClick: () => {},
  textStyle: "",
  type: "",
};

CustomButton.propTypes = {
  btnText: PropTypes.string,
  customButtonContainerStyle: PropTypes.string,
  customStyle: PropTypes.string,
  iconStyles: PropTypes.string,
  IconElement: PropTypes.object,
  isBtnDisable: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  textStyle: PropTypes.string,
  type: PropTypes.string,
};

export default CustomButton;
