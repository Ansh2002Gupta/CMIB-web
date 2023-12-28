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
export default CustomGrid;
