export const JOB_DETAILS_TYPE_INFORMATION = (
  workMode,
  flexiHours,
  fullTimePartTime,
  jobStatus
) => {
  return [
    {
      id: 1,
      headingIntl: "workMode",
      label: "workMode",
      value: workMode,
    },
    {
      id: 2,
      headingIntl: "flexiHours",
      label: "flexiHours",
      value: flexiHours,
    },
    {
      id: 3,
      headingIntl: "fullTimePartTime",
      label: "fullTimePartTime",
      value: fullTimePartTime,
    },
    {
      id: 4,
      headingIntl: "jobStatus",
      label: "jobStatus",
      value: jobStatus,
    },
  ];
};

export const JOB_DETAILS_SALARY_DETAILS = (
  salaryNegotiable,
  maximumSalaryAnnual,
  maximumSalary
) => {
  return [
    {
      id: 1,
      headingIntl: "salaryNegotiable",
      value: salaryNegotiable,
    },
    {
      id: 2,
      headingIntl: "maximumSalaryAnnualCTC",
      value: maximumSalaryAnnual,
    },
    {
      id: 3,
      headingIntl: "maximumSalary",
      value: maximumSalary,
    },
  ];
};

export const JOB_DETAILS_JOB_OPENING_CLOSING_DETAILS = (
  jobOpeningDate,
  jobClosingDate
) => {
  return [
    {
      id: 1,
      headingIntl: "jobOpeningDate",
      value: jobOpeningDate,
    },
    {
      id: 2,
      headingIntl: "jobClosingDate",
      value: jobClosingDate,
    },
  ];
};

export const OTHER_DETAILS_FEILDS = (
  website,
  nature_of_supplier,
  companyType,
  genderPreferances,
  categoryPreferances
) => {
  return [
    {
      id: 1,
      headingIntl: "website",
      value: website,
    },
    {
      id: 2,
      headingIntl: "natureOfSupplier",
      value: nature_of_supplier,
    },
    {
      id: 3,
      headingIntl: "companyType",
      value: companyType,
    },
    {
      id: 4,
      headingIntl: "genderPreferances",
      value: genderPreferances,
    },
    {
      id: 5,
      headingIntl: "categoryPreferances",
      value: categoryPreferances,
    },
  ];
};

export const JOB_DETAILS_JOB_DESCRIPTION = (
  jobType,
  urgentJob,
  industry,
  minimumExperience,
  maximumExperience,
  nationality,
  designation,
  jobLocation
) => {
  return [
    {
      id: 1,
      headingIntl: "jobType",
      value: jobType,
    },
    {
      id: 2,
      headingIntl: "urgentJob",
      value: urgentJob,
    },
    {
      id: 3,
      headingIntl: "industry",
      value: industry,
    },
    {
      id: 4,
      headingIntl: "minimumExperience",
      value: minimumExperience,
    },
    {
      id: 5,
      headingIntl: "maximumExperience",
      value: maximumExperience,
    },
    {
      id: 6,
      headingIntl: "nationality",
      value: nationality,
    },
    {
      id: 7,
      headingIntl: "designation",
      value: designation,
    },
    {
      id: 8,
      headingIntl: "jobLocation",
      value: jobLocation,
    },
  ];
};
