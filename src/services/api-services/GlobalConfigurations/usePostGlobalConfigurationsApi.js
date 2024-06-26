import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { MASTER } from "../../../constant/apiEndpoints";
import { CONFIGURATIONS } from "../../../routes/routeNames";

const usePostGlobalConfigurationsApi = (selectedModule) => {
  const intl = useIntl();
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [errorWhilePostingData, setErrorWhilePostingData] = useState("");

  const postGlobalConfigurations = async ({
    onSuccessCallback,
    onErrorCallback,
    payload,
  }) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      errorWhilePostingData && setErrorWhilePostingData("");
      const url = selectedModule?.key + MASTER + CONFIGURATIONS;
      const res = await Http.post(url, payload);
      if (
        res.code === STATUS_CODES.SUCCESS_POST ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setApiStatus(API_STATUS.ERROR);
      setErrorWhilePostingData(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message ||
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" });
      setErrorWhilePostingData(errorMessage);
      onErrorCallback && onErrorCallback(errorMessage);
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;
  return {
    apiStatus,
    errorWhilePostingData,
    postGlobalConfigurations,
    isError,
    isLoading,
    isSuccess,
    setErrorWhilePostingData,
  };
};

export default usePostGlobalConfigurationsApi;
