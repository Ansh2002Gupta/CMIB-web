import React, { useState } from "react";
import { useIntl } from "react-intl";

const job_details = () => [
  {
    key: "company_name",
    label: "label.companyName",
    placeholder: "label.companyName",
    isCapitalize: true,
    fullWidth: true,
  },

  {
    key: "approved",
    label: "label.approvedByAdmin",
    placeholder: "label.approvedByAdmin",
    isCapitalize: true,
    isToggle: true,
  },
  {
    key: "jobId",
    label: "label.jobId",
    placeholder: "label.jobId",
  },
  {
    key: "summary",
    label: "label.jobSummary",
    placeholder: "label.jobSummary",
    isCapitalize: true,
    fullWidth: true,
  },
  {
    key: "detail",
    label: "label.jobDetails",
    placeholder: "label.jobDetails",
    isCapitalize: true,
    fullWidth: true,
  },
  {
    key: "type",
    label: "label.jobType",
    placeholder: "label.jobType",
  },
  {
    key: "is_urgent",
    label: "label.urgentJob",
    placeholder: "label.urgentJob",
    isToggle: true,
  },
  {
    key: "industry",
    label: "label.industry",
    placeholder: "label.industry",
  },
  {
    key: "min_experience",
    label: "label.minimumExperience",
    placeholder: "label.minimumExperience",
  },
  {
    key: "max_experience",
    label: "label.maximumExperience",
    placeholder: "label.maximumExperience",
  },
  {
    key: "nationality",
    label: "label.nationality",
    placeholder: "label.nationality",
    isCapitalize: true,
  },
  {
    key: "designation",
    label: "label.designation",
    placeholder: "label.designation",
    isCapitalize: true,
  },
  //   {
  //     key: "location",
  //     label: "label.jobLocation",
  //     placeholder: "label.jobLocation",
  //     isCapitalize: true,
  //     isArray: true,
  //   },
  //   {
  //     key: "functional_areas",
  //     label: "label.functionalAreas",
  //     placeholder: "label.functionalAreas",
  //     isCapitalize: true,
  //     isArray: true,
  //     isChip: true,
  //     fullWidth: true,
  //   },
  {
    key: "company_details",
    label: "label.shortProfileOfTheCompany",
    placeholder: "label.shortProfileOfTheCompany",
    isCapitalize: true,
    fullWidth: true,
  },
];

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((item) => {
    if (item?.isImage) {
      return {
        ...item,
        value: state?.[item?.key],
      };
    }
    return {
      ...item,
      value: !isEditable && !state?.[item?.key] ? "--" : state?.[item?.key],
    };
  });
};

export const usePostJobDetails = ({ state, isEditable }) => {
  const intl = useIntl();
  const [job_details_state, setJob_details_state] = useState(job_details);

  return {
    job_details_data: addValueOnField({
      state,
      details: job_details_state,
      isEditable,
    }),
  };
};
