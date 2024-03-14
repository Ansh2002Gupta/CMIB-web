import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import TwoRow from "../../core/layouts/TwoRow";

import ContentHeader from "../../containers/ContentHeader";
import { ADD_SUBSCRIPTIONS } from "../../routes/routeNames";

const Subscriptions = () => {
  const navigate = useNavigate();

  const handleAddSubscription = () => {
    navigate(`${ADD_SUBSCRIPTIONS}`);
  };
  return (
    <TwoRow
      topSection={
        <ContentHeader
          headerText="Manage Subscriptions"
          rightSection={
            <Button onClick={handleAddSubscription}>Add Subscription</Button>
          }
        />
      }
      bottomSection={<></>}
    />
  );
};

export default Subscriptions;
