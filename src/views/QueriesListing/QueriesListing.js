import React, { useState } from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import QueriesListingHeader from "../../containers/QueriesListingHeader";
import QueryTable from "../../containers/QueryTable/QueryTable";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { PAGINATION_PROPERTIES } from "../../constant/constant";

const QueriesListing = () => {
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
      topSection={<QueriesListingHeader />}
      isBottomFillSpace
      bottomSection={
        <QueryTable
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

export default QueriesListing;
