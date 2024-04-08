import React, { useState } from "react";
import { useIntl } from "react-intl";

import { isValueEmpty } from "../../constant/utils";
import { EMAIL_REGEX } from "../../constant/regex";
import {
  SALUTATION_OPTIONS,
  SOURCE_OF_INFORM_ICAI_OPTIONS,
} from "../../constant/constant";

const company_details = ({ intl }) => [
  {
    key: "company_name",
    isMandatory: true,
    label: "label.companyName",
    placeholder: "label.companyName",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
    isCapitalize: true,
  },
  {
    key: "company_entity",
    isMandatory: true,
    label: "label.entity",
    placeholder: "label.entity",
    validate: (value) => {},
  },
  {
    key: "comapny_frn",
    isMandatory: true,
    label: "label.firmRegistrationNo",
    placeholder: "label.firmRegistrationNo",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },
  {
    key: "company_partners",
    isMandatory: true,
    label: "label.numberOfPartner",
    placeholder: "label.numberOfPartner",
    type: "inputNumber",
    controls: true,
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },
  {
    key: "current_industry",
    isMandatory: true,
    label: "label.currentIndustry",
    placeholder: "label.currentIndustry",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },

  {
    key: "correspondance_address",
    isMandatory: true,
    label: "label.addressOfCorrespondance",
    placeholder: "label.addressOfCorrespondance",
    type: "textArea",
    rows: 3,
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
    isCapitalize: true,
  },
  {
    key: "company_state",
    isMandatory: true,
    label: "label.state",
    placeholder: "label.state",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
    isCapitalize: true,
  },
  {
    key: "company_email",
    isMandatory: true,
    label: "label.emailId",
    placeholder: "label.emailId",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
      if (!EMAIL_REGEX.test(value)) {
        return intl.formatMessage({ id: "label.invalidEmail" });
      }
    },
  },
  {
    key: "company_username",
    isMandatory: true,
    label: "label.userName2",
    placeholder: "label.userName2",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },
  {
    key: "company_std",
    isMandatory: true,
    label: "label.isdCode",
    placeholder: "label.isdCode",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },
  {
    key: "company_telephone",
    isMandatory: true,
    label: "label.telephoneNumber",
    placeholder: "label.telephoneNumber",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },
];
const contact_person_details = ({ intl }) => [
  {
    key: "salutation",
    isMandatory: true,
    label: "label.salutation",
    placeholder: "label.salutation",
    type: "select",
    selectOptions: SALUTATION_OPTIONS,
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },
  {
    key: "contact_person_name",
    isMandatory: true,
    label: "label.contactPersonName",
    placeholder: "label.contactPersonName",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
    isCapitalize: true,
  },
  {
    key: "contact_person_designation",
    isMandatory: true,
    label: "label.contactPersonDesignation",
    placeholder: "label.contactPersonDesignation",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
    isCapitalize: true,
  },
  {
    key: "contact_mobile_number",
    isMandatory: true,
    label: "label.mobileNumber",
    placeholder: "label.mobileNumber",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },
  {
    key: "contact_email",
    isMandatory: true,
    label: "label.emailId",
    placeholder: "label.emailId",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },
];
const other_details = ({ intl }) => [
  {
    key: "short_profile_company",
    isMandatory: true,
    label: "label.shortProfileOfTheCompany",
    placeholder: "label.shortProfileOfTheCompany",
    fullWidth: true,
    type: "textArea",
    rows: 2,
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
    isCapitalize: true,
  },
  {
    key: "website",
    isMandatory: true,
    label: "label.website",
    placeholder: "label.website",
    isWebsite: true,
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },
  {
    key: "nature_of_supplier",
    isMandatory: true,
    label: "label.natureOfSupplier",
    placeholder: "label.natureOfSupplier",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
  },
  {
    key: "company_type",
    isMandatory: true,
    label: "label.companyType",
    placeholder: "label.companyType",
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
    isCapitalize: true,
  },
];
const source_of_information = ({ intl }) => [
  {
    key: "source",
    isArray: true,
    isCheckBoxList: true,
    options: SOURCE_OF_INFORM_ICAI_OPTIONS,
    fullWidth: true,
  },
];

const company_logo = ({ intl }) => [
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
    if (item?.isArray) {
      return {
        ...item,
        value:
          !isEditable && !(state?.[item?.key]?.length > 0)
            ? "--"
            : state?.[item?.key],
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
  const [company_details_state, setCompany_details_state] = useState(
    company_details({ intl })
  );
  const [contact_person_details_state, setContact_person_details_state] =
    useState(contact_person_details({ intl }));
  const [other_details_state, setOther_details_state] = useState(
    other_details({ intl })
  );
  const [source_of_information_state, setSource_of_information_state] =
    useState(source_of_information({ intl }));
  const [company_logo_state, setCompany_logo_state] = useState(
    company_logo({ intl })
  );

  const validateOnBlur = ({ state, details, key, index, intl }) => {
    const value = state[key];
    const updatedData = details.map((item, i) => {
      if (key === item.key) {
        return {
          ...item,
          value,
          error: item.validate ? item.validate(value, intl) : "",
        };
      }
      return item;
    });
    return updatedData;
  };

  const handleCompany_detailBlur = (key, index) => {
    setCompany_details_state(
      validateOnBlur({
        state,
        details: company_details_state,
        key,
        index,
        intl,
      })
    );
  };
  const handleContact_person_detailBlur = (key, index) => {
    setContact_person_details_state(
      validateOnBlur({
        state,
        details: contact_person_details_state,
        key,
        index,
        intl,
      })
    );
  };
  const handleOther_detailBlur = (key, index) => {
    setOther_details_state(
      validateOnBlur({
        state,
        details: other_details_state,
        key,
        index,
        intl,
      })
    );
  };
  const handleSource_of_informationBlur = (key, index) => {
    setSource_of_information_state(
      validateOnBlur({
        state,
        details: source_of_information_state,
        key,
        index,
        intl,
      })
    );
  };
  const handleCompany_logoBlur = (key, index) => {
    setCompany_logo_state(
      validateOnBlur({
        state,
        details: company_logo_state,
        key,
        index,
        intl,
      })
    );
  };

  const checkMandatoryFields = () => {
    let error = false;
    [
      ...company_details_state,
      ...contact_person_details_state,
      ...other_details_state,
      ...source_of_information_state,
      ...company_logo_state,
    ].forEach((item) => {
      if (item.isMandatory && isValueEmpty(state[item.key])) {
        error = true;
      }
    });
    return error;
  };

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
    handleCompany_detailBlur,
    handleContact_person_detailBlur,
    handleOther_detailBlur,
    handleSource_of_informationBlur,
    handleCompany_logoBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
