import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import styles from "./HeaderAndTitle.module.scss";

const HeaderAndTitle = ({
  headingLabel,
  headingStyle,
  titleLabel,
  titleStyle,
}) => {
  return (
    <TwoRow
      className={styles.headerContainer}
      topSection={
        <Typography className={[styles.headingText, headingStyle].join(" ")}>
          {headingLabel}
        </Typography>
      }
      bottomSection={
        <Typography className={[styles.titleText, titleStyle].join(" ")}>
          {titleLabel}
        </Typography>
      }
    />
  );
};

HeaderAndTitle.defaultProps = {
  headingLabel: "",
  headingStyle: "",
  titleLabel: "",
  titleStyle: "",
};

HeaderAndTitle.propTypes = {
  headingLabel: PropTypes.string,
  headingStyle: PropTypes.string,
  titleLabel: PropTypes.string,
  titleStyle: PropTypes.string,
};

export default HeaderAndTitle;
