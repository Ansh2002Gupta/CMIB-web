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
    isHtmlElement: true,
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
    isYear: true,
  },
  {
    key: "max_experience",
    label: "label.maximumExperience",
    placeholder: "label.maximumExperience",
    isYear: true,
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
  {
    key: "location",
    label: "label.jobLocation",
    placeholder: "label.jobLocation",
    isCapitalize: true,
    isArray: true,
    isLocation: true,
  },
  {
    key: "functional_areas",
    label: "label.functionalAreas",
    placeholder: "label.functionalAreas",
    isArray: true,
    isObject: true,
    fullWidth: true,
  },
  {
    key: "company_details",
    label: "label.shortProfileOfTheCompany",
    placeholder: "label.shortProfileOfTheCompany",
    isCapitalize: true,
    fullWidth: true,
  },
  {
    key: "website",
    label: "label.website",
    placeholder: "label.website",
    isWebsite: true,
  },
  {
    key: "nature_of_suppliers",
    label: "label.natureOfSupplier",
    placeholder: "label.natureOfSupplier",
    isCapitalize: true,
  },
  {
    key: "company_type",
    label: "label.companyType",
    placeholder: "label.companyType",
    isCapitalize: true,
  },
  {
    key: "gender_preference",
    label: "label.genderPreference",
    placeholder: "label.genderPreference",
    isCapitalize: true,
  },
  {
    key: "category_preference",
    label: "label.categoryPreference",
    placeholder: "label.categoryPreference",
    isCapitalize: true,
  },
  {
    key: "essential_qualification",
    label: "label.essentialQualification",
    placeholder: "label.essentialQualification",
    isCapitalize: true,
    fullWidth: true,
  },
  {
    key: "desired_qualification",
    label: "label.desiredQualification",
    placeholder: "label.desiredQualification",
    isCapitalize: true,
    fullWidth: true,
  },
  {
    key: "opening_date",
    label: "label.jobOpeningDate",
    placeholder: "label.jobOpeningDate",
    isCapitalize: true,
    isDate: true,
  },
  {
    key: "closing_date",
    label: "label.jobClosingDate",
    placeholder: "label.jobClosingDate",
    isCapitalize: true,
    isDate: true,
    remainWidth: true,
  },
  {
    key: "is_salary_negotiable",
    label: "label.salaryNegotiable",
    placeholder: "label.salaryNegotiable",
    isCapitalize: true,
    isToggle: true,
  },
  {
    key: "min_salary",
    label: "label.minimumSalary",
    placeholder: "label.minimumSalary",
  },
  {
    key: "max_salary",
    label: "label.maximumSalary",
    placeholder: "label.maximumSalary",
  },

  {
    key: "vacancy",
    label: "label.numberOfVacancies",
    placeholder: "label.numberOfVacancies",
    fullWidth: true,
  },
  {
    key: "mode",
    label: "label.modeOfWork",
    placeholder: "label.modeOfWork",
    isCapitalize: true,
  },
  {
    key: "flexi_hours",
    label: "label.flexiHours",
    placeholder: "label.flexiHours",
    isCapitalize: true,
    isToggle: true,
  },
  {
    key: "service_type",
    label: "label.fullPartTime",
    placeholder: "label.fullPartTime",
    isCapitalize: true,
  },
  {
    key: "status",
    label: "label.jobStatus",
    placeholder: "label.jobStatus",
    isCapitalize: true,
    isStatus: true,
  },
];

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((item) => {
    if (item?.isImage || item?.isToggle || item?.isStatus || item?.isYear) {
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
