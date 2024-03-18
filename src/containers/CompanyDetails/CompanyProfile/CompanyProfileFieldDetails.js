export const COMPANY_DETAILS_FEILDS = (
  name,
  entity,
  frn_number,
  number_of_partner,
  industry_type,
  address,
  email,
  std_country_code,
  telephone_number
) => {
  return [
    {
      id: 1,
      headingIntl: "companyName",
      label: "name",
      value: name,
    },
    {
      id: 2,
      headingIntl: "entity",
      label: "entity",
      value: entity,
    },
    {
      id: 3,
      headingIntl: "frnNumber",
      label: "frn_number",
      value: frn_number,
    },
    {
      id: 4,
      headingIntl: "numberOfPartner",
      label: "number_of_partner",
      value: number_of_partner,
    },
    {
      id: 5,
      headingIntl: "currentIndustry",
      label: "industry_type",
      value: industry_type,
    },
    {
      id: 6,
      headingIntl: "addressOfCorrespondance",
      label: "address",
      value: address,
    },
    {
      id: 7,
      headingIntl: "emailId",
      label: "email",
      value: email,
    },
    {
      id: 8,
      headingIntl: "isdCode",
      label: "std_country_code",
      value: std_country_code,
    },
    {
      id: 9,
      headingIntl: "telephoneNumber",
      label: "telephone_number",
      value: telephone_number,
    },
  ];
};

export const CONTACT_PERSONAL_INFORMATION_FEILDS = (
  salutation,
  name,
  designation,
  mobile_country_code,
  mobile_number,
  email
) => {
  return [
    {
      id: 1,
      headingIntl: "salutation",
      label: "salutation",
      value: salutation,
    },
    {
      id: 2,
      headingIntl: "contactPersonName",
      label: "contact_person_name",
      value: name,
    },
    {
      id: 3,
      headingIntl: "contactPersonDesignation",
      label: "contact_person_designation",
      value: designation,
    },
    {
      id: 4,
      headingIntl: "mobileNumber",
      label: "mobile_number",
      value: `${mobile_country_code}-${mobile_number}`,
    },
    {
      id: 5,
      headingIntl: "emailId",
      label: "email_id",
      value: email,
    },
  ];
};

export const OTHER_DETAILS_FEILDS = (
  company_details,
  website,
  nature_of_supplier,
  company_type
) => {
  return [
    {
      id: 1,
      headingIntl: "shortProfileOfTheCompany",
      label: "company_details",
      value: company_details,
    },
    {
      id: 2,
      headingIntl: "website",
      label: "website",
      value: website,
    },
    {
      id: 3,
      headingIntl: "natureOfSupplier",
      label: "nature_of_supplier",
      value: nature_of_supplier,
    },
    {
      id: 4,
      headingIntl: "companyType",
      label: "company_type",
      value: company_type,
    },
  ];
};
