import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import { ReactComponent as ErrorIcon } from "../../themes/base/assets/images/error icon.svg";
import styles from "./ErrorMessageBox.module.scss";

const ErrorModal = ({ onClick, errorText, errorHeading, btnText }) => {
  const intl = useIntl();

  return (
    <TwoRow
      className={styles.container}
      topSection={
        <TwoRow
          className={styles.topSection}
          topSection={
            <div>
              <ErrorIcon className={styles.errorIcon} />
            </div>
          }
          bottomSection={
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
          }
        />
      }
      bottomSection={
        <Button
          block
          onClick={() => {
            onClick && onClick();
          }}
          className={styles.btn}
        >
          {btnText || intl.formatMessage({ id: "label.tryAgain" })}
        </Button>
      }
    />
  );
};

ErrorModal.defaultProps = {
  btnText: "",
  errorHeading: "",
  errorText: "",
  onClick: () => {},
};

ErrorModal.propTypes = {
  btnText: PropTypes.string,
  errorHeading: PropTypes.string,
  errorText: PropTypes.string,
  onClick: PropTypes.func,
};

export default ErrorModal;
