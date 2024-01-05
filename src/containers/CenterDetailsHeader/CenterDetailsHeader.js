import React from "react";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import styles from "./CenterDetailsHeader.module.scss";

const CenterDetailsHeader = ({ centerId, intl }) => {
  return (
    <TwoRow
      className={styles.topSectionStyle}
      topSection={
        <Typography className={styles.heading}>
          {"Centre Setup for AHMEDABAD - I"}
        </Typography>
      }
      bottomSection={
        <Typography className={styles.title}>
          {intl.formatMessage({
            id: "label.centreCode",
          })}
          <span className={styles.blackTitle}>{centerId}</span>
        </Typography>
      }
    />
  );
};

CenterDetailsHeader.defaultProps = {};

CenterDetailsHeader.propTypes = {};

export default CenterDetailsHeader;
