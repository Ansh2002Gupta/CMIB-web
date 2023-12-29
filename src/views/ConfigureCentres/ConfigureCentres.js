import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ConfigureCentreContent from "../../containers/ConfigureCentre/ConfigureCentreContent/ConfigureCentreContent";
import ConfigureCentreHeader from "../../containers/ConfigureCentre/ConfigureCentreHeader";

import styles from "./ConfigureCentres.module.scss";

const ConfigureCentres = () => {
  const intl = useIntl();

  const { getImage } = useContext(ThemeContext);

  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<ConfigureCentreHeader intl={intl} getImage={getImage} />}
      bottomSection={<ConfigureCentreContent intl={intl} getImage={getImage} />}
    />
  );
};

export default ConfigureCentres;
