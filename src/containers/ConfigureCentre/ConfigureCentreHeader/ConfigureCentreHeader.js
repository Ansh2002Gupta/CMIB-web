import React from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../../ContentHeader";
import CustomButton from "../../../components/CustomButton";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useResponsive from "../../../core/hooks/useResponsive";
import { ReactComponent as PlusIcon } from "../../../themes/base/assets/images/plus icon.svg";
import styles from "./ConfigureCentreHeader.module.scss";

const ConfigureCentreHeader = ({ headingLabel, showButton }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={intl.formatMessage({ id: `label.${headingLabel}` })}
        customStyles={styles.headerResponsiveStyle}
        rightSection={
          showButton && (
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
