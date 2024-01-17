import React from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";
import useResponsive from "../../core/hooks/useResponsive";

import { classes } from "./HeaderContentWithFooterLayout.styles";
import styles from "./HeaderContentWithFooterLayout.module.scss";

function HeaderContentWithFooterLayout({ content, header, footer }) {
  const responsive = useResponsive();

  return (
    <TwoRow
      className={styles.container}
      topSection={header}
      topSectionStyle={classes.topSection}
      isBottomFillSpace
      bottomSection={
        <div className={styles.bottomContainer}>
          {content}
          <div className={styles.footerContainer}>
            {responsive.isSm && footer}
          </div>
        </div>
      }
      bottomSectionStyle={classes.bottomSection}
    />
  );
}

HeaderContentWithFooterLayout.defaultProps = {
  content: null,
  footer: null,
  header: null,
};

HeaderContentWithFooterLayout.propTypes = {
  content: PropTypes.node,
  footer: PropTypes.node,
  header: PropTypes.node,
};

export default HeaderContentWithFooterLayout;
