import React from "react";

import ContentHeader from "../../ContentHeader";
import CustomButton from "../../../components/CustomButton";
import useResponsive from "../../../core/hooks/useResponsive";
import { ReactComponent as PlusIcon } from "../../../themes/base/assets/images/plus icon.svg";
import styles from "./ConfigureCentreHeader.module.scss";

const ConfigureCentreHeader = ({ intl, getImage }) => {
  const responsive = useResponsive();

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={intl.formatMessage({ id: "label.configureCentres" })}
        customStyles={styles.headerResponsiveStyle}
        rightSection={
          <CustomButton
            btnText={intl.formatMessage({
              id: `label.${responsive.isMd ? "addNewCentre" : "newCentre"}`,
            })}
            IconElement={PlusIcon}
            iconStyles={styles.btnIconStyles}
            customStyle={styles.btnCustomStyles}
          />
        }
      />
    </div>
  );
};

export default ConfigureCentreHeader;
