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
  tooltipText,
  type,
  withWhiteBackground,
}) => {
  return (
    <div className={customButtonContainerStyle}>
      <Button
        title={tooltipText}
        icon={IconElement ? <IconElement className={iconStyles} /> : null}
        className={[
          styles.btn,
          withWhiteBackground ? styles.whiteBgBtn : "",
          customStyle,
        ].join(" ")}
        disabled={isBtnDisable}
        {...{ onClick, loading }}
        htmlType={type}
        block
      >
        {textStyle ? (
          <Typography className={textStyle}>{btnText}</Typography>
        ) : (
          btnText
        )}
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
  tooltipText: "",
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
  tooltipText: PropTypes.string,
  type: PropTypes.string,
  withWhiteBackground: PropTypes.bool,
};

export default CustomButton;
