import React from "react";
import Styles from "./SubHeader.module.scss";

export const SubHeader = () => {
  return (
    <div className={Styles.subHeaderMainContainer}>
      <div className={Styles.innerWrapper}>
        <div className={Styles.mainTitle}>
          Report Card
        </div>
        <span style={{ marginLeft: '5px', marginRight: '5px' }}>|</span>
        <div>
          <p className={Styles.textStyle}>Half Yearly (Sept - Oct)</p>
        </div>
      </div>
    </div>
  );
};
