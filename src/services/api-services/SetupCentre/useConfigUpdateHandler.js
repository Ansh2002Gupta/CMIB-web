import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import {
  ADMIN_ROUTE,
  CENTRE_END_POINT,
  ROUNDS,
  UPDATED_API_VERSION,
} from "../../../constant/apiEndpoints";
import {
  API_VERSION_QUERY_PARAM,
  API_STATUS,
  SESSION_ID_QUERY_PARAM,
  STATUS_CODES,
} from "../../../constant/constant";

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
    sessionId,
  }) => {
    try {
      setConfigUpdateStatus(API_STATUS.LOADING);
      errorWhileUpdatingConfig && setErrorWhileUpdatingConfig("");
      const url = `${ADMIN_ROUTE}/${module}${ROUNDS}/${roundId}${CENTRE_END_POINT}/${centreId}?${SESSION_ID_QUERY_PARAM}=${sessionId}`;
      const res = await Http.put(url, payload, {
        headers: { [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION },
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
