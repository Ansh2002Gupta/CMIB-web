import React from "react";
import BaseLayout from "../Base";
import layoutStyle from "./FourRow.styles";
function FourRow({
  className,
  style,
  firstSectionStyle,
  secondSectionStyle,
  thirdSectionStyle,
  lastSectionStyle,
  firstSection,
  secondSection,
  thirdSection,
  lastSection,
}) {
  return (
    <BaseLayout style={{ ...layoutStyle, ...style }} className={className}>
      {({ Row }) => (
        <>
          <Row style={firstSectionStyle}>{firstSection}</Row>
          <Row style={secondSectionStyle}>{secondSection}</Row>
          <Row style={thirdSectionStyle}>{thirdSection}</Row>
          <Row style={lastSectionStyle}>{lastSection}</Row>
        </>
      )}
    </BaseLayout>
  );
}
FourRow.defaultProps = {
  style: {},
  firstSectionStyle: {},
  secondSectionStyle: {},
  thirdSectionStyle: {},
  lastSectionStyle: {},
};
export default FourRow;
