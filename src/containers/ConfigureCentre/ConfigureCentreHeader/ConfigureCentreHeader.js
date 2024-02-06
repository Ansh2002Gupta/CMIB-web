import React from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import ContentHeader from "../../ContentHeader";
import CustomButton from "../../../components/CustomButton";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useResponsive from "../../../core/hooks/useResponsive";
import { ReactComponent as PlusIcon } from "../../../themes/base/assets/images/plus icon.svg";
import styles from "./ConfigureCentreHeader.module.scss";

const ConfigureCentreHeader = ({ showButton }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { centreId } = useParams();

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={intl.formatMessage({
          id: `label.${
            showButton
              ? "configureCentres"
              : centreId
              ? "editCentreDetails"
              : "addNewCentre"
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
                navigate("add/");
              }}
            />
          )
        }
      />
    </div>
  );
};

export default ConfigureCentreHeader;
