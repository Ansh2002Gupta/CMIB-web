import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";

import styles from "./contentHeader.module.scss";

const ContentHeader = ({
  headerText,
  rightSection,
  customStyles,
  customContainerStyle,
}) => {
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
      className={[styles.twoColumnBox, customContainerStyle].join(" ")}
    ></TwoColumn>
  );
};

ContentHeader.defaultProps = {
  className: "",
  customStyles: "",
  customContainerStyle: "",
  headerText: "",
  rightSection: <></>,
  style: {},
};

ContentHeader.propTypes = {
  className: PropTypes.string,
  customStyles: PropTypes.string,
  customContainerStyle: PropTypes.string,
  headerText: PropTypes.string.isRequired,
  rightSection: PropTypes.node,
  style: PropTypes.object,
};

export default ContentHeader;
