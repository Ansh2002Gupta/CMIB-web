import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { capitalize } from "lodash";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import styles from "./CenterDetailsHeader.module.scss";

const CenterDetailsHeader = ({ centreCode, centreName }) => {
  const intl = useIntl();
  const header = `Centre Setup for ${capitalize(centreName)}`;

  return (
    <TwoRow
      className={styles.topSectionStyle}
      topSection={<Typography className={styles.heading}>{header}</Typography>}
      bottomSection={
        <Typography className={styles.title}>
          {intl.formatMessage({
            id: "label.centreCodeColon",
          })}
          <span className={styles.blackTitle}>{centreCode}</span>
        </Typography>
      }
    />
  );
};

CenterDetailsHeader.defaultProps = {
  centreCode: "",
  centreName: "",
};

CenterDetailsHeader.propTypes = {
  centreCode: PropTypes.string,
  centreName: PropTypes.string,
};

export default CenterDetailsHeader;
