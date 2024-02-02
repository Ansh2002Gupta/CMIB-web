import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service.js";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant.js";
import {
  ADMIN_ROUTE,
  LOGOUT_END_POINT,
} from "../../../constant/apiEndpoints.js";

const useLogout = () => {
  const intl = useIntl();

  const [logoutApiStatus, setLogoutApiStatus] = useState(API_STATUS.IDLE);
  const [error, setError] = useState("");

  const handleUserLogout = async () => {
    try {
      setLogoutApiStatus(API_STATUS.LOADING);
      setError("");
      const url = ADMIN_ROUTE + LOGOUT_END_POINT;
      const res = await Http.get(url);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setLogoutApiStatus(API_STATUS.SUCCESS);
        return;
      }
      setLogoutApiStatus(API_STATUS.ERROR);
    } catch (err) {
      setLogoutApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setError(err.response?.data?.message);
        return;
      }
      setError(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isLoading = logoutApiStatus === API_STATUS.LOADING;

  return {
    error,
    setError,
    logoutApiStatus,
    handleUserLogout,
    isLoading,
  };
};

export default useLogout;
