import { useIntl } from "react-intl";
import { Typography, notification } from "antd";

import {
  NOTIFICATION_POSITIONS,
  NOTIFICATION_TYPES,
} from "../../constant/constant";

const useShowNotification = () => {
  const intl = useIntl();
  const [api, notificationContextHolder] = notification.useNotification();

  const showNotification = (text, type, placement) => {
    api[type || NOTIFICATION_TYPES.INFO]({
      message: intl.formatMessage({ id: "label.notification" }),
      description: <Typography>{text}</Typography>,
      placement: placement || NOTIFICATION_POSITIONS.TOP_RIGHT,
    });
  };

  return { showNotification, notificationContextHolder };
};

export default useShowNotification;
