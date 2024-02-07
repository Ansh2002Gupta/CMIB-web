import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";

import styles from "./contentHeader.module.scss";

const ContentHeader = ({ headerText, rightSection, customStyles }) => {
  const Header = () => {
    return (
      <div>
        <Typography
          className={[styles.contentHeaderText, customStyles].join(" ")}
        >
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
  customStyles: "",
  headerText: "",
  rightSection: <></>,
  style: {},
};

ContentHeader.propTypes = {
  className: PropTypes.string,
  customStyles: PropTypes.string,
  headerText: PropTypes.string.isRequired,
  rightSection: PropTypes.node,
  style: PropTypes.object,
};

export default ContentHeader;
