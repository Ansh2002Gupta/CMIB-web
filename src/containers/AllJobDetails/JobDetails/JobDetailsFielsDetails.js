export const JOB_DETAILS_TYPE_INFORMATION = (
  workMode,
  flexiHours,
) => {
  return [
    {
      id: 1,
      headingIntl: "workMode",
      label: "workMode",
      value: workMode,
      isMandatory: false,
    },
    {
      id: 2,
      headingIntl: "flexiHours",
      label: "flexiHours",
      value: flexiHours,
      isMandatory: false,
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
      isMandatory: false,
    },
    {
      id: 2,
      headingIntl: "maximumSalaryAnnualCTC",
      value: maximumSalaryAnnual,
      isMandatory: false,
    },
    {
      id: 3,
      headingIntl: "maximumSalary",
      value: maximumSalary,
      isMandatory: false,
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
      isMandatory: true,
    },
    {
      id: 2,
      headingIntl: "jobClosingDate",
      value: jobClosingDate,
      isMandatory: true,
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
      label: "jobType",
      value: jobType,
      isMandatory: true,
    },
    {
      id: 2,
      headingIntl: "urgentJob",
      label: "urgentJob",
      value: urgentJob,
      isMandatory: true,
    },
    {
      id: 3,
      headingIntl: "industry",
      label: "industry",
      value: industry,
      isMandatory: true,
    },
    {
      id: 4,
      headingIntl: "minimumExperience",
      label: "minimumExperience",
      value: minimumExperience,
      isMandatory: true,
    },
    {
      id: 5,
      headingIntl: "maximumExperience",
      label: "maximumExperience",
      value: maximumExperience,
      isMandatory: false,
    },
    {
      id: 6,
      headingIntl: "nationality",
      label: "nationality",
      value: nationality,
      isMandatory: false,
    },
    {
      id: 7,
      headingIntl: "designation",
      label: "designation",
      value: designation,
      isMandatory: true,
    },
    {
      id: 8,
      headingIntl: "jobLocation",
      label: "jobLocation",
      value: jobLocation,
      isMandatory: true,
    },
  ];
};

export const jobType = {
  SPECIALLY_ABLE: "For Specially Abled Persons",
  CONTRACTUAL: "Contractual",
  REGULAR: "Regular",
  RETIRED: "For Retired Persons",
};
