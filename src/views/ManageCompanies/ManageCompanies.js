import React, { useEffect } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";
import ContentHeader from "../../containers/ContentHeader";
import ManageCompaniesTable from "../../containers/ManageCompaniesTable";
import styles from "./ManageCompanies.module.scss";

const ManageCompanies = () => {
  const intl = useIntl();

  return (
    <>
      <TwoRow
        topSection={
          <ContentHeader
            customContainerStyle={styles.customContainerStyle}
            headerText={intl.formatMessage({ id: "label.manageCompanies" })}
          />
        }
        bottomSection={<ManageCompaniesTable />}
        bottomSectionClassName={styles.bottomSectionStyles}
      />
    </>
  );
};

export default ManageCompanies;
