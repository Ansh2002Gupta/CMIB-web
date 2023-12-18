import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../services/http-service";
import { ADMIN_ROUTE, AUTHENTICATE_OTP_ROUTE } from "../../constants/apiEndpoints" 
import {
  API_STATUS,
  STATUS_CODES,
} from "../../constants/Constants";

const useAuthOTP = () => {
  const [authOTPApiStatus, setAuthOTPApiStatus] = useState(API_STATUS.IDLE);
  const [otpData, setOTPData] = useState([]);
  const [errorWhileSendingOTP, setErrorWhileSendingOTP] = useState("");
  const intl = useIntl();

  const handleAuthOTP = async (payload) => {
    try {
      setAuthOTPApiStatus(API_STATUS.LOADING);
      errorWhileSendingOTP && setErrorWhileSendingOTP("");
      const url = ADMIN_ROUTE + AUTHENTICATE_OTP_ROUTE;
      const res = await Http.post(url, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setAuthOTPApiStatus(API_STATUS.SUCCESS);
        setOTPData(res.data);
        return;
      }
      setAuthOTPApiStatus(API_STATUS.ERROR);
      setErrorWhileSendingOTP(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    } catch (err) {
      setAuthOTPApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileSendingOTP(err.response?.data?.message);
        return;
      }
      setErrorWhileSendingOTP(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isLoading = authOTPApiStatus === API_STATUS.LOADING;
  const isSuccess = authOTPApiStatus === API_STATUS.SUCCESS;
  const isError = authOTPApiStatus === API_STATUS.ERROR;
  return {
    otpData,
    errorWhileSendingOTP,
    authOTPApiStatus,
    handleAuthOTP,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useAuthOTP;
