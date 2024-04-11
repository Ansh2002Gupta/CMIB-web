import React, { useState } from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ManagePaymentsHeader from "../../containers/ManagePaymentsHeader/ManagePaymentsHeader";
import PaymentTable from "../../containers/PaymentTable/PaymentTable";
import { urlService } from "../../Utils/urlService";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { PAGINATION_PROPERTIES } from "../../constant/constant";

const PaymentListing = () => {
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
      topSection={<ManagePaymentsHeader />}
      isBottomFillSpace
      bottomSection={
        <PaymentTable
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

export default PaymentListing;
