import React from "react";
import TwoRow from "../../core/layouts/TwoRow";
import ContentHeader from "../../containers/ContentHeader";

const Configurations = () => {
  return (
    <TwoRow
      topSection={<ContentHeader headerText="Manage Configurations" />}
      bottomSection={<></>}
    />
  );
};

export default Configurations;
