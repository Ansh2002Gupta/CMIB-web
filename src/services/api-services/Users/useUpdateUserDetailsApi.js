import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { ADMIN_ROUTE, USERS_END_POINT } from "../../../constant/apiEndpoints";

const useUpdateUserDetailsApi = () => {
  const intl = useIntl();
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [userDetails, setUserDetails] = useState(null);
  const [errorWhileUpdatingUserData, setErrorWhileUpdatingUserData] =
    useState("");

  const updateUserDetails = async (userId, payload, onSuccessCallback) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      errorWhileUpdatingUserData && setErrorWhileUpdatingUserData("");
      const formData = new FormData();
      for (let [key, value] of Object.entries(payload)) {
        if (key?.toLowerCase() === "role") {
          value = value.map((item) => item.id);
          value = value.join(",");
        }
        formData.append(key, value);
      }
      formData.append("_method", "PATCH");
      // TODO: remove the below code once we start getting current user permissions.
      formData.append("permissions", "1");
      const url = ADMIN_ROUTE + USERS_END_POINT + "/" + userId;
      const apiOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await Http.post(url, formData, apiOptions);
      if (res?.code === STATUS_CODES.SUCCESS_STATUS) {
        setUserDetails(res?.data);
        setApiStatus(API_STATUS.SUCCESS);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setApiStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingUserData(
        intl.formatMessage({
          id: "label.generalGetApiFailedErrorMessage",
        })
      );
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      if (err?.response?.data?.message) {
        setErrorWhileUpdatingUserData(err?.response?.data?.message);
        return;
      }
      setErrorWhileUpdatingUserData(
        intl.formatMessage({
          id: "label.generalGetApiFailedErrorMessage",
        })
      );
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;
  return {
    errorWhileUpdatingUserData,
    userDetails,
    updateUserDetails,
    isError,
    isLoading,
    isSuccess,
    apiStatus,
    setErrorWhileUpdatingUserData,
  };
};

export default useUpdateUserDetailsApi;
