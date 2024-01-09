import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";

import ContentHeader from "../../ContentHeader";
import CustomButton from "../../../components/CustomButton";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useResponsive from "../../../core/hooks/useResponsive";
import { ReactComponent as PlusIcon } from "../../../themes/base/assets/images/plus icon.svg";
import styles from "./ConfigureCentreHeader.module.scss";

const ConfigureCentreHeader = ({ headingLabel }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);

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
