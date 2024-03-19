import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../constant/constant";
import { objectToQueryString } from "../../Utils/queryParamHelpers";

const useApiRequest = ({ method, url, apiOptions = {}, otherOptions = {} }) => {
  const intl = useIntl();

  const [data, setData] = useState(null);
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [error, setError] = useState(null);

  const GENERIC_API_FAILED_ERROR_MESSAGE = intl.formatMessage({
    id: "label.generalGetApiFailedErrorMessage",
  });

  const makeRequest = async ({
    overrideUrl, // Allows the user to override the default URL if needed
    body,
    queryParamsObject = {},
    onSuccessCallback,
    onErrorCallback,
  }) => {
    const requestUrl = overrideUrl || url; // Use overrideUrl if provided, otherwise use the default url
    let modifiedURL = requestUrl;
    if (queryParamsObject && objectToQueryString(queryParamsObject)) {
      modifiedURL = `${requestUrl}?${objectToQueryString(queryParamsObject)}`;
    }
    try {
      setApiStatus(API_STATUS.LOADING);
      error && setError("");
      const response = await Http[method](modifiedURL, body, apiOptions);
      if (
        response.code === STATUS_CODES.SUCCESS_STATUS ||
        response.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        setData(response.data);
        onSuccessCallback && onSuccessCallback(response.data);
        return response.data;
      }
      setApiStatus(API_STATUS.ERROR);
      setError(GENERIC_API_FAILED_ERROR_MESSAGE);
      onErrorCallback && onErrorCallback(GENERIC_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      setError(err?.response || GENERIC_API_FAILED_ERROR_MESSAGE);
      onErrorCallback &&
        onErrorCallback(
          err?.response?.data?.message || GENERIC_API_FAILED_ERROR_MESSAGE
        );
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return {
    apiStatus,
    data,
    error,
    makeRequest,
    isError,
    isLoading,
    isSuccess,
    setData,
  };
};

export const usePost = ({ url, apiOptions, otherOptions }) =>
  useApiRequest({ method: "post", url, apiOptions, otherOptions });
export const usePut = ({ url, apiOptions, otherOptions }) =>
  useApiRequest({ method: "put", url, apiOptions, otherOptions });
export const usePatch = ({ url, apiOptions, otherOptions }) =>
  useApiRequest({ method: "patch", url, apiOptions, otherOptions });
