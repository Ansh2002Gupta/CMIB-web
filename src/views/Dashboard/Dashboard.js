import React from "react";
import { TwoRow } from "core/layouts";

import AcademicReportContainer from "../../containers/AcademicReport";
import TabOptions from "../../components/TabOptions";

function DashboardView(props) {
  return (
    <TwoRow
      topSection={<TabOptions />}
      bottomSection={<AcademicReportContainer />}
    />
  );
}

export default DashboardView;
