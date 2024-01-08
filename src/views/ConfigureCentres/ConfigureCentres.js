import React, { useContext } from "react";
import { ThemeContext } from "core/providers/theme";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ConfigureCentreContent from "../../containers/ConfigureCentre/ConfigureCentreContent/ConfigureCentreContent";
import ConfigureCentreHeader from "../../containers/ConfigureCentre/ConfigureCentreHeader";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./ConfigureCentres.module.scss";

const ConfigureCentres = () => {
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);

  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<ConfigureCentreHeader getImage={getImage} navigate={navigate} headingLabel="configureCentres"/>}
      bottomSection={<ConfigureCentreContent getImage={getImage} navigate={navigate} />}
    />
  );
};

export default ConfigureCentres;
