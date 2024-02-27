import React from "react";
import { useIntl } from "react-intl";

import WorkExperienceRangeTemplate from "./WorkExperienceRangeTemplate";

const WorkExperienceRange = ({ experience, setExperience }) => {
  const intl = useIntl();

  return (
    <WorkExperienceRangeTemplate {...{ experience, intl, setExperience }} />
  );
};

export default WorkExperienceRange;
