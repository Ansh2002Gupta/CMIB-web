import React from "react";
import WorkExperienceRangeTemplate from "./WorkExperienceRangeTemplate";
import { useIntl } from "react-intl";

const WorkExperienceRange = ({ experience, setExperience }) => {
  const intl = useIntl();

  return (
    <WorkExperienceRangeTemplate {...{ experience, intl, setExperience }} />
  );
};

export default WorkExperienceRange;
