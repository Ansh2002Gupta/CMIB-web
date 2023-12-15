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
  onClick,
}) => {
  return (
    <div>
      <Button
        icon={
          IconElement ? (
            <>
              <IconElement className={iconStyles} />
            </>
          ) : null
        }
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

CustomButton.defaultProps = {
  btnText: "",
  customStyle: "",
  iconStyles: "",
  IconElement: null,
  isBtnDisable: false,
  onClick: () => {},
};

CustomButton.propTypes = {
  btnText: PropTypes.string,
  customStyle: PropTypes.string,
  iconStyles: PropTypes.string,
  IconElement: PropTypes.node,
  isBtnDisable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CustomButton;
