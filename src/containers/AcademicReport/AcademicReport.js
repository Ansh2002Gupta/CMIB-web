import React from "react";
import { ThreeRow } from 'core/layouts';
import SubHeader from "../../components/SubHeader";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";

function AcademicReportContainer(props) {
  return (
    <ThreeRow
      topSection={<SubHeader />}
      middleSection={<BarChart />}
      bottomSection={<PieChart />}
    />
  );
}
export default AcademicReportContainer;
