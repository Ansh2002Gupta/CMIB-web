import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import {
  ADMIN_ROUTE,
  CENTRE_END_POINT,
  ROUNDS,
  UPDATED_API_VERSION,
} from "../../../constant/apiEndpoints";

const useUpdateSessionRoundDetailsApi = () => {
  const intl = useIntl();

  const [updateSessionRoundApiStatus, setUpdateSessionRoundApiStatus] =
    useState(API_STATUS.IDLE);
  const [sessionRoundDetails, setSessionRoundDetails] = useState(null);
  const [errorWhileUpdatingRoundSession, setErrorWhileUpdatingRoundSession] =
    useState("");

  const updateSessionRoundDetails = async ({
    onSuccessCallback,
    onErrorCallback,
    payload,
    roundId,
    sessionID,
    selectedModuleKey,
  }) => {
    try {
      setUpdateSessionRoundApiStatus(API_STATUS.LOADING);
      setSessionRoundDetails(null);
      errorWhileUpdatingRoundSession && setErrorWhileUpdatingRoundSession("");
      const url =
        ADMIN_ROUTE +
        `/${selectedModuleKey}` +
        ROUNDS +
        `/${roundId}` +
        CENTRE_END_POINT +
        `?session-id=${sessionID}`;
      const res = await Http.patch(url, payload, {
        headers: { "api-version": UPDATED_API_VERSION },
      });
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setUpdateSessionRoundApiStatus(API_STATUS.SUCCESS);
        setSessionRoundDetails(res.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setUpdateSessionRoundApiStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingRoundSession(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setUpdateSessionRoundApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileUpdatingRoundSession(err.response?.data?.message);
        if (
          err.response?.data?.data &&
          err.response?.data?.data?.errors &&
          Object.entries(err.response?.data?.data?.errors).length > 0
        ) {
          onErrorCallback && onErrorCallback(err.response?.data?.data);
        } else {
          onErrorCallback && onErrorCallback(err.response?.data?.message);
        }
        return;
      }
      setErrorWhileUpdatingRoundSession(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    }
  };

  const isLoading = updateSessionRoundApiStatus === API_STATUS.LOADING;
  const isSuccess = updateSessionRoundApiStatus === API_STATUS.SUCCESS;
  const isError = updateSessionRoundApiStatus === API_STATUS.ERROR;
  return {
    sessionRoundDetails,
    errorWhileUpdatingRoundSession,
    updateSessionRoundApiStatus,
    isError,
    isLoading,
    isSuccess,
    updateSessionRoundDetails,
    setErrorWhileUpdatingRoundSession,
  };
};

export default useUpdateSessionRoundDetailsApi;
