import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import QueriesListingContent from "../../containers/QueriesListingContent";
import QueriesListingHeader from "../../containers/QueriesListingHeader";
import { VALID_CONTACT_US_TABS_ID } from "../../constant/constant";

const ACTIVE_TAB = "activeTab";

const QueriesListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentActiveTab, setCurrentActiveTab] = useState(
    +searchParams.get(ACTIVE_TAB) || 1
  );

  useEffect(() => {
    const currentTab = searchParams.get(ACTIVE_TAB);
    if (
      !currentTab ||
      isNaN(currentTab) ||
      !VALID_CONTACT_US_TABS_ID.includes(currentTab)
    ) {
      setSearchParams((prev) => {
        prev.set(ACTIVE_TAB, 1);
        return prev;
      });
      return;
    }
    setSearchParams((prev) => {
      prev.set(ACTIVE_TAB, currentActiveTab);
      return prev;
    });
  }, [currentActiveTab]);

  return (
    <TwoRow
      topSection={
        <QueriesListingHeader {...{ currentActiveTab, setCurrentActiveTab }} />
      }
      isBottomFillSpace
      bottomSection={<QueriesListingContent {...{ currentActiveTab }} />}
    />
  );
};

export default QueriesListing;
