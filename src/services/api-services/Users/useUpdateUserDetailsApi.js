import { useState } from "react";

import Http from "../../http-service";
import {
  API_STATUS,
  STATUS_CODES,
  ROLE_ID_MAPPING,
  ALL_ROLE_ID,
} from "../../../constant/constant";
import { GENERAL_ERROR_MESSAGE } from "../../../constant/errorMessage";
import {
  ADMIN_ROUTE,
  UPDATE_USER_END_POINT,
} from "../../../constant/apiEndpoints";

const useUpdateUserDetailsApi = () => {
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [userDetails, setUserDetails] = useState(null);
  const [errorWhileUpdatingUserData, setErrorWhileUpdatingUserData] =
    useState("");

  const updateUserDetails = async (userId, payload) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      errorWhileUpdatingUserData && setErrorWhileUpdatingUserData("");
      const formData = new FormData();
      for (let [key, value] of Object.entries(payload)) {
        if (key?.toLowerCase() === "role") {
          if (value.includes("all")) {
            value = ALL_ROLE_ID;
          } else {
            value = value.map((item) => {
              item = item.toLowerCase();
              return ROLE_ID_MAPPING[`${item}`];
            });
            value = value?.filter((item) => item);
          }
          value = value.join(",");
        }
        // if (key === "profile_photo") {
        //   // TODO: Not able to upload image at the moment
        //   continue;
        // }
        formData.append(key, value);
      }
      formData.append("_method", "PATCH");
      console.log({ formData });
      const url = ADMIN_ROUTE + UPDATE_USER_END_POINT + "/" + userId;
      const res = await Http.post(url, formData);
      if (res?.code === STATUS_CODES.SUCCESS_STATUS) {
        setApiStatus(API_STATUS.SUCCESS);
        setUserDetails(res?.data);
        return;
      }
      setApiStatus(API_STATUS.ERROR);
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      if (err?.response?.data?.message) {
        setErrorWhileUpdatingUserData(err?.response?.data?.message);
        return;
      }
      setErrorWhileUpdatingUserData(GENERAL_ERROR_MESSAGE);
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
