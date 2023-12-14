import { useState } from "react";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../Constants/Constants.js";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../Constants/errorMessages";

const useCheckOTP = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [checkOTPData, setCheckOTPData] = useState([]);
  const [errorWhileVerifyingOTP, setErrorWhileVeryingOTP] = useState("");

  const handleCheckOTP = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileVerifyingOTP && setErrorWhileVeryingOTP("");
      const res = await Http.post(`admin/forget-password-otp`, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setCheckOTPData(res.data);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileVeryingOTP(err.response?.data?.message);
        return;
      }
      setErrorWhileVeryingOTP(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;
  return {
    checkOTPData,
    errorWhileVerifyingOTP,
    postStatus,
    handleCheckOTP,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useCheckOTP;
