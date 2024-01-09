import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";

import { ReactComponent as ErrorIcon } from "../../themes/base/assets/images/error icon.svg";
import styles from "./ErrorMessageBox.module.scss";

const ErrorMessageBox = ({ onClick, errorText, errorHeading, btnText }) => {
  // TODO: change name in the prev branch as well
  const intl = useIntl();

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div>
          <ErrorIcon className={styles.errorIcon} />
        </div>
        <div className={styles.headingAndSubHeadingContainer}>
          <div>
            <Typography className={styles.errorHeading}>
              {errorHeading}
            </Typography>
          </div>
          <div>
            <Typography className={styles.errorSubHeading}>
              {errorText}
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <Button
          block
          onClick={() => {
            onClick && onClick();
          }}
          className={styles.btn}
        >
          {btnText || intl.formatMessage({ id: "label.tryAgain" })}
        </Button>
      </div>
    </div>
  );
};

ErrorMessageBox.defaultProps = {
  btnText: "",
  errorHeading: "",
  errorText: "",
  onClick: () => {},
};

ErrorMessageBox.propTypes = {
  btnText: PropTypes.string,
  errorHeading: PropTypes.string,
  errorText: PropTypes.string,
  onClick: PropTypes.func,
};

export default ErrorMessageBox;
