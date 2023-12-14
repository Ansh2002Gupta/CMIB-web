import { useState } from "react";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../Constants/Constants.js";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../Constants/errorMessages";

const useAuthOTP = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [otpData, setOTPData] = useState([]);
  const [errorWhileSendingOTP, setErrorWhileSendingOTP] = useState("");

  const handleAuthOTP = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileSendingOTP && setErrorWhileSendingOTP("");
      const res = await Http.post(`admin/reset-password-otp`, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setOTPData(res.data);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileSendingOTP(err.response?.data?.message);
        return;
      }
      setErrorWhileSendingOTP(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;
  return {
    otpData,
    errorWhileSendingOTP,
    postStatus,
    handleAuthOTP,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useAuthOTP;
