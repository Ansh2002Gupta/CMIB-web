import React, { useState } from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { PAGINATION_PROPERTIES } from "../../constant/constant";
import ScheduledInterviewsListingTable from "../../containers/ScheduledInterviewsListingTable";

const ScheduledInterviewListingView = ({jobId}) => {
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
  const [searchedValue, setSearchedValue] = useState(
    urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY) || ""
  );

  return (
    <TwoRow
      topSection={<></>}
      isBottomFillSpace
      bottomSection={
        <ScheduledInterviewsListingTable
          {...{
            jobId,
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

export default ScheduledInterviewListingView;
