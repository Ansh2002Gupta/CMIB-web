import React from "react";

import { TwoRow } from "../../../core/layouts";
import CaJobsConfig from "../../../containers/CaJobsConfig";
import ContentHeader from "../../../containers/ContentHeader";
import styles from "./CaJobsConfigurations.module.scss";

const CaJobsConfigurations = () => {
  //created these functions for future purpose.
  const handleCancel = () => {};
  const handleSave = () => {};

  return (
    <TwoRow
      topSection={
        <div className={styles.headerContainer}>
          <ContentHeader headerText="Global Configurations" />
        </div>
      }
      bottomSection={
        <CaJobsConfig onCancel={handleCancel} onSave={handleSave} />
      }
    />
  );
};

export default CaJobsConfigurations;
