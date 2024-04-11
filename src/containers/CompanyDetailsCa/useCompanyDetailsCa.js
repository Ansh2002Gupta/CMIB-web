import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import useFetch from "../../core/hooks/useFetch";
import {
  CORE_COUNTRIES,
  CORE_ROUTE,
  INDUSTRY_TYPES,
  STATES,
} from "../../constant/apiEndpoints";
import { isValueEmpty } from "../../constant/utils";
import { EMAIL_REGEX } from "../../constant/regex";
import {
  COMPANY_TYPE_OPTIONS,
  ENTITY_OPTIONS,
  NATURE_OF_SUPPLIER_OPTIONS,
  SALUTATION_OPTIONS,
  SOURCE_OF_INFORM_ICAI_OPTIONS,
} from "../../constant/constant";
import {
  transformedOptions,
  transformedOptionsStates,
} from "../../constant/utils";

const company_details = ({ intl, industryData, stateData }) => [
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
    type: "select",
    selectOptions: ENTITY_OPTIONS,
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
    },
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
    maxLength: 3,
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
    isoptionObject: true,
    type: "select",
    selectOptions: transformedOptions(industryData),
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
    isState: true,
    type: "select",
    selectOptions: transformedOptionsStates(stateData),
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
    key: "company_std",
    isMandatory: true,
    label: "label.isdCode",
    placeholder: "label.stdPlaceholder",
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
const contact_person_details = ({ intl, countryData }) => [
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
    countryKey: "contact_mobile_country_code",
    isMandatory: true,
    label: "label.mobileNumber",
    placeholder: "label.mobileNumber",
    isPhone: true,
    selectOptions: countryData,
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
    type: "select",
    selectOptions: NATURE_OF_SUPPLIER_OPTIONS,
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
    type: "select",
    selectOptions: COMPANY_TYPE_OPTIONS,
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
    keyName: "company_logo_name",
    label: "label.companyIciaMessage",
    placeholder: "label.companyIciaMessage",
    isImage: true,
    isCompany: true,
  },
];

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((item) => {
    if (item?.isImage) {
      return {
        ...item,
        value: state?.[item?.key],
        valueName: state?.[item?.keyName],
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
    if (item?.isPhone) {
      return {
        ...item,
        value: !isEditable && !state?.[item?.key] ? "--" : state?.[item?.key],
        countryValue: state[item?.countryKey],
      };
    }
    if (item?.isState) {
      return {
        ...item,
        value: !isEditable
          ? !state?.[item?.key]
            ? "--"
            : state?.[item?.key]?.name || state?.[item?.key]
          : state?.[item?.key]?.code || state?.[item?.key],
        countryValue: state[item?.countryKey],
      };
    }
    if (item?.isoptionObject) {
      return {
        ...item,
        value: !isEditable
          ? !state?.[item?.key]
            ? "--"
            : state?.[item?.key]?.name || state?.[item?.key]
          : state?.[item?.key]?.id || state?.[item?.key],
        countryValue: state[item?.countryKey],
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
  const { data: industryData, isLoading: isGettingIndustry } = useFetch({
    url: CORE_ROUTE + INDUSTRY_TYPES,
  });
  const { data: stateData, isLoading: isGettingState } = useFetch({
    url: CORE_ROUTE + STATES,
  });

  const { data: countryData, isLoading: isGettingCountry } = useFetch({
    url: CORE_COUNTRIES,
  });
  const [company_details_state, setCompany_details_state] = useState(
    company_details({ intl, industryData, stateData })
  );
  const [contact_person_details_state, setContact_person_details_state] =
    useState(contact_person_details({ intl, countryData }));
  const [other_details_state, setOther_details_state] = useState(
    other_details({ intl })
  );
  const [source_of_information_state, setSource_of_information_state] =
    useState(source_of_information({ intl }));
  const [company_logo_state, setCompany_logo_state] = useState(
    company_logo({ intl })
  );

  useEffect(() => {
    setCompany_details_state(
      company_details({ intl, industryData, stateData })
    );
    setContact_person_details_state(
      contact_person_details({ intl, countryData })
    );
  }, [industryData, stateData, countryData]);

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
    isLoading: isGettingIndustry || isGettingState || isGettingCountry,
    isValidAllFields: checkMandatoryFields(),
  };
};
