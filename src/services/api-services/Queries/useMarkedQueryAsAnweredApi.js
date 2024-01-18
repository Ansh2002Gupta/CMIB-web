import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import {
  ADMIN_ROUTE,
  MARKED_QUERY_END_POINT,
  QUERY_END_POINT,
} from "../../../constant/apiEndpoints";

const useMarkedQueryAsAnweredApi = () => {
  const intl = useIntl();
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [markedQuery, setMarkedQuery] = useState(null);
  const [errorWhileUpdatingQueryStatus, setErrorWhileUpdatingQueryStatus] =
    useState("");

  const markedQueryAsAnswered = async ({
    queryId,
    onSuccessCallback = null,
    onErrorCallBack = null,
  }) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      errorWhileUpdatingQueryStatus && setErrorWhileUpdatingQueryStatus("");
      const url = ADMIN_ROUTE + QUERY_END_POINT + `/${queryId}` + MARKED_QUERY_END_POINT + "/dwy";
      const res = await Http.post(url);
      if (
        res?.code === STATUS_CODES.SUCCESS_STATUS ||
        res?.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setMarkedQuery(res?.data);
        setApiStatus(API_STATUS.SUCCESS);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setApiStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingQueryStatus(
        intl.formatMessage({
          id: "label.generalGetApiFailedErrorMessage",
        })
      );
      onErrorCallBack &&
        onErrorCallBack(
          intl.formatMessage({
            id: "label.generalGetApiFailedErrorMessage",
          })
        );
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      if (err?.response?.data?.message) {
        setErrorWhileUpdatingQueryStatus(err?.response?.data?.message);
        onErrorCallBack && onErrorCallBack(err?.response?.data?.message);
        return;
      }
      setErrorWhileUpdatingQueryStatus(
        intl.formatMessage({
          id: "label.generalGetApiFailedErrorMessage",
        })
      );
      onErrorCallBack &&
        onErrorCallBack(
          intl.formatMessage({
            id: "label.generalGetApiFailedErrorMessage",
          })
        );
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;
  return {
    errorWhileUpdatingQueryStatus,
    markedQuery,
    markedQueryAsAnswered,
    isError,
    isLoading,
    isSuccess,
    apiStatus,
    setErrorWhileUpdatingQueryStatus,
  };
};

export default useMarkedQueryAsAnweredApi;
