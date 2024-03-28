import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "core/layouts/Base";
import Styles from "./threeRow.module.scss";

function ThreeRow({
  bottomSection,
  bottomSectionStyle,
  bottomSectionClassName,
  className,
  isBottomFillSpace,
  isMiddleFillSpace,
  isTopFillSpace,
  middleSection,
  middleSectionClassName,
  middleSectionStyle,
  style,
  topSection,
  topSectionClassName,
  topSectionStyle,
  onClick,
}) {
  return (
    <BaseLayout
      className={`${Styles["three-row-layout"]} ${className}`}
      style={style}
      onClick={onClick}
    >
      {({ Row }) => (
        <>
          <Row
            isFillSpace={isTopFillSpace}
            style={topSectionStyle}
            className={`${topSectionClassName} ${Styles["top-section-container"]}`}
          >
            {topSection}
          </Row>
          <Row
            isFillSpace={isMiddleFillSpace}
            style={middleSectionStyle}
            className={`${middleSectionClassName} ${Styles["middle-section-container"]}`}
          >
            {middleSection}
          </Row>
          <Row
            isFillSpace={isBottomFillSpace}
            style={bottomSectionStyle}
            className={`${bottomSectionClassName} ${Styles["bottom-section-container"]}`}
          >
            {bottomSection}
          </Row>
        </>
      )}
    </BaseLayout>
  );
}

ThreeRow.defaultProps = {
  bottomSectionClassName: "",
  bottomSectionStyle: {},
  className: "",
  isBottomFillSpace: false,
  isMiddleFillSpace: false,
  isTopFillSpace: false,
  middleSectionStyle: {},
  middleSectionClassName: "",
  style: {},
  topSectionClassName: "",
  topSectionStyle: {},
  onClick: () => {},
};

ThreeRow.propTypes = {
  bottomSectionStyle: PropTypes.object,
  bottomSectionClassName: PropTypes.string,
  className: PropTypes.string,
  isBottomFillSpace: PropTypes.bool,
  isMiddleFillSpace: PropTypes.bool,
  isTopFillSpace: PropTypes.bool,
  middleSectionStyle: PropTypes.object,
  middleSectionClassName: PropTypes.string,
  style: PropTypes.object,
  topSectionClassName: PropTypes.string,
  topSectionStyle: PropTypes.object,
  onClick: PropTypes.func,
};

export default ThreeRow;
