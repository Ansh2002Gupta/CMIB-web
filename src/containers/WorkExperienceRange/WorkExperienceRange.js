import React from "react";
import { useIntl } from "react-intl";

import WorkExperienceRangeTemplate from "./WorkExperienceRangeTemplate";

const WorkExperienceRange = ({
  experience,
  experienceErrors,
  setExperience,
  setExperienceErrors,
}) => {
  const intl = useIntl();

  return (
    <WorkExperienceRangeTemplate
      {...{
        experience,
        experienceErrors,
        intl,
        setExperience,
        setExperienceErrors,
      }}
    />
  );
};

export default WorkExperienceRange;
