import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { CORE_ROUTE, SESSIONS } from "../../../constant/apiEndpoints";

const useAddNewSessionApi = () => {
  const intl = useIntl();

  const [addNewSessionApiStatus, setAddNewSessionApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [addNewSessionData, setAddNewSessionData] = useState(null);
  const [errorWhileAddingNewSession, setErrorWhileAddingNewSession] =
    useState("");

  const addNewSession = async ({
    currentlySelectedModuleKey,
    payload,
    onSuccessCallback,
    onErrorCallback,
  }) => {
    try {
      setAddNewSessionApiStatus(API_STATUS.LOADING);
      setAddNewSessionData(null);
      errorWhileAddingNewSession && setErrorWhileAddingNewSession("");
      const url = CORE_ROUTE + `/${currentlySelectedModuleKey}` + SESSIONS;
      const res = await Http.post(url, payload);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setAddNewSessionApiStatus(API_STATUS.SUCCESS);
        setAddNewSessionData(res.data);
        onSuccessCallback && onSuccessCallback(res.data);
        return;
      }
      setAddNewSessionApiStatus(API_STATUS.ERROR);
      setErrorWhileAddingNewSession(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setAddNewSessionApiStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message ||
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" });
      setErrorWhileAddingNewSession(errorMessage);
      onErrorCallback && onErrorCallback(errorMessage);
    }
  };

  const isLoading = addNewSessionApiStatus === API_STATUS.LOADING;
  const isSuccess = addNewSessionApiStatus === API_STATUS.SUCCESS;
  const isError = addNewSessionApiStatus === API_STATUS.ERROR;
  return {
    addNewSessionData,
    errorWhileAddingNewSession,
    addNewSessionApiStatus,
    isError,
    isLoading,
    isSuccess,
    addNewSession,
    setErrorWhileAddingNewSession,
  };
};

export default useAddNewSessionApi;
