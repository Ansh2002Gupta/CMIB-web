import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { CORE_ROUTE, SESSIONS } from "../../../constant/apiEndpoints";

const useUpdateSessionApi = () => {
  const intl = useIntl();

  const [updateSessionApiStatus, setUpdateSessionApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [updatedSessionData, setUpdatedSessionData] = useState(null);
  const [errorWhileUpdatingSession, setErrorWhileUpdatingSession] =
    useState("");

  const updateSessionDetails = async ({
    currentlySelectedModuleKey,
    sessionId,
    payload,
    onSuccessCallback,
    onErrorCallback,
  }) => {
    try {
      setUpdateSessionApiStatus(API_STATUS.LOADING);
      setUpdatedSessionData(null);
      errorWhileUpdatingSession && setErrorWhileUpdatingSession("");
      const url =
        CORE_ROUTE +
        `/${currentlySelectedModuleKey}` +
        SESSIONS +
        `/${sessionId}`;
      const res = await Http.put(url, payload);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setUpdateSessionApiStatus(API_STATUS.SUCCESS);
        setUpdatedSessionData(res.data);
        onSuccessCallback && onSuccessCallback(res.data);
        return;
      }
      setUpdateSessionApiStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingSession(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setUpdateSessionApiStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message ||
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" });
      setErrorWhileUpdatingSession(errorMessage);
      onErrorCallback && onErrorCallback(errorMessage);
    }
  };

  const isLoading = updateSessionApiStatus === API_STATUS.LOADING;
  const isSuccess = updateSessionApiStatus === API_STATUS.SUCCESS;
  const isError = updateSessionApiStatus === API_STATUS.ERROR;
  return {
    updatedSessionData,
    errorWhileUpdatingSession,
    updateSessionApiStatus,
    isError,
    isLoading,
    isSuccess,
    updateSessionDetails,
    setErrorWhileUpdatingSession,
  };
};

export default useUpdateSessionApi;
