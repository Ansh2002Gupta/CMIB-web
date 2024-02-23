import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import styles from "./CenterDetailsHeader.module.scss";

const CenterDetailsHeader = ({ centreId }) => {
  const intl = useIntl();
  const header = "Centre Setup for AHMEDABAD - I";

  return (
    <TwoRow
      className={styles.topSectionStyle}
      topSection={<Typography className={styles.heading}>{header}</Typography>}
      bottomSection={
        <Typography className={styles.title}>
          {intl.formatMessage({
            id: "label.centreCodeColon",
          })}
          <span className={styles.blackTitle}>{centreId}</span>
        </Typography>
      }
    />
  );
};

CenterDetailsHeader.defaultProps = {
  centreId: "",
};

CenterDetailsHeader.propTypes = {
  centreId: PropTypes.string,
};

export default CenterDetailsHeader;
