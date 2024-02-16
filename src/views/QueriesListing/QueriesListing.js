import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import QueriesListingHeader from "../../containers/QueriesListingHeader";
import QueryTable from "../../containers/QueryTable/QueryTable";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { PAGINATION_PROPERTIES } from "../../constant/constant";

const QueriesListing = () => {
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
