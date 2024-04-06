import React, { useState } from "react";
import { useIntl } from "react-intl";

import { SALUTATION_OPTIONS } from "../../constant/constant";
const company_details = () => [
  {
    key: "company_name",
    isMandatory: true,
    label: "label.companyName",
    placeholder: "label.companyName",
  },
  {
    key: "company_entity",
    isMandatory: true,
    label: "label.entity",
    placeholder: "label.entity",
  },
  {
    key: "comapny_frn",
    isMandatory: true,
    label: "label.firmRegistrationNo",
    placeholder: "label.firmRegistrationNo",
  },
  {
    key: "company_partners",
    isMandatory: true,
    label: "label.numberOfPartner",
    placeholder: "label.numberOfPartner",
    type: "inputNumber",
    controls: true,
  },
  {
    key: "current_industry",
    isMandatory: true,
    label: "label.currentIndustry",
    placeholder: "label.currentIndustry",
  },

  {
    key: "correspondance_address",
    isMandatory: true,
    label: "label.addressOfCorrespondance",
    placeholder: "label.addressOfCorrespondance",
    type: "textArea",
    rows: 3,
  },
  {
    key: "company_state",
    isMandatory: true,
    label: "label.state",
    placeholder: "label.state",
  },
  {
    key: "company_email",
    isMandatory: true,
    label: "label.emailId",
    placeholder: "label.emailId",
  },
  {
    key: "company_username",
    isMandatory: true,
    label: "label.userName2",
    placeholder: "label.userName2",
  },
  {
    key: "company_std",
    isMandatory: true,
    label: "label.isdCode",
    placeholder: "label.isdCode",
  },
  {
    key: "company_telephone",
    isMandatory: true,
    label: "label.telephoneNumber",
    placeholder: "label.telephoneNumber",
  },
];
const contact_person_details = () => [
  {
    key: "salutation",
    isMandatory: true,
    label: "label.salutation",
    placeholder: "label.salutation",
    type: "select",
    selectOptions: SALUTATION_OPTIONS,
  },
  {
    key: "contact_person_name",
    isMandatory: true,
    label: "label.contactPersonName",
    placeholder: "label.contactPersonName",
  },
  {
    key: "contact_person_designation",
    isMandatory: true,
    label: "label.contactPersonDesignation",
    placeholder: "label.contactPersonDesignation",
  },
  {
    key: "contact_mobile_number",
    isMandatory: true,
    label: "label.mobileNumber",
    placeholder: "label.mobileNumber",
  },
  {
    key: "contact_email",
    isMandatory: true,
    label: "label.emailId",
    placeholder: "label.emailId",
  },
];
const other_details = () => [
  {
    key: "short_profile_company",
    isMandatory: true,
    label: "label.shortProfileOfTheCompany",
    placeholder: "label.shortProfileOfTheCompany",
    fullWidth: true,
    type: "textArea",
    rows: 2,
  },
  {
    key: "website",
    isMandatory: true,
    label: "label.website",
    placeholder: "label.website",
    isWebsite: true,
  },
  {
    key: "nature_of_supplier",
    isMandatory: true,
    label: "label.natureOfSupplier",
    placeholder: "label.natureOfSupplier",
  },
  {
    key: "company_type",
    isMandatory: true,
    label: "label.companyType",
    placeholder: "label.companyType",
  },
];
const source_of_information = () => [
  {
    key: "source",
    isMandatory: true,
    isArray: true,
    isCheckBoxList: true,
  },
];

const company_logo = () => [
  {
    key: "company_logo_image",
    label: "label.companyIciaMessage",
    placeholder: "label.companyIciaMessage",
    isImage: true,
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

export const useCompanyDetailsCa = ({ state, isEditable }) => {
  const intl = useIntl();
  const [company_details_state, setCompany_details_state] =
    useState(company_details);
  const [contact_person_details_state, setContact_person_details_state] =
    useState(contact_person_details);
  const [other_details_state, setOther_details_state] = useState(other_details);
  const [source_of_information_state, setSource_of_information_state] =
    useState(source_of_information);
  const [company_logo_state, setCompany_logo_state_state] =
    useState(company_logo);

  return {
    company_details_data: addValueOnField({
      state,
      details: company_details_state,
      isEditable,
    }),
    contact_person_details_data: addValueOnField({
      state,
      details: contact_person_details_state,
      isEditable,
    }),
    other_details_data: addValueOnField({
      state,
      details: other_details_state,
      isEditable,
    }),
    source_of_information_data: addValueOnField({
      state,
      details: source_of_information_state,
      isEditable,
    }),
    company_logo_data: addValueOnField({
      state,
      details: company_logo_state,
      isEditable,
    }),
  };
};
