import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ConfigureCentreContent from "../../containers/ConfigureCentre/ConfigureCentreContent/ConfigureCentreContent";
import ConfigureCentreHeader from "../../containers/ConfigureCentre/ConfigureCentreHeader";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./ConfigureCentreView.module.scss";
import ContentHeader from "../../containers/ContentHeader";

const ConfigureCentreView = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();

  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<ConfigureCentreHeader intl={intl} headingLabel="addNewCentre" />}
      bottomSection={<></>
      }
    />
  );
};

export default ConfigureCentreView;
