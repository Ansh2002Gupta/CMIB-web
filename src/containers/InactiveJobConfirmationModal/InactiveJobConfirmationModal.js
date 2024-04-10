import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";

import { ReactComponent as ErrorIcon } from "../../themes/base/assets/images/error icon.svg";
import styles from "./InactiveJobConfirmationModal.module.scss";

const InactiveJobConfirmationModalBox = ({
  heading,
  subHeadingText,
  onClickYes,
  onClickNo,
  customContainerStyles,
}) => {
  const intl = useIntl();

  return (
    <div className={[styles.container, customContainerStyles].join(" ")}>
      <div className={styles.topSection}>
        <div>
          <ErrorIcon className={styles.errorIcon} />
        </div>
        <div className={styles.headingAndSubHeadingContainer}>
          <div>
            <Typography className={styles.errorHeading}>{heading}</Typography>
          </div>
          <div>
            <Typography className={styles.errorSubHeading}>
              {subHeadingText}
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <Button
          block
          onClick={() => {
            onClickNo && onClickNo();
          }}
          className={styles.btnNo}
        >
          {intl.formatMessage({ id: "label.no" })}
        </Button>
        <Button
          block
          onClick={onClickYes}
          className={styles.btn}
        >
          {intl.formatMessage({ id: "label.yes" })}
        </Button>
      </div>
    </div>
  );
};

InactiveJobConfirmationModalBox.defaultProps = {
  btnText: "",
  heading: "",
  subHeadingText: "",
  onClickYes: ()=>{},
};

InactiveJobConfirmationModalBox.propTypes = {
  btnText: PropTypes.string,
  heading: PropTypes.string,
  subHeadingText: PropTypes.string,
  onClickYes: PropTypes.func,
  onClickNo: PropTypes.func,
};

export default InactiveJobConfirmationModalBox;
