import React from "react";

import styles from "./MarkRequired.module.scss";

const MarkRequired = () => {
  return <span className={styles.isRequiredStar}> *</span>;
};

export default MarkRequired;
