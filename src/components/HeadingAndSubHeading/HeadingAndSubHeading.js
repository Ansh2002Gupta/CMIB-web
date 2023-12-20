import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import styles from "./HeadingAndSubHeading.module.scss";

const HeadingAndSubHeading = ({
  customContainerStyles,
  customHeadingStyles,
  customSubHeadingStyles,
  headingText,
  subHeadingText,
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
  customContainerStyles: "",
  customHeadingStyles: "",
  customSubHeadingStyles: "",
  headingText: "",
  subHeadingText: "",
};

HeadingAndSubHeading.propTypes = {
  customContainerStyles: PropTypes.string,
  customHeadingStyles: PropTypes.string,
  customSubHeadingStyles: PropTypes.string,
  headingText: PropTypes.string,
  subHeadingText: PropTypes.string,
};

export default HeadingAndSubHeading;
