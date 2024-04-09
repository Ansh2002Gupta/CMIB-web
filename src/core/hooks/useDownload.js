import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../constant/constant";
import { objectToQueryString } from "../../Utils/queryParamHelpers";

const useDownload = ({
  apiOptions = {},
  otherOptions = {},
  filename = "data.xls",
}) => {
  const intl = useIntl();

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [error, setError] = useState(null);

  const GENERIC_GET_API_FAILED_ERROR_MESSAGE = intl.formatMessage({
    id: "label.generalGetApiFailedErrorMessage",
  });

  const initiateDownload = async ({
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
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${filename}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setApiStatus(API_STATUS.SUCCESS);
        onSuccessCallback && onSuccessCallback(response);
      } else {
        throw new Error("Server responded with non-200 status");
      }
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      setError(err?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE);
      onErrorCallback &&
        onErrorCallback(err?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE);
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
    initiateDownload,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useDownload;
