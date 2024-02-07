import React from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ConfigureCentreDetails from "../../containers/ConfigureCentre/ConfigureCentreDetails";
import ConfigureCentreHeader from "../../containers/ConfigureCentre/ConfigureCentreHeader";
import styles from "./ConfigureCentreView.module.scss";

const ConfigureCentreView = () => {
  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<ConfigureCentreHeader showButton={false}/>}
      bottomSection={<ConfigureCentreDetails />}
    />
  );
};

export default ConfigureCentreView;
