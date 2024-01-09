import React from "react";
import { Descriptions } from "antd";
import { getLayout } from "./QueryDetailsConfig";
import styles from "./QueryDetailsContent.module.scss";

const QueryDetailsContent = ({ type, data }) => {
  console.log({ type, data });
  const items = getLayout(type, data);

  return (
    <div className={styles.container}>
      <Descriptions
        className={styles.description}
        layout="vertical"
        items={items}
      />
    </div>
  );
};

export default QueryDetailsContent;
