import React from "react";

import ContentHeader from "../../ContentHeader";
import CustomButton from "../../../components/CustomButton";
import useResponsive from "../../../core/hooks/useResponsive";
import styles from "./ConfigureCentreHeader.module.scss";

const ConfigureCentreHeader = ({ intl, getImage, navigate, headingLabel }) => {
  const responsive = useResponsive();

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={intl.formatMessage({ id: `label.${headingLabel}` })}
        customStyles={styles.headerResponsiveStyle}
        rightSection={
          !!getImage && <CustomButton
            btnText={intl.formatMessage({
              id: `label.${responsive.isMd ? "addNewCentre" : "newCentre"}`,
            })}
            iconUrl={getImage("plusIcon")}
            iconStyles={styles.btnIconStyles}
            customStyle={styles.btnCustomStyles}
            onClick={()=>{navigate('add')}}
          />
        }
      />
    </div>
  );
};

export default ConfigureCentreHeader;
