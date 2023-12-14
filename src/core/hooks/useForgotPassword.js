import { useState } from "react";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../Constants/Constants.js";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../Constants/errorMessages";

const useForgotPassword = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [forgotPasswordResult, setForgotPasswordResult] = useState(null);
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");

  const handleForgotPassword = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      setForgotPasswordResult(null);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const res = await Http.post(`admin/reset-password-otp`, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileResetPassword(err.response?.data?.message);
        return;
      }
      setErrorWhileResetPassword(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;
  return {
    forgotPasswordResult,
    errorWhileResetPassword,
    postStatus,
    handleForgotPassword,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileResetPassword,
  };
};

export default useForgotPassword;
