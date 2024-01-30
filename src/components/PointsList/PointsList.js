import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import Base from "../../core/layouts/Base/Base";

import styles from "./PointsList.module.scss";

const PointsList = ({
  customHeadingStyles,
  pointsArray,
  pointsHeading,
  isBulletColorRed,
}) => {
  const getBulletStyles = (isValid) => {
    return [
      styles.bullet,
      isValid ? styles.active : isBulletColorRed ? styles.error : "",
    ].join(" ");
  };
  return (
    <Base className={styles.container}>
      {!!pointsHeading && (
        <div>
          <Typography className={customHeadingStyles}>
            {pointsHeading}
          </Typography>
        </div>
      )}
      <Base className={styles.box}>
        {pointsArray?.map((point, index) => {
          return (
            <div
              key={index}
              className={[
                styles.pointsContainer,
                index === pointsArray?.length - 1
                  ? styles.spanOverAllColumns
                  : "",
              ].join(" ")}
            >
              <div className={getBulletStyles(point.isValid)}></div>
              <Typography className={styles.pointText}>{point.str}</Typography>
            </div>
          );
        })}
      </Base>
    </Base>
  );
};

PointsList.defaultProps = {
  pointsArray: [],
  customHeadingStyles: "",
  pointsHeading: "",
};

PointsList.propTypes = {
  pointsArray: PropTypes.array,
  customHeadingStyles: PropTypes.string,
  pointsHeading: PropTypes.string,
};

export default PointsList;
