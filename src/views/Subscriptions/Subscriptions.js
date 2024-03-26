import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

import TwoRow from "../../core/layouts/TwoRow";
import useResponsive from "../../core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton";
import ContentHeader from "../../containers/ContentHeader";
import SubscriptionsTable from "../../containers/SubscriptionsTable/SubscriptionsTable";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import useShowNotification from "../../core/hooks/useShowNotification";
import { setShowSuccessNotification } from "../../globalContext/notification/notificationActions";
import { ADD_SUBSCRIPTIONS } from "../../routes/routeNames";
import { ReactComponent as PlusIcon } from "../../themes/base/assets/images/plus icon.svg";
import styles from "./Subscriptions.module.scss";

const Subscriptions = () => {
  const intl = useIntl();
  const responsive = useResponsive();

  const navigate = useNavigate();
  const [notificationState, setNotificationStateDispatch] =
    useContext(NotificationContext);

  const { showNotification, notificationContextHolder } = useShowNotification();

  const handleAddSubscription = () => {
    navigate(ADD_SUBSCRIPTIONS);
  };

  useEffect(() => {
    if (
      notificationState?.showSuccessNotification?.isAdded ||
      notificationState?.showSuccessNotification?.isEdited
    ) {
      showNotification({
        text: intl.formatMessage({
          id: notificationState?.showSuccessNotification?.isAdded
            ? "label.subscription_saved_successfully"
            : "label.subscription_edit_successfully",
        }),
        type: "success",
      });
      setNotificationStateDispatch(setShowSuccessNotification(false));
    }
  }, [notificationState?.showSuccessNotification]);

  return (
    <TwoRow
      topSection={
        <ContentHeader
          customContainerStyle={styles.customContainerStyle}
          headerText={intl.formatMessage({ id: "label.manageSubscriptions" })}
          rightSection={
            <CustomButton
              customButtonContainerStyle={styles.customButtonContainerStyle}
              btnText={
                responsive.isMd
                  ? intl.formatMessage({
                      id: "label.addSubscription",
                    })
                  : ""
              }
              IconElement={PlusIcon}
              onClick={() => handleAddSubscription()}
            />
          }
        />
      }
      bottomSection={<SubscriptionsTable />}
    />
  );
};

export default Subscriptions;
