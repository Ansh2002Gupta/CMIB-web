import React, { useState } from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import QueriesListingContent from "../../containers/QueriesListingContent";
import QueriesListingHeader from "../../containers/QueriesListingHeader";
import { useSearchParams } from "react-router-dom";

const ACTIVE_TAB = "activeTab";

const QueriesListing = () => {
  const [searchParams,] = useSearchParams();
  const [currentActiveTab, setCurrentActiveTab] = useState(
    +searchParams.get(ACTIVE_TAB) || 1
  );

  return (
    <TwoRow
      topSection={
        <QueriesListingHeader {...{ currentActiveTab, setCurrentActiveTab }} />
      }
      isBottomFillSpace
      bottomSection={
        <QueriesListingContent {...{ currentActiveTab, setCurrentActiveTab }} />
      }
    />
  );
};

export default QueriesListing;
