import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ConfigureCentreContent from "../../containers/ConfigureCentre/ConfigureCentreContent/ConfigureCentreContent";
import ConfigureCentreHeader from "../../containers/ConfigureCentre/ConfigureCentreHeader";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./ConfigureCentres.module.scss";

const ConfigureCentres = () => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);

  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<ConfigureCentreHeader intl={intl} getImage={getImage} navigate={navigate} headingLabel="configureCentres"/>}
      bottomSection={<ConfigureCentreContent intl={intl} getImage={getImage} navigate={navigate} />}
    />
  );
};

export default ConfigureCentres;
