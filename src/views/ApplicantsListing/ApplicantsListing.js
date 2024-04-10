import React, { useState } from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { PAGINATION_PROPERTIES } from "../../constant/constant";
import ApplicantListingTable from "../../containers/ApplicantListingTable";

const ApplicantListingView = ({ jobId }) => {
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
    <ApplicantListingTable
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
  );
};

export default ApplicantListingView;
