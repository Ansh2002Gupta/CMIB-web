import { useState } from "react";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../Constants/Constants.js";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../Constants/errorMessages";
import { setItem } from "../../services/encrypted-storage-service.js";

const useLogin = () => {
  const [apiCallStatus, setApiCallStatus] = useState(API_STATUS.IDLE);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleUserLogin = async (payload) => {
    try {
      setApiCallStatus(API_STATUS.LOADING);
      error && setError("");
      const res = await Http.post(`admin/login`, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setApiCallStatus(API_STATUS.SUCCESS);
        const authToken = res.data.access_token;
        setItem("authToken", authToken);
        setData(res.data);
        return;
      }
      setApiCallStatus(API_STATUS.ERROR);
    } catch (err) {
      setApiCallStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setError(err.response?.data?.message);
        return;
      }
      setError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = apiCallStatus === API_STATUS.LOADING;

  return {
    data,
    error,
    setError,
    apiCallStatus,
    handleUserLogin,
    isLoading,
  };
};

export default useLogin;
