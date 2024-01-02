import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { ADMIN_ROUTE, VERIFY_OTP } from "../../../constant/apiEndpoints";
import { setItem } from "../../encrypted-storage-service";

const useCheckOTP = () => {
  const [otpAPIStatus, setOtpAPIStatus] = useState(API_STATUS.IDLE);
  const [checkOTPData, setCheckOTPData] = useState(null);
  const [errorWhileVerifyingOTP, setErrorWhileVeryingOTP] = useState("");
  const intl = useIntl();

  const handleCheckOTP = async (payload, onSuccessCallback) => {
    try {
      setOtpAPIStatus(API_STATUS.LOADING);
      errorWhileVerifyingOTP && setErrorWhileVeryingOTP("");
      const url = ADMIN_ROUTE + VERIFY_OTP;
      const res = await Http.post(url, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        if (res?.data?.token?.access_token) {
          const auth = res?.data?.token?.access_token;
          setItem("authToken", auth);
        }
        setCheckOTPData(res.data);
        onSuccessCallback && onSuccessCallback();
        setOtpAPIStatus(API_STATUS.SUCCESS);
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
