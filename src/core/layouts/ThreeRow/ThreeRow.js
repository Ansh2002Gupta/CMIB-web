import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "core/layouts/Base";
import Styles from "./threeRow.module.scss";

function ThreeRow({
  className,
  style,
  topSectionStyle,
  middleSectionStyle,
  bottomSectionStyle,
  topSection,
  middleSection,
  bottomSection,
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
            style={topSectionStyle}
            className={Styles["top-section-container"]}
          >
            {topSection}
          </Row>
          <Row
            style={middleSectionStyle}
            className={Styles["middle-section-container"]}
          >
            {middleSection}
          </Row>
          <Row
            style={bottomSectionStyle}
            className={Styles["bottom-section-container"]}
          >
            {bottomSection}
          </Row>
        </>
      )}
    </BaseLayout>
  );
}

ThreeRow.defaultProps = {
  className: "",
  style: {},
  topSectionStyle: {},
  middleSectionStyle: {},
  bottomSectionStyle: {},
  onClick: () => {},
};

ThreeRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  topSectionStyle: PropTypes.object,
  middleSectionStyle: PropTypes.object,
  bottomSectionStyle: PropTypes.object,
  onClick: PropTypes.func,
};

export default ThreeRow;
