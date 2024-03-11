import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "core/layouts/Base";
import Styles from "./threeColumn.module.scss";

function ThreeColumn({
  className,
  style,
  leftSectionStyle,
  middleSectionStyle,
  rightSectionStyle,
  leftSection,
  middleSection,
  rightSection,
  isLeftFillSpace,
  isMiddleFillSpace,
  isRightFillSpace,
  onClick,
}) {
  return (
    <BaseLayout
      className={`${Styles["three-column-layout"]} ${className}`}
      style={style}
      onClick={onClick}
    >
      {({ Row, Column }) => (
        <>
          <Column
            isFillSpace={isLeftFillSpace}
            style={leftSectionStyle}
            className={`${Styles["left-section-container"]}`}
          >
            {leftSection}
          </Column>
          <Column
            isFillSpace={isMiddleFillSpace}
            style={middleSectionStyle}
            className={`${Styles["middle-section-container"]}`}
          >
            {middleSection}
          </Column>
          <Column
            isFillSpace={isRightFillSpace}
            style={rightSectionStyle}
            className={`${Styles["right-section-container"]}`}
          >
            {rightSection}
          </Column>
        </>
      )}
    </BaseLayout>
  );
}

ThreeColumn.defaultProps = {
  className: "",
  style: {},
  leftSectionStyle: {},
  middleSectionStyle: {},
  rightSectionStyle: {},
  isLeftFillSpace: false,
  isMiddleFillSpace: false,
  isRightFillSpace: false,
};

ThreeColumn.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  leftSectionStyle: PropTypes.object,
  middleSectionStyle: PropTypes.object,
  rightSectionStyle: PropTypes.object,
  leftSection: PropTypes.node.isRequired,
  middleSection: PropTypes.node.isRequired,
  rightSection: PropTypes.node.isRequired,
  isLeftFillSpace: PropTypes.bool,
  isMiddleFillSpace: PropTypes.bool,
  isRightFillSpace: PropTypes.bool,
};

export default ThreeColumn;
