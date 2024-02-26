import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "core/layouts/Base";

import Styles from "./twoColumn.module.scss";

function TwoColumn({
  className,
  style,
  leftSectionStyle,
  rightSectionStyle,
  leftSection,
  rightSection,
  isLeftFillSpace,
  isRightFillSpace,
  onClick,
  leftSectionClassName,
  rightSectionClassName,
}) {
  return (
    <BaseLayout
      className={`${Styles["two-column-layout"]} ${className}`}
      style={style}
      onClick={onClick}
    >
      {({ Row, Column }) => (
        <>
          <Column
            isFillSpace={isLeftFillSpace}
            style={leftSectionStyle}
            className={`${leftSectionClassName} ${Styles["left-section-container"]}`}
          >
            {leftSection}
          </Column>
          <Column
            isFillSpace={isRightFillSpace}
            style={rightSectionStyle}
            className={`${rightSectionClassName} ${Styles["right-section-container"]}`}
          >
            {rightSection}
          </Column>
        </>
      )}
    </BaseLayout>
  );
}

TwoColumn.defaultProps = {
  className: "",
  style: {},
  leftSectionStyle: {},
  rightSectionStyle: {},
  isLeftFillSpace: false,
  isRightFillSpace: false,
};

TwoColumn.propTypes = {
  className: PropTypes.string,
  isLeftFillSpace: PropTypes.bool,
  isRightFillSpace: PropTypes.bool,
  style: PropTypes.object,
  leftSectionStyle: PropTypes.object,
  leftSection: PropTypes.node.isRequired,
  leftSectionClassName: PropTypes.string,
  rightSection: PropTypes.node.isRequired,
  rightSectionClassName: PropTypes.string,
  rightSectionStyle: PropTypes.object,
};

export default TwoColumn;
