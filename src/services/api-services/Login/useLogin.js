import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service.js";
import {
  API_STATUS,
  STATUS_CODES,
  STORAGE_KEYS,
} from "../../../constant/constant.js";
import {
  LOGIN_END_POINT,
  ADMIN_ROUTE,
} from "../../../constant/apiEndpoints.js";
import { setItem } from "../../encrypted-storage-service.js";

const useLogin = () => {
  const intl = useIntl();

  const [loginApiStatus, setLoginApiStatus] = useState(API_STATUS.IDLE);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleUserLogin = async (payload) => {
    try {
      setLoginApiStatus(API_STATUS.LOADING);
      error && setError("");
      const url = ADMIN_ROUTE + LOGIN_END_POINT;
      const res = await Http.post(url, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        if (res?.data) {
          const auth = res.data.access_token;
          const user = res?.data?.user;
          setItem("authToken", auth);
          setItem(STORAGE_KEYS.USER_DATA, user);
          setData(res.data);
        }
        setLoginApiStatus(API_STATUS.SUCCESS);
        return;
      }
      setLoginApiStatus(API_STATUS.ERROR);
    } catch (err) {
      setLoginApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setError(err.response?.data?.message);
        return;
      }
      setError(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isLoading = loginApiStatus === API_STATUS.LOADING;

  return {
    data,
    error,
    setError,
    loginApiStatus,
    handleUserLogin,
    isLoading,
  };
};

export default useLogin;
