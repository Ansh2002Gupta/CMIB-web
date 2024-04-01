import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../ContentHeader/ContentHeader";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { errorNotification } from "../../globalContext/notification/notificationActions";
import useShowNotification from "../../core/hooks/useShowNotification";
import { NOTIFICATION_TYPES } from "../../constant/constant";
import styles from "./AllJobsHeader.module.scss";

const AllJobsHeader = () => {
  const intl = useIntl();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [notificationState, setNotificationStateDispatch] =
    useContext(NotificationContext);

  useEffect(() => {
    if (notificationState?.isError) {
      showNotification({
        text: intl.formatMessage({
          id: "label.noDataFound",
        }),
        type: NOTIFICATION_TYPES.ERROR,
      });
      setNotificationStateDispatch(errorNotification(false));
    }
  }, [notificationState?.isError]);

  return (
    <div className={styles.headerBox}>
      {notificationContextHolder}
      <ContentHeader
        headerText={intl.formatMessage({
          id: "label.allJobs",
        })}
        isLeftFillSpace
        customStyles={styles.container}
        customContainerStyle={styles.parentContainer}
      />
    </div>
  );
};

export default AllJobsHeader;
