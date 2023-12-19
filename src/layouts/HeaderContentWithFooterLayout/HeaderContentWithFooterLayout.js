import React from "react";
import PropTypes from "prop-types";

import { ThreeRow } from "core/layouts";

import useResponsive from "../../core/hooks/useResponsive";
import { classes } from "./HeaderContentWithFooterLayout.styles";

function HeaderContentWithFooterLayout({ content, header, footer }) {
  const responsive = useResponsive();

  return (
    <ThreeRow
      topSection={header}
      middleSection={content}
      bottomSection={responsive.isSm ? footer : null}
      topSectionStyle={classes.topSection}
      middleSectionStyle={classes.middleSection}
      bottomSectionStyle={classes.bottomSection}
    />
  );
}

HeaderContentWithFooterLayout.defaultProps = {
  content: null,
};

HeaderContentWithFooterLayout.propTypes = {
  content: PropTypes.node,
};

export default HeaderContentWithFooterLayout;
