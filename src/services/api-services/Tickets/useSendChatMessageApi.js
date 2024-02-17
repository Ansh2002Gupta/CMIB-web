import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import {
  CORE_ROUTE,
  REPLIES,
  TICKET_LIST,
} from "../../../constant/apiEndpoints";

const useSendChatMessageApi = () => {
  const intl = useIntl();
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [sendMessageData, setSendMessageData] = useState(null);
  const [errorWhileSendingMessage, setErrorWhileSendingMessage] = useState("");

  const sendMessage = async ({
    ticketId,
    payload,
    onSuccessCallback,
    onErrorCallback,
  }) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      errorWhileSendingMessage && setErrorWhileSendingMessage("");
      const url = CORE_ROUTE + TICKET_LIST + `/${ticketId}` + REPLIES;
      const res = await Http.post(url, payload);
      if (res?.code === STATUS_CODES.SUCCESS_STATUS) {
        setSendMessageData(res?.data);
        setApiStatus(API_STATUS.SUCCESS);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setApiStatus(API_STATUS.ERROR);
      setErrorWhileSendingMessage(
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
      setApiStatus(API_STATUS.ERROR);
      if (err?.response?.data?.message) {
        setErrorWhileSendingMessage(err?.response?.data?.message);
        onErrorCallback && onErrorCallback(err?.response?.data?.message);
        return;
      }
      setErrorWhileSendingMessage(
        intl.formatMessage({
          id: "label.generalGetApiFailedErrorMessage",
        })
      );
      onErrorCallback &&
        onErrorCallback( intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage"}))
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;
  return {
    errorWhileSendingMessage,
    sendMessageData,
    sendMessage,
    isError,
    isLoading,
    isSuccess,
    apiStatus,
    setErrorWhileSendingMessage,
  };
};

export default useSendChatMessageApi;
