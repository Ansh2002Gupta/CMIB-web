import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../ContentHeader/ContentHeader";
import { UserDetailContext } from "../../globalContext/userDetail/userDetailProvider";
import { userDetailToast } from "../../globalContext/userDetail/userDetailActions";
import useShowNotification from "../../core/hooks/useShowNotification";
import styles from "./QueriesListingHeader.module.scss";

const QueriesListingHeader = () => {
  const intl = useIntl();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [userDetailState, setUserDetailDispatch] =
    useContext(UserDetailContext);

  useEffect(() => {
    if (userDetailState?.isUserSuccessfullyAdded) {
      showNotification({
        text: intl.formatMessage({
          id: "label.noDataFound",
        }),
        type: "error",
      });
      setUserDetailDispatch(userDetailToast(false));
    }
  }, [userDetailState?.isUserSuccessfullyAdded]);

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
