import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";
import { ReactComponent as ErrorIcon } from "../../themes/base/assets/images/error icon.svg";
import styles from "./ErrorMessageBox.module.scss";

const ErrorMessageBox = ({
  onRetry,
  errorText,
  errorHeading,
  retryBtnText,
}) => {
  const intl = useIntl();

  return (
    <TwoRow
      className={styles.container}
      topSection={
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
      }
      bottomSection={
        <>
          {onRetry ? (
            <div>
              <Button block onClick={onRetry} className={styles.btn}>
                {retryBtnText || intl.formatMessage({ id: "label.tryAgain" })}
              </Button>
            </div>
          ) : null}
        </>
      }
    />
  );
};

ErrorMessageBox.defaultProps = {
  retryBtnText: "",
  errorHeading: "",
  errorText: "",
  onRetry: null,
};

ErrorMessageBox.propTypes = {
  retryBtnText: PropTypes.string,
  errorHeading: PropTypes.string,
  errorText: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorMessageBox;
