import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import CustomButton from "../CustomButton/CustomButton";

import styles from "./ErrorComponent.module.scss";

const ErrorComponent = () => {
  const intl = useIntl();
  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <Typography className={styles.errorText}>
          {intl.formatMessage({ id: "label.somethingWentWrong" })}
        </Typography>
      }
      bottomSection={
        <CustomButton
          btnText={intl.formatMessage({ id: "label.tryAgain" })}
          onClick={() => {
            window.location.reload();
          }}
        />
      }
    />
  );
};

export default ErrorComponent;
