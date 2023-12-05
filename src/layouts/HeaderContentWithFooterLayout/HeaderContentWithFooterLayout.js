import React from "react";
import PropTypes from "prop-types";

function HeaderContentWithFooterLayout({ content }) {
  return <>{content}</>;
}

HeaderContentWithFooterLayout.defaultProps = {
  content: null,
};

HeaderContentWithFooterLayout.propTypes = {
  content: PropTypes.node,
};

export default HeaderContentWithFooterLayout;
