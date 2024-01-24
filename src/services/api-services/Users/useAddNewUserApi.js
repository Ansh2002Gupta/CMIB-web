import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { USERS_END_POINT, ADMIN_ROUTE } from "../../../constant/apiEndpoints";

const useAddNewUserApi = () => {
  const intl = useIntl();

  const [addNewUserApiStatus, setAddNewUserApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [addNewUserData, setAddNewUserData] = useState(null);
  const [errorWhileAddingNewUser, setErrorWhileAddingNewUser] = useState("");

  const addNewUser = async (payload, onSuccessCallback) => {
    const formData = new FormData();
    for (let [key, value] of Object.entries(payload)) {
      if (
        key?.toLowerCase() === "roles" ||
        key?.toLowerCase() === "permissions"
      ) {
        value = value.join(",");
      }
      formData.append(key, value);
    }
    formData.append("permissions", "1"); // TODO: Please remove this once the ADD NEW USER API is updated.
    try {
      const apiOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      setAddNewUserApiStatus(API_STATUS.LOADING);
      setAddNewUserData(null);
      errorWhileAddingNewUser && setErrorWhileAddingNewUser("");
      const url = ADMIN_ROUTE + USERS_END_POINT;
      const res = await Http.post(url, formData, apiOptions);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setAddNewUserApiStatus(API_STATUS.SUCCESS);
        setAddNewUserData(res.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setAddNewUserApiStatus(API_STATUS.ERROR);
      setErrorWhileAddingNewUser(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    } catch (err) {
      setAddNewUserApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileAddingNewUser(err.response?.data?.message);
        return;
      }
      setErrorWhileAddingNewUser(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isLoading = addNewUserApiStatus === API_STATUS.LOADING;
  const isSuccess = addNewUserApiStatus === API_STATUS.SUCCESS;
  const isError = addNewUserApiStatus === API_STATUS.ERROR;
  return {
    addNewUserData,
    errorWhileAddingNewUser,
    addNewUserApiStatus,
    isError,
    isLoading,
    isSuccess,
    addNewUser,
    setErrorWhileAddingNewUser,
  };
};

export default useAddNewUserApi;
