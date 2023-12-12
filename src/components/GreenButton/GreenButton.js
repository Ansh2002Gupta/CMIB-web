import React from "react";
import PropTypes from "prop-types";
import { Button, Image } from "antd";

import styles from "./GreenButton.module.scss";

const GreenButton = ({
  btnText,
  customStyle,
  iconStyles,
  iconUrl,
  isBtnDisable,
  onClick,
}) => {
  return (
    <div>
      <Button
        icon={
          iconUrl ? (
            <>
              <Image src={iconUrl} preview={false} className={iconStyles} />
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

GreenButton.defaultProps = {
  btnText: "",
  customStyle: "",
  iconStyles: "",
  iconUrl: "",
  isBtnDisable: false,
  onClick: () => {},
};

GreenButton.propTypes = {
  btnText: PropTypes.string,
  customStyle: PropTypes.string,
  iconStyles: PropTypes.string,
  iconUrl: PropTypes.string,
  isBtnDisable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default GreenButton;
