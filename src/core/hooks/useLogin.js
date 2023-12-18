import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../constants/constants.js";
import { LOGIN_END_POINT, ADMIN_ROUTE } from "../../constants/apiEndpoints.js";
import { setItem } from "../../services/encrypted-storage-service.js";

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
        setLoginApiStatus(API_STATUS.SUCCESS);
        const auth = res.data.access_token;
        setItem("authToken", auth);
        setData(res.data);
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
