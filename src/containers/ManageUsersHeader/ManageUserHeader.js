import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";

import CustomButton from "../../components/CustomButton";
import ContentHeader from "../ContentHeader";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useShowNotification from "../../core/hooks/useShowNotification";
import useResponsive from "../../core/hooks/useResponsive";
import { ADD } from "../../routes/routeNames";
import { ReactComponent as PlusIcon } from "../../themes/base/assets/images/plus icon.svg";
import styles from "./ManageUserHeader.module.scss";
import { UserDetailContext } from "../../globalContext/userDetail/userDetailProvider";
import { userDetailToast } from "../../globalContext/userDetail/userDetailActions";

const ManageUserHeader = () => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const responsive = useResponsive();
  const [userDetailState, setUserDetailDispatch] =
    useContext(UserDetailContext);

  useEffect(() => {
    if (userDetailState?.isUserSuccessfullyAdded) {
      showNotification({
        text: intl.formatMessage({ id: "label.userSuccessfullyAdded" }),
        type: "success",
      });
      setUserDetailDispatch(userDetailToast(false));
    }
  }, [userDetailState]);

  return (
    <>
      {notificationContextHolder}
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
              onClick={() => {
                navigate(ADD);
              }}
            />
          }
        />
      </div>
    </>
  );
};

export default ManageUserHeader;
