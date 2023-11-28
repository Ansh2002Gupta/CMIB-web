import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";

import styles from "./contentHeader.module.scss";

const ContentHeader = ({ headerText, rightSection }) => {
  const Header = () => {
    return (
      <div>
        <Typography className={styles.contentHeaderText}>
          {headerText}
        </Typography>
      </div>
    );
  };

  return (
    <TwoColumn
      leftSection={<Header />}
      rightSection={rightSection}
      className={styles.twoColumnBox}
    ></TwoColumn>
  );
};

ContentHeader.defaultProps = {
  className: "",
  headerText: "",
  rightSection: <></>,
  style: {},
};

ContentHeader.propTypes = {
  className: PropTypes.string,
  headerText: PropTypes.string.isRequired,
  rightSection: PropTypes.node,
  style: PropTypes.object,
};

export default ContentHeader;
