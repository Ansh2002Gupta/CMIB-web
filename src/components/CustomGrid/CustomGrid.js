import React from "react";
import PropTypes from "prop-types";

import useResponsive from "core/hooks/useResponsive";

import styles from "./CustomGrid.module.scss";

const CustomGrid = ({ children, customStyle }) => {
  const responsive = useResponsive();

  return (
    <div
      className={[
        responsive.isMd ? styles.gridContainer : styles.mobileGridContainer,
        customStyle,
      ].join(" ")}
    >
      {children}
    </div>
  );
};

CustomGrid.defaultProps = {
  children: null,
  customStyle: {},
};

CustomGrid.propTypes = {
  children: PropTypes.node,
  customStyle: PropTypes.object,
};

export default CustomGrid;
