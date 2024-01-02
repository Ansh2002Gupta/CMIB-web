import React from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";
import QueriesListingHeader from "../../containers/QueriesListingHeader";
import QueriesListingContent from "../../containers/QueriesListingContent";

const QueriesListing = () => {
  return (
    <TwoRow
      topSection={<QueriesListingHeader />}
      isBottomFillSpace
      bottomSection={<QueriesListingContent />}
    />
  );
};

export default QueriesListing;
