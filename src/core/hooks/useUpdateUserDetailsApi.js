import { useState } from "react";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../Constants/Constants";
import { GENERAL_ERROR_MESSAGE } from "../../Constants/errorMessage";

const useUpdateUserDetailsApi = () => {
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [userDetails, setUserDetails] = useState(null);
  const [errorWhileUpdatingUserData, setErrorWhileUpdatingUserData] =
    useState("");

  const updateUserDetails = async (userId, payload) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      errorWhileUpdatingUserData && setErrorWhileUpdatingUserData("");
      const res = await Http.put(`admin/users/${userId}`, payload);
      if (res?.code === STATUS_CODES.SUCCESS_STATUS) {
        setApiStatus(API_STATUS.SUCCESS);
        setUserDetails(res?.data);
        return;
      }
      setApiStatus(API_STATUS.ERROR);
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      if (err?.response?.data?.message) {
        setErrorWhileUpdatingUserData(err?.response?.data?.message);
        return;
      }
      setErrorWhileUpdatingUserData(GENERAL_ERROR_MESSAGE);
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;
  return {
    errorWhileUpdatingUserData,
    userDetails,
    updateUserDetails,
    isError,
    isLoading,
    isSuccess,
    apiStatus,
    setErrorWhileUpdatingUserData,
  };
};

export default useUpdateUserDetailsApi;
