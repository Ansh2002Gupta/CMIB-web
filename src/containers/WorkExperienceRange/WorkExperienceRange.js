import React from "react";
import { useIntl } from "react-intl";

import WorkExperienceRangeTemplate from "./WorkExperienceRangeTemplate";

const WorkExperienceRange = ({
  addExperience,
  errors,
  experience,
  experienceErrors,
  handleError,
  setAddExperience,
  setErrors,
  setExperience,
  setExperienceErrors,
  validate,
}) => {
  const intl = useIntl();

  return (
    <WorkExperienceRangeTemplate
      {...{
        addExperience,
        errors,
        experience,
        experienceErrors,
        handleError,
        intl,
        setAddExperience,
        setErrors,
        setExperience,
        setExperienceErrors,
        validate,
      }}
    />
  );
};

export default WorkExperienceRange;
