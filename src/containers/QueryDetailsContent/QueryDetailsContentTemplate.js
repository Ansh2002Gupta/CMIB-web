import React from "react";
import { Descriptions } from "antd";

import styles from "./QueryDetailsContent.module.scss";

const QueryDetailsContentTemplate = ({ type, data, getLayout }) => {
  const items = getLayout(type, data);

  return (
    <div className={styles.container}>
      <Descriptions
        colon={false}
        className={styles.description}
        layout="vertical"
        items={items}
      />
    </div>
  );
};

export default QueryDetailsContentTemplate;
