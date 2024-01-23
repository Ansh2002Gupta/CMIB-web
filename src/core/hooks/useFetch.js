import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../constant/constant";
import { objectToQueryString } from "../../Utils/queryParamHelpers";

/** 
 * 1. useFetch will initiate the API call on component mount automatically so that you don't require to use the useEffect hook in your component explicitly just to call the API.
 * 
 * 2. You can anytime omit this behaviour by passing skipApiCallOnMount: true inside the otherOptions object.
 * 
 * 3. "apiOptions" object is added so that you can pass custom data to the axios get method. For ex- headers.
 * 
 * Example to use this hook
 *  const { data } = useFetch({
    url: API_ENDPOINT,
    apiOptions: {
      headers: {
        sampleHeader: "value",
      },
    },
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
 * */

const useFetch = ({ url, apiOptions = {}, otherOptions = {} }) => {
  const intl = useIntl();

  const [data, setData] = useState(null);
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [error, setError] = useState(null);

  const { skipApiCallOnMount } = otherOptions || {};

  const GENERIC_GET_API_FAILED_ERROR_MESSAGE = intl.formatMessage({
    id: "label.generalGetApiFailedErrorMessage",
  });

  const fetchData = async (queryParams, onSuccessCallback, onErrorCallBack) => {
    let modifiedURL = url;
    if (queryParamsObject && objectToQueryString(queryParamsObject)) {
      modifiedURL = `${url}?${objectToQueryString(queryParamsObject)}`;
    }
    try {
      setApiStatus(API_STATUS.LOADING);
      error && setError("");
      const res = await Http.get(modifiedURL, apiOptions);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        setData(res.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setApiStatus(API_STATUS.ERROR);
      setError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
      onErrorCallBack && onErrorCallBack(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      setError(err?.response || GENERIC_GET_API_FAILED_ERROR_MESSAGE);
      onErrorCallBack &&
        onErrorCallBack(err?.response || GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    if (skipApiCallOnMount) {
      return;
    }
    fetchData();
  }, [url]);

  useEffect(() => {
    return () => {
      setData(null);
      setApiStatus(STATUS_CODES.API_STATUS);
      setError(null);
    };
  }, []);

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return { data, error, fetchData, isError, isLoading, isSuccess };
};

export default useFetch;
