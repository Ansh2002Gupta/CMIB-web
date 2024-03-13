import React from "react";
import { useIntl } from "react-intl";

import CompanySettingsTemplate from "./CompanySettingsTemplate";

const CompanySettings = ({
  formErrors,
  formFields,
  getInitialFields,
  handleInputChange,
  initialFormState,
  onRemoveInterviewType,
  onSelectInterviewType,
  selectedInterviewType,
}) => {
  const intl = useIntl();

  const fields = getInitialFields(
    formFields?.max_no_of_vacancy,
    formFields?.multiplier,
    formFields?.company_interview_types
  );

  return (
    <CompanySettingsTemplate
      {...{
        fields,
        formErrors,
        handleInputChange,
        initialFormState,
        intl,
        onRemoveInterviewType,
        onSelectInterviewType,
        selectedInterviewType,
      }}
    />
  );
};

export default CompanySettings;
