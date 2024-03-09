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

  const updateRegistrationAndConsentMarking = async ({
    module,
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
      setErrorWhileUpdating(
        intl.formatMessage({
          id: "label.generalGetApiFailedErrorMessage",
        })
      );
    } catch (err) {
      setRegAndConsentUpdateStatus(API_STATUS.ERROR);
      setErrorWhileUpdating(
        err?.response?.data?.message ||
          intl.formatMessage({
            id: "label.generalGetApiFailedErrorMessage",
          })
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
