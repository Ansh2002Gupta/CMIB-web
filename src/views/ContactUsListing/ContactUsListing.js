import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ContactUsListingContent from "../../containers/ContactUsListingContent";
import ContactUsListingHeader from "../../containers/ContactUsListingHeader";
import useQueriesListingApi from "../../services/api-services/Queries/useQueriesListingApi";
import useTicketListingApi from "../../services/api-services/Tickets/useTicketsListingApi";
import {
  ACTIVE_TAB,
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_CONTACT_US_TABS_ID,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";

const ContactUsListing = () => {
  const [searchParams] = useSearchParams();
  const [currentActiveTab, setCurrentActiveTab] = useState(
    getCurrentActiveTab()
  );
  const [current, setCurrent] = useState(getValidPageNumber());
  const [pageSize, setPageSize] = useState(getValidPageSize());

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

  function getCurrentActiveTab() {
    let validCurrentActiveTab = searchParams.get(ACTIVE_TAB);
    if (
      isNaN(validCurrentActiveTab) ||
      !VALID_CONTACT_US_TABS_ID.includes(validCurrentActiveTab)
    ) {
      validCurrentActiveTab = '1';
    }

    return validCurrentActiveTab;
  }

  function getValidPageNumber() {
    let validCurrentPage = +searchParams.get(
      PAGINATION_PROPERTIES.CURRENT_PAGE
    );
    if (isNaN(validCurrentPage) || validCurrentPage <= 0) {
      validCurrentPage = 1;
    }

    return validCurrentPage;
  }

  function getValidPageSize() {
    let validPageSize = +searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE);
    if (
      isNaN(validPageSize) ||
      !VALID_ROW_PER_OPTIONS.includes(validPageSize)
    ) {
      validPageSize = DEFAULT_PAGE_SIZE;
    }
    return validPageSize;
  }

  return (
    <TwoRow
      topSection={
        <ContactUsListingHeader
          {...{
            currentActiveTab,
            setCurrentActiveTab,
            setCurrent,
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
            setCurrent,
            setPageSize,
            current,
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
