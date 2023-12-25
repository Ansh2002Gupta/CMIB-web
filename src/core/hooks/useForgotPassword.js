import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../constant/constant";
import { ADMIN_ROUTE, SEND_OTP } from "../../constant/apiEndpoints";

const useForgotPassword = () => {
  const intl = useIntl();
  const [forgotPasswordApiStatus, setForgotPasswordApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [forgotPasswordResult, setForgotPasswordResult] = useState(null);
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");

  const handleForgotPassword = async ({ onSuccess, payload }) => {
    try {
      setForgotPasswordApiStatus(API_STATUS.LOADING);
      setForgotPasswordResult(null);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const url = ADMIN_ROUTE + SEND_OTP;
      const res = await Http.post(url, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setForgotPasswordApiStatus(API_STATUS.SUCCESS);
        onSuccess();
        return;
      }
      setForgotPasswordApiStatus(API_STATUS.ERROR);
      setErrorWhileResetPassword(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    } catch (err) {
      setForgotPasswordApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileResetPassword(err.response?.data?.message);
        return;
      }
      setErrorWhileResetPassword(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isLoading = forgotPasswordApiStatus === API_STATUS.LOADING;
  const isSuccess = forgotPasswordApiStatus === API_STATUS.SUCCESS;
  const isError = forgotPasswordApiStatus === API_STATUS.ERROR;

  return {
    forgotPasswordResult,
    errorWhileResetPassword,
    forgotPasswordApiStatus,
    handleForgotPassword,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileResetPassword,
  };
};

export default useForgotPassword;
