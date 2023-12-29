import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import styles from "./SetupCenter.module.scss";

const SetupCenter = () => {
  const intl = useIntl();

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.headerContainer}
          topSection={
            <Typography className={styles.headingText}>
              {intl.formatMessage({ id: "setupCentres.heading" })}
            </Typography>
          }
          bottomSection={
            <Typography className={styles.descriptionText}>
              {intl.formatMessage({ id: "setupCentres.warning" })}
            </Typography>
          }
        />
      }
    />
  );
};

export default SetupCenter;
