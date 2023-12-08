import { useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // TODO: remove it.

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../Constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../Constants/errorMessages";
import { setItem, getItem } from "../../services/encrypted-storage-service.js";

const useLogin = () => {
  const [apiCallStatus, setApiCallStatus] = useState(API_STATUS.IDLE);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleUserLogin = async (payload) => {
    try {
      setApiCallStatus(API_STATUS.LOADING);
      error && setError("");
      const res = await Http.post(`admin/login`, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setApiCallStatus(API_STATUS.SUCCESS);
        const authToken = res.data.data.access_token;
        setItem("authToken", authToken);
        console.log({ authToken });
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
    apiCallStatus,
    handleUserLogin,
    isLoading,
  };
};

export default useLogin;
