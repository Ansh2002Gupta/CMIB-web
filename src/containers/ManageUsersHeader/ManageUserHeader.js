import React from "react";
import { useIntl } from "react-intl";

import CustomButton from "../../components/CustomButton";
import ContentHeader from "../ContentHeader";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";
import { ReactComponent as PlusIcon } from "../../themes/base/assets/images/plus icon.svg";
import styles from "./ManageUserHeader.module.scss";

const ManageUserHeader = () => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const responsive = useResponsive();

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={intl.formatMessage({ id: "label.users" })}
        customStyles={styles.headerResponsiveStyle}
        rightSection={
          <CustomButton
            btnText={intl.formatMessage({
              id: `label.${responsive.isMd ? "addNewUsers" : "newUsers"}`,
            })}
            IconElement={PlusIcon}
            iconStyles={styles.btnIconStyles}
            customStyle={styles.btnCustomStyles}
            onClick={() => navigate(`add`)}
          />
        }
      />
    </div>
  );
};

export default ManageUserHeader;
