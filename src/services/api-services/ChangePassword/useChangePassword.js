import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import {
  ADMIN_ROUTE,
  CHANGE_PASSWORD,
} from "../../../constant/apiEndpoints";

const useChangePassword = () => {
  const intl = useIntl();

  const [changePasswordApiStatus, setChangePasswordApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [changePasswordData, setChangePasswordData] = useState(null);
  const [errorWhileChangingPassword, setErrorWhileChangingPassword] =
    useState("");

  const handleChangePassword = async (payload) => {
    try {
      setChangePasswordApiStatus(API_STATUS.LOADING);
      setChangePasswordData(null);
      errorWhileChangingPassword && setErrorWhileChangingPassword("");
      const url = ADMIN_ROUTE + CHANGE_PASSWORD;
      const res = await Http.patch(url, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setChangePasswordApiStatus(API_STATUS.SUCCESS);
        setChangePasswordData(res.data);
        return;
      }
      setChangePasswordApiStatus(API_STATUS.ERROR);
      setErrorWhileChangingPassword(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    } catch (err) {
      setChangePasswordApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileChangingPassword(err.response?.data?.message);
        return;
      }
      setErrorWhileChangingPassword(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isLoading = changePasswordApiStatus === API_STATUS.LOADING;
  const isSuccess = changePasswordApiStatus === API_STATUS.SUCCESS;
  const isError = changePasswordApiStatus === API_STATUS.ERROR;
  return {
    changePasswordData,
    errorWhileChangingPassword,
    changePasswordApiStatus,
    handleChangePassword,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileChangingPassword,
  };
};

export default useChangePassword;
