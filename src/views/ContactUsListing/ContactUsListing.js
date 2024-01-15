import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ContactUsListingContent from "../../containers/ContactUsListingContent";
import ContactUsListingHeader from "../../containers/ContactUsListingHeader";
import useQueriesListingApi from "../../services/api-services/Queries/useQueriesListingApi";
import useTicketListingApi from "../../services/api-services/Tickets/useTicketsListingApi";
import {
  ACTIVE_TAB,
  PAGINATION_PROPERTIES,
  VALID_CONTACT_US_TABS_ID,
} from "../../constant/constant";
import {
  getCurrentActiveTab,
  getValidPageNumber,
  getValidPageSize,
} from "../../constant/utils";

const ContactUsListing = () => {
  const [searchParams] = useSearchParams();
  const [currentActiveTab, setCurrentActiveTab] = useState(
    getCurrentActiveTab(VALID_CONTACT_US_TABS_ID, searchParams, ACTIVE_TAB)
  );
  const [currentPage, setCurrentPage] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );

  const {
    isSuccess: areQueriesFetchedSuccessfully,
    isFetchingQueries,
    errorWhileFetchingQueries,
    queriesList,
    fetchQueries,
    metaData: queriesMetaData,
  } = useQueriesListingApi();

  const {
    isSuccess: areTicketsFetchedSuccesfully,
    isFetchingTickets,
    errorWhileFetchingTickets,
    ticketList,
    fetchTickets,
    metaData: ticketsMetaData,
  } = useTicketListingApi();

  return (
    <TwoRow
      topSection={
        <ContactUsListingHeader
          {...{
            currentActiveTab,
            setCurrentActiveTab,
            setCurrentPage,
            setPageSize,
          }}
          queryListingProps={{
            areQueriesFetchedSuccessfully,
            isFetchingQueries,
            errorWhileFetchingQueries,
            queriesList,
            fetchQueries,
            queriesMetaData,
          }}
          ticketListingProps={{
            areTicketsFetchedSuccesfully,
            isFetchingTickets,
            errorWhileFetchingTickets,
            ticketList,
            fetchTickets,
            ticketsMetaData,
          }}
        />
      }
      isBottomFillSpace
      bottomSection={
        <ContactUsListingContent
          {...{
            currentActiveTab,
            setCurrentActiveTab,
            setCurrentPage,
            setPageSize,
            current: currentPage,
            pageSize,
          }}
          queryListingProps={{
            areQueriesFetchedSuccessfully,
            isFetchingQueries,
            errorWhileFetchingQueries,
            queriesList,
            fetchQueries,
            queriesMetaData,
          }}
          ticketListingProps={{
            areTicketsFetchedSuccesfully,
            isFetchingTickets,
            errorWhileFetchingTickets,
            ticketList,
            fetchTickets,
            ticketsMetaData,
          }}
        />
      }
    />
  );
};

export default ContactUsListing;
