import React from "react";
import BaseLayout from "../Base";
import layoutStyle from "./FourRow.styles";
function FourRow({
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
    <BaseLayout style={{ ...layoutStyle, ...style }}>
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
