import React from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../../ContentHeader";
import CustomButton from "../../../components/CustomButton";
import useResponsive from "../../../core/hooks/useResponsive";
import { ReactComponent as PlusIcon } from "../../../themes/base/assets/images/plus icon.svg";
import styles from "./ConfigureCentreHeader.module.scss";

const ConfigureCentreHeader = ({ getImage, headingLabel, navigate }) => {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={intl.formatMessage({ id: `label.${headingLabel}` })}
        customStyles={styles.headerResponsiveStyle}
        rightSection={
          !!getImage && (
            <CustomButton
              btnText={intl.formatMessage({
                id: `label.${responsive.isMd ? "addNewCentre" : "newCentre"}`,
              })}
              IconElement={PlusIcon}
              iconStyles={styles.btnIconStyles}
              customStyle={styles.btnCustomStyles}
              onClick={() => {
                navigate("add");
              }}
            />
          )
        }
      />
    </div>
  );
};

export default ConfigureCentreHeader;
