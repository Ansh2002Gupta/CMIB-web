import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import {
  ASSIGN,
  CORE_ROUTE,
  TICKET_LIST,
} from "../../../constant/apiEndpoints";

const useTicketAssignApi = () => {
  const intl = useIntl();
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [assignTicketData, setAssignTicketData] = useState(null);
  const [errorWhileAssigningTicket, setErrorWhileAssigningTicket] =
    useState("");

  const handleAssignTicket = async ({
    onSuccessCallback,
    payload,
    onErrorCallback,
  }) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      setAssignTicketData(null);
      errorWhileAssigningTicket && setErrorWhileAssigningTicket("");
      const url = CORE_ROUTE + TICKET_LIST + ASSIGN;
      const res = await Http.patch(url, payload);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        setAssignTicketData(res?.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setApiStatus(API_STATUS.ERROR);
      setErrorWhileAssigningTicket(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileAssigningTicket(err.response?.data?.message);
        onErrorCallback && onErrorCallback(err.response?.data?.message);
        return;
      }
      setErrorWhileAssigningTicket(
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
    assignTicketData,
    errorWhileAssigningTicket,
    apiStatus,
    handleAssignTicket,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileAssigningTicket,
  };
};

export default useTicketAssignApi;
