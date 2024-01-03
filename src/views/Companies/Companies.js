import React from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import CompaniesHeader from "../../containers/Companies/CompaniesHeader/CompaniesHeader";
import CompaniesList from "../../containers/Companies/CompaniesList/CompaniesList";
import styles from "./Companies.module.scss";

const Companies = () => {
  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<CompaniesHeader />}
      bottomSection={<CompaniesList />}
    />
  );
};

export default Companies;
