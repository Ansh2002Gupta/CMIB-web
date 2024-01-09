import React from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ConfigureCentreContent from "../../containers/ConfigureCentre/ConfigureCentreContent/ConfigureCentreContent";
import ConfigureCentreHeader from "../../containers/ConfigureCentre/ConfigureCentreHeader";
import styles from "./ConfigureCentres.module.scss";

const ConfigureCentres = () => {
  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<ConfigureCentreHeader headingLabel="configureCentres"/>}
      bottomSection={<ConfigureCentreContent />}
    />
  );
};

export default ConfigureCentres;
