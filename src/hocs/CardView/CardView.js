import React from "react";
import { Image, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";
import useResponsive from "../../core/hooks/useResponsive";

import styles from "./CardView.module.scss";

const CardView = (BaseComponent) => {
  const NewModifiedComponent = () => {
    const responsive = useResponsive();

    return (
      <Base className={styles.container}>
        {responsive.isSm ? (
          <div className={styles.innerContainer}>
            <BaseComponent />
          </div>
        ) : (
          <BaseComponent />
        )}
      </Base>
    );
  };
  return NewModifiedComponent;
};

export default CardView;
