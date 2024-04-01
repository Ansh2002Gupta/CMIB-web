import React, { useState } from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import TicketListingHeader from "../../containers/TicketListingHeader";
import TicketTable from "../../containers/TicketTable/TicketTable";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { PAGINATION_PROPERTIES } from "../../constant/constant";

const TicketListing = () => {
  const [current, setCurrent] = useState(
    getValidPageNumber(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE)
    )
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    )
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
          }}
        />
      }
    />
  );
};

export default TicketListing;
