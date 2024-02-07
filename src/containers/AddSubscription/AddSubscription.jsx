import React from "react";
import { Button } from "antd";

import styles from "./addSubscription.module.scss";

const AddSubscription = () => {
  return (
    <Button className={styles.addSubscriptionBtn}>Add Subscription</Button>
  );
};

export default AddSubscription;
