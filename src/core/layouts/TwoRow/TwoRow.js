import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "core/layouts/Base";
import Styles from "./twoRow.module.scss";

function TwoRow({
  bottomSection,
  bottomSectionStyle,
  bottomSectionClassName,
  className,
  isBottomFillSpace,
  isTopFillSpace,
  style,
  topSection,
  topSectionClassName,
  topSectionStyle,
}) {
  return (
    <BaseLayout
      className={`${Styles["two-row-layout"]} ${className}`}
      style={style}
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

TwoRow.defaultProps = {
  bottomSectionStyle: {},
  bottomSectionClassName: "",
  className: "",
  isBottomFillSpace: false,
  isTopFillSpace: false,
  style: {},
  topSectionClassName: "",
  topSectionStyle: {},
};

TwoRow.propTypes = {
  bottomSection: PropTypes.node.isRequired,
  bottomSectionClassName: PropTypes.string,
  bottomSectionStyle: PropTypes.object,
  className: PropTypes.string,
  isBottomFillSpace: PropTypes.bool,
  isTopFillSpace: PropTypes.bool,
  style: PropTypes.object,
  topSection: PropTypes.node.isRequired,
  topSectionClassName: PropTypes.string,
  topSectionStyle: PropTypes.object,
};

export default TwoRow;
