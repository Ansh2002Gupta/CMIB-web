import React, { useContext } from "react";
import { useIntl } from "react-intl";

import { ThemeContext } from "core/providers/theme";

import ContentHeader from "../../ContentHeader";
import CustomButton from "../../../components/CustomButton";
import styles from "./CompaniesHeader.module.scss";

const CompaniesHeader = () => {
  const intl = useIntl();

  const { getImage } = useContext(ThemeContext);

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={intl.formatMessage({ id: "label.companies" })}
        customStyles={styles.headerResponsiveStyle}
        rightSection={
          <CustomButton
            btnText={intl.formatMessage({ id: "label.addCompany" })}
            iconUrl={getImage("plusIcon")}
            iconStyles={styles.btnIconStyles}
            customStyle={styles.btnCustomStyles}
          />
        }
      />
    </div>
  );
};

export default CompaniesHeader;
