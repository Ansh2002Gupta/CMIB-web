import React from "react";
import WorkExperienceRangeTemplate from "./WorkExperienceRangeTemplate"
import { useIntl } from "react-intl";

const WorkExperienceRange = () => {
    const intl = useIntl();

    return <WorkExperienceRangeTemplate intl={intl}/>
}

export default WorkExperienceRange;