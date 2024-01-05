import React from "react";
import { useIntl } from "react-intl";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ConfigureCentreDetails from "../../containers/ConfigureCentre/ConfigureCentreDetails";
import ConfigureCentreHeader from "../../containers/ConfigureCentre/ConfigureCentreHeader";
import styles from "./ConfigureCentreView.module.scss";

const ConfigureCentreView = () => {
  const intl = useIntl();

  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={
        <ConfigureCentreHeader intl={intl} headingLabel="addNewCentre" />
      }
      bottomSection={<ConfigureCentreDetails intl={intl} />}
    />
  );
};

export default ConfigureCentreView;
