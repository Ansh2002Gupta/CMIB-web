import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography } from "antd";
import { capitalize } from "lodash";

import { TwoRow } from "../../core/layouts";

import styles from "./CenterDetailsHeader.module.scss";

const CenterDetailsHeader = ({ centreCode, centre }) => {
  const intl = useIntl();
  const header = `Centre Setup for ${capitalize(centre)}`;

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
};

CenterDetailsHeader.propTypes = {
  centreCode: PropTypes.string,
};

export default CenterDetailsHeader;
