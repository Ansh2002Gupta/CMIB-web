import React from "react";

import useResponsive from "../../core/hooks/useResponsive";
import { TwoColumn, TwoRow } from "../../core/layouts";

import ChatSection from "../../containers/ChatSection";
import IconHeader from "../../containers/IconHeader";
import TicketDetails from "../../containers/TicketDetails";
import styles from "./TicketScreen.module.scss";
import useFetch from "../../core/hooks/useFetch";
import { CORE_ROUTE, REPLIES, TICKET_LIST } from "../../constant/apiEndpoints";

const TicketChatScreen = () => {
  const responsive = useResponsive();
  const id = 1;
  const {
    data: ticketsRepliesData,
    error,
    fetchData,
    isError,
    isLoading,
  } = useFetch({
    url: CORE_ROUTE + TICKET_LIST + `/${id}` + REPLIES,
  });

  const {
    data,
    error: errorWhileFetchingTicketData,
    fetchData: fetchTicketData,
    isError: isGetErrorWhileFetchingTicket,
    isLoading: isFetchingTicketData,
  } = useFetch({
    url: CORE_ROUTE + TICKET_LIST + `/${id}`,
  });

  return (
    <TwoRow
      className={styles.mainContainer}
      bottomSectionStyle={{ flex: 1 }}
      topSection={<IconHeader {...{ fetchData, id }} ticketData={data} />}
      bottomSection={
        responsive.isMd ? (
          <TwoColumn
            className={styles.bottomContainer}
            leftSectionStyle={{ flex: 5 }}
            rightSectionStyle={{ flex: 2 }}
            leftSection={
              <ChatSection
                data={ticketsRepliesData}
                {...{ fetchData, isError, isLoading, error, id }}
              />
            }
            rightSection={
              <TicketDetails
                {...{
                  data,
                  error: errorWhileFetchingTicketData,
                  fetchData: fetchTicketData,
                  isError: isGetErrorWhileFetchingTicket,
                  isLoading: isFetchingTicketData,
                }}
              />
            }
          />
        ) : (
          <ChatSection
            data={ticketsRepliesData}
            {...{ fetchData, isError, isLoading, error }}
          />
        )
      }
    />
  );
};

export default TicketChatScreen;
