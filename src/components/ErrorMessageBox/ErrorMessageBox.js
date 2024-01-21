import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";

import { ReactComponent as ErrorIcon } from "../../themes/base/assets/images/error icon.svg";
import styles from "./ErrorMessageBox.module.scss";

const ErrorMessageBox = ({ onRetry, errorText, errorHeading, btnText }) => {
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
          {!!errorText && (
            <div>
              <Typography className={styles.errorSubHeading}>
                {errorText}
              </Typography>
            </div>
          )}
        </div>
      </div>
      {!!onRetry && (
        <div>
          <Button
            block
            onClick={() => {
              onRetry && onRetry();
            }}
            className={styles.btn}
          >
            {btnText || intl.formatMessage({ id: "label.tryAgain" })}
          </Button>
        </div>
      )}
    </div>
  );
};

ErrorMessageBox.defaultProps = {
  btnText: "",
  errorHeading: "",
  errorText: "",
  onRetry: null,
};

ErrorMessageBox.propTypes = {
  btnText: PropTypes.string,
  errorHeading: PropTypes.string,
  errorText: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorMessageBox;
