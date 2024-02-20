import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../ContentHeader/ContentHeader";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { userDetailToast } from "../../globalContext/notification/notificationActions";
import useShowNotification from "../../core/hooks/useShowNotification";
import styles from "./QueriesListingHeader.module.scss";

const QueriesListingHeader = () => {
  const intl = useIntl();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [notificationState, setNotificationStateDispatch] =
    useContext(NotificationContext);

  useEffect(() => {
    if (notificationState?.isUserSuccessfullyAdded) {
      showNotification({
        text: intl.formatMessage({
          id: "label.noDataFound",
        }),
        type: "error",
      });
      setNotificationStateDispatch(userDetailToast(false));
    }
  }, [notificationState?.isUserSuccessfullyAdded]);

  return (
    <div className={styles.headerBox}>
      {notificationContextHolder}
      <ContentHeader
        headerText={intl.formatMessage({
          id: "label.queries",
        })}
        isLeftFillSpace
        customStyles={styles.container}
        customContainerStyle={styles.parentContainer}
      />
    </div>
  );
};

export default QueriesListingHeader;
