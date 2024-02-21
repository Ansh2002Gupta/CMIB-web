import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import {
    CLOSE,
  CORE_ROUTE,
  TICKET_LIST,
} from "../../../constant/apiEndpoints";

const useCloseTicketApi = () => {
  const intl = useIntl();
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [closeTicketData, setCloseTicketData] = useState(null);
  const [errorWhileClosingTicket, setErrorWhileClosingTicket] = useState("");

  const closeTicket = async ({
    ticketId,
    onSuccessCallback,
    onErrorCallback,
  }) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      errorWhileClosingTicket && setErrorWhileClosingTicket("");
      const url = CORE_ROUTE + TICKET_LIST + `/${ticketId}` + CLOSE;
      const res = await Http.patch(url);
      if (res?.code === STATUS_CODES.SUCCESS_STATUS) {
        setCloseTicketData(res?.data);
        setApiStatus(API_STATUS.SUCCESS);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setApiStatus(API_STATUS.ERROR);
      setErrorWhileClosingTicket(
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
        setErrorWhileClosingTicket(err?.response?.data?.message);
        onErrorCallback && onErrorCallback(err?.response?.data?.message);
        return;
      }
      setErrorWhileClosingTicket(
        intl.formatMessage({
          id: "label.generalGetApiFailedErrorMessage",
        })
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
    errorWhileClosingTicket,
    closeTicketData,
    closeTicket,
    isError,
    isLoading,
    isSuccess,
    apiStatus,
    setErrorWhileClosingTicket,
  };
};

export default useCloseTicketApi;
