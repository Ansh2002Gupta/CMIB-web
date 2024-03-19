import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import {
  ADMIN_ROUTE,
  CENTRE_END_POINT,
  ROUNDS,
} from "../../../constant/apiEndpoints";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";

const useConfigUpdateHandler = () => {
  const intl = useIntl();
  const [configUpdateStatus, setConfigUpdateStatus] = useState(API_STATUS.IDLE);
  const [configUpdateResult, setConfigUpdateResult] = useState(null);
  const [errorWhileUpdatingConfig, setErrorWhileUpdatingConfig] = useState("");

  const updateCentreConfig = async ({
    centreId,
    module,
    onErrorCallback,
    onSuccessCallback,
    payload,
    roundId,
  }) => {
    try {
      setConfigUpdateStatus(API_STATUS.LOADING);
      errorWhileUpdatingConfig && setErrorWhileUpdatingConfig("");
      const url = `${ADMIN_ROUTE}/${module}${ROUNDS}/${roundId}${CENTRE_END_POINT}/${centreId}`;
      const res = await Http.put(url, payload, {
        headers: { "api-version": "1.0.1" },
      });
      if (res?.code === STATUS_CODES.SUCCESS_STATUS) {
        setConfigUpdateResult(res?.data);
        setConfigUpdateStatus(API_STATUS.SUCCESS);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setConfigUpdateStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingConfig(
        intl.formatMessage({
          id: "label.generalGetApiFailedErrorMessage",
        })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({
            id: "label.generalGetApiFailedErrorMessage",
          })
        );
    } catch (err) {
      setConfigUpdateStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingConfig(
        err?.response?.data?.message ||
          intl.formatMessage({
            id: "label.generalGetApiFailedErrorMessage",
          })
      );
      onErrorCallback &&
        onErrorCallback(
          err?.response?.data?.message ||
            intl.formatMessage({
              id: "label.generalGetApiFailedErrorMessage",
            })
        );
    }
  };

  const isLoading = configUpdateStatus === API_STATUS.LOADING;
  const isSuccess = configUpdateStatus === API_STATUS.SUCCESS;
  const isError = configUpdateStatus === API_STATUS.ERROR;
  return {
    errorWhileUpdatingConfig,
    configUpdateResult,
    updateCentreConfig,
    isError,
    isLoading,
    isSuccess,
    configUpdateStatus,
    setErrorWhileUpdatingConfig,
  };
};

export default useConfigUpdateHandler;
