import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import TicketListingHeader from "../../containers/TicketListingHeader";
import TicketTable from "../../containers/TicketTable/TicketTable";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { PAGINATION_PROPERTIES } from "../../constant/constant";

const TicketListing = () => {
  const [searchParams] = useSearchParams();
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
      topSection={<TicketListingHeader />}
      isBottomFillSpace
      bottomSection={
        <TicketTable
          {...{
            current,
            pageSize,
            setCurrent,
            setPageSize,
            searchedValue,
            setSearchedValue,
          }}
        />
      }
    />
  );
};

export default TicketListing;
