import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { ADMIN_ROUTE, PROFILE_END_POINT } from "../../../constant/apiEndpoints";

const useUpdateUserProfileApi = () => {
  const intl = useIntl();
  const [updatingUserProfileApiStatus, setUpdatingUserProfileApiStatus] =
    useState(API_STATUS.IDLE);
  const [userProfileUpdatedData, setUserProfileUpdatedData] = useState(null);
  const [errorWhileUpdatingUserProfile, setErrorWhileUpdatingUserProfile] =
    useState("");

  const handleUpdatingUserProfile = async ({
    onSuccessCallback,
    payload,
    onErrorCallback,
  }) => {
    try {
      setUpdatingUserProfileApiStatus(API_STATUS.LOADING);
      setUserProfileUpdatedData(null);
      errorWhileUpdatingUserProfile && setErrorWhileUpdatingUserProfile("");
      const url = ADMIN_ROUTE + PROFILE_END_POINT;
      const res = await Http.patch(url, payload);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setUpdatingUserProfileApiStatus(API_STATUS.SUCCESS);
        setUserProfileUpdatedData(res?.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setUpdatingUserProfileApiStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingUserProfile(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setUpdatingUserProfileApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileUpdatingUserProfile(err.response?.data?.message);
        onErrorCallback && onErrorCallback(err.response?.data?.message);
        return;
      }
      setErrorWhileUpdatingUserProfile(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    }
  };

  const isLoading = updatingUserProfileApiStatus === API_STATUS.LOADING;
  const isSuccess = updatingUserProfileApiStatus === API_STATUS.SUCCESS;
  const isError = updatingUserProfileApiStatus === API_STATUS.ERROR;
  return {
    userProfileUpdatedData,
    errorWhileUpdatingUserProfile,
    updatingUserProfileApiStatus,
    handleUpdatingUserProfile,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileUpdatingUserProfile,
  };
};

export default useUpdateUserProfileApi;
