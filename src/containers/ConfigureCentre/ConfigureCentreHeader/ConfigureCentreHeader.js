import React from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import ContentHeader from "../../ContentHeader";
import CustomButton from "../../../components/CustomButton";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useResponsive from "../../../core/hooks/useResponsive";
import { ReactComponent as PlusIcon } from "../../../themes/base/assets/images/plus icon.svg";
import { ADD } from "../../../routes/routeNames";
import styles from "./ConfigureCentreHeader.module.scss";

const ConfigureCentreHeader = ({
  customHeaderStyling,
  showButton,
  tabComponent,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { centreId } = useParams();

  return (
    <div className={[styles.headerContainer, customHeaderStyling].join(" ")}>
      <ContentHeader
        headerText={intl.formatMessage({
          id: `label.${
            showButton
              ? "configureCentres"
              : centreId
              ? "editCentreDetails"
              : "global_configurations"
          }`,
        })}
        customStyles={styles.headerResponsiveStyle}
        rightSection={
          showButton && (
            <CustomButton
              btnText={
                responsive?.isSm
                  ? intl.formatMessage({
                      id: `label.${
                        responsive.isMd ? "addNewCentre" : "newCentre"
                      }`,
                    })
                  : ""
              }
              IconElement={PlusIcon}
              iconStyles={styles.btnIconStyles}
              customStyle={styles.btnCustomStyles}
              onClick={() => {
                navigate(ADD);
              }}
            />
          )
        }
      />
      {tabComponent}
    </div>
  );
};

export default ConfigureCentreHeader;
