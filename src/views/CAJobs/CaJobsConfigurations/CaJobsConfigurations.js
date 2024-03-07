import React from "react";

import { TwoRow } from "../../../core/layouts";

import ContentHeader from "../../../containers/ContentHeader";
import styles from "./CaJobsConfigurations.module.scss";

const Configrations = () => {
  return (
    <TwoRow
      topSection={
        <div className={styles.container}>
          <ContentHeader headerText="Global Configurations" />
        </div>
      }
      bottomSection={<></>}
    />
  );
};

export default Configrations;
