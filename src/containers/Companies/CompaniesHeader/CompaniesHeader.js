import React from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../../ContentHeader";
import CustomButton from "../../../components/CustomButton";
import { ReactComponent as PlusIcon } from "../../../themes/base/assets/images/plus icon.svg";
import styles from "./CompaniesHeader.module.scss";

const CompaniesHeader = () => {
  const intl = useIntl();

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={intl.formatMessage({ id: "label.companies" })}
        customStyles={styles.headerResponsiveStyle}
        rightSection={
          <CustomButton
            btnText={intl.formatMessage({ id: "label.addCompany" })}
            IconElement={PlusIcon}
            iconStyles={styles.btnIconStyles}
            customStyle={styles.btnCustomStyles}
          />
        }
      />
    </div>
  );
};

export default CompaniesHeader;
