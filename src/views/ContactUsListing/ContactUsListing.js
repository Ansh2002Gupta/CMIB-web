import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ContactUsListingHeader from "../../containers/ContactUsListingHeader";
import QueryTable from "../../containers/ContactUsListingContent/QueryTable";
import TicketTable from "../../containers/ContactUsListingContent/TicketTable/TicketTable";
import TicketChatScreen from "../TicketChatScreen";
import {
  getCurrentActiveTab,
  getValidPageNumber,
  getValidPageSize,
} from "../../constant/utils";
import {
  ACTIVE_TAB,
  PAGINATION_PROPERTIES,
  VALID_CONTACT_US_TABS_ID,
} from "../../constant/constant";

const ContactUsListing = () => {
  const [searchParams] = useSearchParams();
  const [currentActiveTab, setCurrentActiveTab] = useState(
    getCurrentActiveTab(searchParams.get(ACTIVE_TAB), VALID_CONTACT_US_TABS_ID)
  );
  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );
  const [searchedValue, setSearchedValue] = useState(
    searchParams.get(PAGINATION_PROPERTIES.SEARCH_QUERY) || ""
  );

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
        />
      }
      isBottomFillSpace
      bottomSection={
        currentActiveTab === "1" ? (
          // <TicketTable
          //   {...{
          //     current,
          //     currentActiveTab,
          //     pageSize,
          //     setCurrent,
          //     setPageSize,
          //     searchedValue,
          //     setSearchedValue,
          //   }}
          // />
          <TicketChatScreen />
        ) : (
          <QueryTable
            {...{
              current,
              currentActiveTab,
              pageSize,
              setCurrent,
              setPageSize,
              searchedValue,
              setSearchedValue,
            }}
          />
        )
      }
    />
  );
};

export default ContactUsListing;
