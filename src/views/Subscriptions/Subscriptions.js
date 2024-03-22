import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { Button } from "antd";

import TwoRow from "../../core/layouts/TwoRow";

import ContentHeader from "../../containers/ContentHeader";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import useShowNotification from "../../core/hooks/useShowNotification";
import { setShowSuccessNotification } from "../../globalContext/notification/notificationActions";
import { ADD_SUBSCRIPTIONS } from "../../routes/routeNames";

const Subscriptions = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [notificationState, setNotificationStateDispatch] =
    useContext(NotificationContext);

  const { showNotification, notificationContextHolder } = useShowNotification();

  const handleAddSubscription = () => {
    navigate(`${"subscription-details"}/${2}?mode=view`);
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
    <>
      {notificationContextHolder}
      <TwoRow
        topSection={
          <ContentHeader
            headerText="Manage Subscriptions"
            rightSection={
              <Button onClick={handleAddSubscription}>Add Subscription</Button>
            }
          />
        }
        bottomSection={<></>}
      />
    </>
  );
};

export default Subscriptions;
