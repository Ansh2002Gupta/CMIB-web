import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";

import styles from "./contentHeader.module.scss";

const ContentHeader = ({
  containedInBorder,
  customStyles,
  headerText,
  isLeftFillSpace,
  rightSection,
}) => {
  const Header = () => {
    return (
      <div>
        <Typography
          className={[
            styles.contentHeaderText,
            containedInBorder ? styles.borders : "",
            customStyles,
          ].join(" ")}
        >
          {headerText}
        </Typography>
      </div>
    );
  };

  return (
    <TwoColumn
      {...{ isLeftFillSpace }}
      leftSection={<Header />}
      rightSection={rightSection}
      className={styles.twoColumnBox}
    ></TwoColumn>
  );
};

ContentHeader.defaultProps = {
  className: "",
  containedInBorder: false,
  customStyles: "",
  headerText: "",
  rightSection: <></>,
  style: {},
};

ContentHeader.propTypes = {
  className: PropTypes.string,
  containedInBorder: PropTypes.bool,
  customStyles: PropTypes.string,
  headerText: PropTypes.string.isRequired,
  rightSection: PropTypes.node,
  style: PropTypes.object,
};

export default ContentHeader;
