import React, { useState } from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ContactUsListingContent from "../../containers/ContactUsListingContent";
import ContactUsListingHeader from "../../containers/ContactUsListingHeader";
import { useSearchParams } from "react-router-dom";

const ACTIVE_TAB = "activeTab";

const ContactUsListing = () => {
  const [searchParams] = useSearchParams();
  const [currentActiveTab, setCurrentActiveTab] = useState(
    +searchParams.get(ACTIVE_TAB) || 1
  );

  return (
    <TwoRow
      topSection={
        <ContactUsListingHeader
          {...{ currentActiveTab, setCurrentActiveTab }}
        />
      }
      isBottomFillSpace
      bottomSection={
        <ContactUsListingContent
          {...{ currentActiveTab, setCurrentActiveTab }}
        />
      }
    />
  );
};

export default ContactUsListing;
