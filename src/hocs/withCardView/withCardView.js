import React from "react";

import Base from "../../core/layouts/Base/Base";
import useResponsive from "../../core/hooks/useResponsive";
import styles from "./withCardView.module.scss";

const withCardView = (BaseComponent) => {
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

export default withCardView;
