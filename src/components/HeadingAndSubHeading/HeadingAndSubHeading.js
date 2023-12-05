import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import styles from "./HeadingAndSubHeading.module.scss";

const HeadingAndSubHeading = ({
  headingText,
  subHeadingText,
  customContainerStyles,
  customHeadingStyles,
  customSubHeadingStyles,
}) => {
  return (
    <div className={[styles.headingContainer, customContainerStyles].join(" ")}>
      <div>
        <Typography
          className={[styles.loginHeading, customHeadingStyles].join(" ")}
        >
          {headingText}
        </Typography>
      </div>
      <div>
        <Typography
          className={[styles.loginSubHeading, customSubHeadingStyles].join(" ")}
        >
          {subHeadingText}
        </Typography>
      </div>
    </div>
  );
};

HeadingAndSubHeading.defaultProps = {
  headingText: "",
  subHeadingText: "",
  customContainerStyles: {},
  customHeadingStyles: {},
  customSubHeadingStyles: {},
};

HeadingAndSubHeading.propTypes = {
  headingText: PropTypes.string,
  subHeadingText: PropTypes.string,
  customContainerStyles: PropTypes.object,
  customHeadingStyles: PropTypes.object,
  customSubHeadingStyles: PropTypes.object,
};

export default HeadingAndSubHeading;
