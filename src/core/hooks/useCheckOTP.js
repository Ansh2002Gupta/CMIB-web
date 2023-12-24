import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../constant/constant";
import {
  ADMIN_ROUTE,
  CHECK_OTP_END_POINT,
  VERIFY_OTP,
} from "../../constant/apiEndpoints";

const useCheckOTP = () => {
  const [otpAPIStatus, setOtpAPIStatus] = useState(API_STATUS.IDLE);
  const [checkOTPData, setCheckOTPData] = useState(null);
  const [errorWhileVerifyingOTP, setErrorWhileVeryingOTP] = useState("");

  const intl = useIntl();

  const handleCheckOTP = async ({ payload, onSuccess }) => {
    try {
      setOtpAPIStatus(API_STATUS.LOADING);
      errorWhileVerifyingOTP && setErrorWhileVeryingOTP("");
      const url =
        ADMIN_ROUTE + (payload.email ? VERIFY_OTP : CHECK_OTP_END_POINT);
      const res = await Http.post(url, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setOtpAPIStatus(API_STATUS.SUCCESS);
        setCheckOTPData(res.data);
        onSuccess();
        return;
      }
      setOtpAPIStatus(API_STATUS.ERROR);
      setErrorWhileVeryingOTP(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    } catch (err) {
      setOtpAPIStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileVeryingOTP(err.response?.data?.message);
        return;
      }
      setErrorWhileVeryingOTP(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isLoading = otpAPIStatus === API_STATUS.LOADING;
  const isSuccess = otpAPIStatus === API_STATUS.SUCCESS;
  const isError = otpAPIStatus === API_STATUS.ERROR;
  return {
    checkOTPData,
    errorWhileVerifyingOTP,
    otpAPIStatus,
    handleCheckOTP,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useCheckOTP;
