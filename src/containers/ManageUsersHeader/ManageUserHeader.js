import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";

import CustomButton from "../../components/CustomButton";
import ContentHeader from "../ContentHeader";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useShowNotification from "../../core/hooks/useShowNotification";
import useResponsive from "../../core/hooks/useResponsive";
import {
  addUserNotification,
  updateUserNotification,
} from "../../globalContext/notification/notificationActions";
import { ADD } from "../../routes/routeNames";
import { ReactComponent as PlusIcon } from "../../themes/base/assets/images/plus icon.svg";
import { NOTIFICATION_TYPES } from "../../constant/constant";
import styles from "./ManageUserHeader.module.scss";

const ManageUserHeader = () => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const responsive = useResponsive();
  const [notificationState, setNotificationStateDispatch] =
    useContext(NotificationContext);

  useEffect(() => {
    if (
      notificationState?.addUserSuccessfully ||
      notificationState?.updateUserSuccessfully
    ) {
      showNotification({
        text: intl.formatMessage({
          id: notificationState?.addUserSuccessfully
            ? "label.userSuccessfullyAdded"
            : "label.userSuccessfullyEdited",
        }),
        type: NOTIFICATION_TYPES.SUCCESS,
      });
      setNotificationStateDispatch(addUserNotification(false));
      setNotificationStateDispatch(updateUserNotification(false));
    }
  }, [
    notificationState?.addUserSuccessfully,
    notificationState?.updateUserSuccessfully,
  ]);

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
