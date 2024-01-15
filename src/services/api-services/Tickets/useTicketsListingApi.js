import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { ADMIN_ROUTE, TICKET_LIST } from "../../../constant/apiEndpoints";
import { API_STATUS } from "../../../constant/constant";
import { TICKET_DATA_LIST } from "../../../dummyData";

const useTicketListingApi = () => {
  const intl = useIntl();

  const [isFetchingTickets, setIsFetchingTickets] = useState(false);
  const [errorWhileFetchingTickets, setErrorWhileFetchingTickets] =
    useState("");
  const [ticketList, setTicketList] = useState(null);
  const [ticketsFetchingAPIStatus, setTicketsFetchingAPIStatus] = useState(
    API_STATUS.IDLE
  );
  const [metaData, setMetaData] = useState(null);

  const fetchTickets = async (
    pageSize,
    currentPage,
    searchQuery,
    onSuccessCallback
  ) => {
    setIsFetchingTickets(true);
    setErrorWhileFetchingTickets("");
    setTicketsFetchingAPIStatus(API_STATUS.LOADING);
    try {
      let url = `${ADMIN_ROUTE}${TICKET_LIST}?perPage=${pageSize}&page=${currentPage}`;
      if (searchQuery) {
        url = url + `&q=${searchQuery}`;
      }
      const apiOptions = {
        headers: {
          Accept: "application/json",
        },
      };
      const res = await Http.get(url, apiOptions);
      setIsFetchingTickets(false);
      if (res.error) {
        setTicketsFetchingAPIStatus(API_STATUS.ERROR);
        setErrorWhileFetchingTickets(res?.message);
        return;
      }
      const { meta } = res?.data;
      // TODO: Remove dummy data once we start getting data from backend
      //   setTicketList(res?.data?.records);
      // setMetaData(meta);
      const data = TICKET_DATA_LIST.slice(
        (currentPage - 1) * pageSize,
        pageSize * currentPage
      );
      setTicketList(data);
      setMetaData({ total: TICKET_DATA_LIST.length });
      setTicketsFetchingAPIStatus(API_STATUS.SUCCESS);
      onSuccessCallback && onSuccessCallback();
    } catch (err) {
      setTicketsFetchingAPIStatus(API_STATUS.ERROR);
      setIsFetchingTickets(false);
      if (err?.response?.data?.message) {
        setErrorWhileFetchingTickets(err?.response?.data?.message);
      }
      setErrorWhileFetchingTickets(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isSuccess = ticketsFetchingAPIStatus === API_STATUS.SUCCESS;
  const isError = ticketsFetchingAPIStatus === API_STATUS.ERROR;

  return {
    isSuccess,
    isError,
    isFetchingTickets,
    errorWhileFetchingTickets,
    ticketList,
    setTicketList,
    ticketsFetchingAPIStatus,
    fetchTickets,
    metaData,
  };
};

export default useTicketListingApi;
