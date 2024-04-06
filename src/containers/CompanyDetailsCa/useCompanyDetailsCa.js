import React, { useState } from "react";
import { useIntl } from "react-intl";

const company_details = () => [
  {
    key: "company_name",
    isMandatory: true,
    label: "label.company_name",
    placeholder: "label.company_name",
  },
  {
    key: "company_entity",
    isMandatory: true,
    label: "label.company_entity",
    placeholder: "label.company_entity",
  },
  {
    key: "comapny_frn",
    isMandatory: true,
    label: "label.comapny_frn",
    placeholder: "label.comapny_frn",
  },
  {
    key: "company_partners",
    isMandatory: true,
    label: "label.company_partners",
    placeholder: "label.company_partners",
  },
  {
    key: "current_indusries",
    isMandatory: true,
    label: "label.current_indusries",
    placeholder: "label.current_indusries",
  },
  {
    key: "company_partners",
    isMandatory: true,
    label: "label.company_partners",
    placeholder: "label.company_partners",
  },

  {
    key: "correspondance_address",
    isMandatory: true,
    label: "label.correspondance_address",
    placeholder: "label.correspondance_address",
  },
  {
    key: "company_state",
    isMandatory: true,
    label: "label.company_state",
    placeholder: "label.company_state",
  },
  {
    key: "company_email",
    isMandatory: true,
    label: "label.company_email",
    placeholder: "label.company_email",
  },
  {
    key: "company_username",
    isMandatory: true,
    label: "label.company_username",
    placeholder: "label.company_username",
  },
  {
    key: "company_password",
    isMandatory: true,
    label: "label.company_password",
    placeholder: "label.company_password",
  },
  {
    key: "company_isd",
    isMandatory: true,
    label: "label.company_isd",
    placeholder: "label.company_isd",
  },
  {
    key: "company_telephone",
    isMandatory: true,
    label: "label.company_telephone",
    placeholder: "label.company_telephone",
  },
];

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((item) => {
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

  return {
    company_details_data: addValueOnField({
      state,
      details: company_details_state,
      isEditable,
    }),
  };
};
