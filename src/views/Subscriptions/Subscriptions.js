import React from "react";

import TwoRow from "../../core/layouts/TwoRow";

import AddSubscription from "../../containers/AddSubscription/AddSubscription";
import ContentHeader from "../../containers/ContentHeader";

const Subscriptions = () => {
  return (
    <TwoRow
      topSection={
        <ContentHeader
          headerText="Manage Subscriptions"
          rightSection={<AddSubscription />}
        />
      }
      bottomSection={<></>}
    />
  );
};

export default Subscriptions;
