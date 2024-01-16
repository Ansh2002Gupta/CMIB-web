import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { PLACEMENT_CORE_SESSION, CREATE } from "../../../constant/apiEndpoints";

const useSession = () => {
  const intl = useIntl();
  const [addSessionApiStatus, setAddSessionApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [addSessionResult, setAddSessionResult] = useState(null);
  const [errorWhileAddSession, setErrorWhileAddSession] = useState("");

  const handleAddSession = async ({ onSuccess, payload }) => {
    try {
      setAddSessionApiStatus(API_STATUS.LOADING);
      setAddSessionResult(null);
      errorWhileAddSession && setErrorWhileAddSession("");
      const url = PLACEMENT_CORE_SESSION + CREATE;
      const res = await Http.post(url, payload);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setAddSessionApiStatus(API_STATUS.SUCCESS);
        onSuccess && onSuccess();
        return;
      }
      setAddSessionApiStatus(API_STATUS.ERROR);
      setErrorWhileAddSession(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    } catch (err) {
      setAddSessionApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileAddSession(err.response?.data?.message);
        return;
      }
      setErrorWhileAddSession(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isLoading = addSessionApiStatus === API_STATUS.LOADING;
  const isSuccess = addSessionApiStatus === API_STATUS.SUCCESS;
  const isError = addSessionApiStatus === API_STATUS.ERROR;
  return {
    addSessionResult,
    errorWhileAddSession,
    addSessionApiStatus,
    handleAddSession,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileAddSession,
  };
};

export default useSession;
