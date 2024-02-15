import { useIntl } from "react-intl";
import { Typography, notification } from "antd";

import {
  NOTIFICATION_POSITIONS,
  NOTIFICATION_TYPES,
} from "../../constant/constant";

const useShowNotification = () => {
  const intl = useIntl();
  const [api, notificationContextHolder] = notification.useNotification();

  const showNotification = ({ text, type, placement, headingText }) => {
    api[type || NOTIFICATION_TYPES.INFO]({
      message: headingText ? (
        <Typography>{headingText}</Typography>
      ) : (
        intl.formatMessage({ id: "label.notification" })
      ),
      description: Object.entries(text?.errors || {})?.length ? (
        Object.entries(text?.errors)?.map(([item, value]) => {
          return <Typography>{value}</Typography>;
        })
      ) : (
        <Typography>{text}</Typography>
      ),
      placement: placement || NOTIFICATION_POSITIONS.TOP_RIGHT,
    });
  };

  return { showNotification, notificationContextHolder };
};

export default useShowNotification;
