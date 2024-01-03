import React, { useContext } from "react";
import { useIntl } from "react-intl";

import { ThemeContext } from "core/providers/theme";
import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import CompaniesHeader from "../../containers/Companies/CompaniesHeader/CompaniesHeader";
import CompaniesList from "../../containers/Companies/CompaniesList/CompaniesList";
import styles from "./Companies.module.scss";

const Companies = () => {
  const intl = useIntl();

  const { getImage } = useContext(ThemeContext);

  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<CompaniesHeader intl={intl} getImage={getImage} />}
      bottomSection={<CompaniesList intl={intl} getImage={getImage} />}
    />
  );
};

export default Companies;
