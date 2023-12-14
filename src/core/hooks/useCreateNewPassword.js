import { useState } from "react";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../Constants/Constants.js";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../Constants/errorMessages";

const useCreateNewPassword = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [createNewPasswordData, setCreateNewPasswordData] = useState(null);
  const [errorWhileCreatingPassword, setErrorWhileCreatingPassword] =
    useState("");

  const handleCreateNewPassword = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      setCreateNewPasswordData(null);
      errorWhileCreatingPassword && setErrorWhileCreatingPassword("");
      const res = await Http.post(`admin/forget-password`, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setCreateNewPasswordData(res.data);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileCreatingPassword(err.response?.data?.message);
        return;
      }
      setErrorWhileCreatingPassword(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;
  return {
    createNewPasswordData,
    errorWhileCreatingPassword,
    postStatus,
    handleCreateNewPassword,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useCreateNewPassword;
