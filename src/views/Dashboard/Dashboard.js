import React from "react";
import { TwoRow } from "core/layouts";

import ContentHeader from "../../containers/ContentHeader";

function DashboardView() {
  return (
    <TwoRow
      topSection={<ContentHeader headerText="Dashboard" />}
      bottomSection={<></>}
    />
  );
}

export default DashboardView;
