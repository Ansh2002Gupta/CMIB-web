import React from "react";

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
  children: {},
  customStyle: {},
};

CustomGrid.propTypes = {
  children: PropTypes.object,
  customStyle: PropTypes.object,
};

export default CustomGrid;
