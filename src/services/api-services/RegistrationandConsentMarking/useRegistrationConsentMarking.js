import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import {
  CORE_ROUTE,
  REGISTRATION_DATES,
  ROUNDS,
} from "../../../constant/apiEndpoints";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";

const useRegistrationAndConsentMarking = () => {
  const intl = useIntl();
  const [regAndConsentUpdateStatus, setRegAndConsentUpdateStatus] = useState(
    API_STATUS.IDLE
  );
  const [RegAndConfigUpdateResult, setRegAndConfigUpdateResult] =
    useState(null);
  const [errorWhileUpdating, setErrorWhileUpdating] = useState("");

  const GENERIC_API_FAILED_ERROR_MESSAGE = intl.formatMessage({
    id: "label.generalGetApiFailedErrorMessage",
  });

  const updateRegistrationAndConsentMarking = async ({
    module,
    onErrorCallback,
    onSuccessCallback,
    payload,
    roundId,
  }) => {
    try {
      setRegAndConsentUpdateStatus(API_STATUS.LOADING);
      errorWhileUpdating && setErrorWhileUpdating("");
      const url = `${CORE_ROUTE}/${module}${ROUNDS}/${roundId}${REGISTRATION_DATES}`;
      const res = await Http.put(url, payload);
      if (res?.code === STATUS_CODES.SUCCESS_STATUS) {
        setRegAndConfigUpdateResult(res?.data);
        setRegAndConsentUpdateStatus(API_STATUS.SUCCESS);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setRegAndConsentUpdateStatus(API_STATUS.ERROR);
      setErrorWhileUpdating(GENERIC_API_FAILED_ERROR_MESSAGE);
      onErrorCallback && onErrorCallback(GENERIC_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setRegAndConsentUpdateStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileUpdating(err.response?.data?.message);
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
      setErrorWhileUpdating(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    }
  };

  const isLoading = regAndConsentUpdateStatus === API_STATUS.LOADING;
  const isSuccess = regAndConsentUpdateStatus === API_STATUS.SUCCESS;
  const isError = regAndConsentUpdateStatus === API_STATUS.ERROR;
  return {
    errorWhileUpdating,
    RegAndConfigUpdateResult,
    updateRegistrationAndConsentMarking,
    isError,
    isLoading,
    isSuccess,
    regAndConsentUpdateStatus,
    setErrorWhileUpdating,
  };
};

export default useRegistrationAndConsentMarking;
