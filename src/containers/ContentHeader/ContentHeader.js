import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";

import styles from "./contentHeader.module.scss";

const ContentHeader = ({
  customContainerStyle,
  customStyles,
  headerComponent,
  headerText,
  rightSection,
  isLeftFillSpace,
}) => {
  const Header = () => {
    return (
      <div className={headerComponent ? styles.container : ""}>
        <Typography
          className={[styles.contentHeaderText, customStyles].join(" ")}
        >
          {headerText}
        </Typography>
        {headerComponent}
      </div>
    );
  };

  return (
    <TwoColumn
      {...{ isLeftFillSpace }}
      leftSection={<Header />}
      leftSectionStyle={{ flex: 1 }}
      rightSection={rightSection}
      className={[styles.twoColumnBox, customContainerStyle].join(" ")}
    ></TwoColumn>
  );
};

ContentHeader.defaultProps = {
  className: "",
  customStyles: "",
  customContainerStyle: "",
  headerComponent: null,
  headerText: "",
  rightSection: <></>,
  style: {},
};

ContentHeader.propTypes = {
  className: PropTypes.string,
  customStyles: PropTypes.string,
  customContainerStyle: PropTypes.string,
  headerComponent: PropTypes.node,
  headerText: PropTypes.string.isRequired,
  rightSection: PropTypes.node,
  style: PropTypes.object,
};

export default ContentHeader;
