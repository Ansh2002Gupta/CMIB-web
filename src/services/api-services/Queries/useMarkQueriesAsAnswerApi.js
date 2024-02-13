import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import {
  ADMIN_ROUTE,
  MARK_AS_ANSWER_END_POINT,
  QUERIES_END_POINT,
} from "../../../constant/apiEndpoints";

const useMarkQueriesAsAnswerApi = () => {
  const intl = useIntl();
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [markingQueryAsAnswerData, setMarkingQueryAsAnswerData] =
    useState(null);
  const [
    errorWhileMarkingQueryAsAnswered,
    setErrorWhileMarkingQueryAsAnswered,
  ] = useState("");

  const handleMarkQueriesAsAnswered = async ({
    onSuccessCallback,
    payload,
    onErrorCallback,
  }) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      setMarkingQueryAsAnswerData(null);
      errorWhileMarkingQueryAsAnswered &&
        setErrorWhileMarkingQueryAsAnswered("");
      const url = ADMIN_ROUTE + QUERIES_END_POINT + MARK_AS_ANSWER_END_POINT;
      const res = await Http.patch(url, payload);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        setMarkingQueryAsAnswerData(res?.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setApiStatus(API_STATUS.ERROR);
      setErrorWhileMarkingQueryAsAnswered(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileMarkingQueryAsAnswered(err.response?.data?.message);
        onErrorCallback && onErrorCallback(err.response?.data?.message);
        return;
      }
      setErrorWhileMarkingQueryAsAnswered(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;
  return {
    markingQueryAsAnswerData,
    errorWhileMarkingQueryAsAnswered,
    apiStatus,
    handleMarkQueriesAsAnswered,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileMarkingQueryAsAnswered,
  };
};

export default useMarkQueriesAsAnswerApi;
