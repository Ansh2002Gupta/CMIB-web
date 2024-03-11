import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../constant/constant";
import { objectToQueryString } from "../../Utils/queryParamHelpers";
import { saveAs } from "file-saver";

const useDownload = ({
  apiOptions = {},
  otherOptions = {},
  filename = "data.csv",
}) => {
  const intl = useIntl();

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [error, setError] = useState(null);

  const GENERIC_GET_API_FAILED_ERROR_MESSAGE = intl.formatMessage({
    id: "label.generalGetApiFailedErrorMessage",
  });

  const download = async ({
    url,
    queryParamsObject = {},
    onSuccessCallback,
    onErrorCallback,
  }) => {
    let modifiedURL = url;
    if (queryParamsObject && objectToQueryString(queryParamsObject)) {
      modifiedURL = `${url}?${objectToQueryString(queryParamsObject)}`;
    }
    try {
      setApiStatus(API_STATUS.LOADING);
      error && setError("");
      const response = await Http.get(modifiedURL, {
        ...apiOptions,
        responseType: "blob",
      });
      if (response) {
        saveAs(new Blob([response]), filename);
        setApiStatus(API_STATUS.SUCCESS);
        onSuccessCallback && onSuccessCallback(response);
      } else {
        throw new Error("Server responded with non-200 status");
      }
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      setError(err?.response || GENERIC_GET_API_FAILED_ERROR_MESSAGE);
      onErrorCallback &&
        onErrorCallback(err?.response || GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    return () => {
      setApiStatus(API_STATUS.IDLE);
      setError(null);
    };
  }, []);

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return {
    apiStatus,
    error,
    download,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useDownload;
