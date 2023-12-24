import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { ADMIN_ROUTE, FORGOT_PASSWORD_END_POINT } from "../../../constant/apiEndpoints";

const useCreateNewPassword = () => {
  const intl = useIntl();

  const [createNewPasswordApiStatus, setCreateNewPasswordApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [createNewPasswordData, setCreateNewPasswordData] = useState(null);
  const [errorWhileCreatingPassword, setErrorWhileCreatingPassword] =
    useState("");

  const handleCreateNewPassword = async (payload) => {
    try {
      setCreateNewPasswordApiStatus(API_STATUS.LOADING);
      setCreateNewPasswordData(null);
      errorWhileCreatingPassword && setErrorWhileCreatingPassword("");
      const url = ADMIN_ROUTE + FORGOT_PASSWORD_END_POINT;
      const res = await Http.post(url, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setCreateNewPasswordApiStatus(API_STATUS.SUCCESS);
        setCreateNewPasswordData(res.data);
        return;
      }
      setCreateNewPasswordApiStatus(API_STATUS.ERROR);
      setErrorWhileCreatingPassword(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    } catch (err) {
      setCreateNewPasswordApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileCreatingPassword(err.response?.data?.message);
        return;
      }
      setErrorWhileCreatingPassword(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isLoading = createNewPasswordApiStatus === API_STATUS.LOADING;
  const isSuccess = createNewPasswordApiStatus === API_STATUS.SUCCESS;
  const isError = createNewPasswordApiStatus === API_STATUS.ERROR;
  return {
    createNewPasswordData,
    errorWhileCreatingPassword,
    createNewPasswordApiStatus,
    handleCreateNewPassword,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileCreatingPassword,
  };
};

export default useCreateNewPassword;
