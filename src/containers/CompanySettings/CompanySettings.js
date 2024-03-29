import React from "react";
import { useIntl } from "react-intl";

import CompanySettingsTemplate from "./CompanySettingsTemplate";

const CompanySettings = ({
  formErrors,
  formFields,
  getInitialFields,
  getRoundTwoInitialFields,
  handleInputChange,
  hasRoundTwo,
  isEditable,
  onRemoveInterviewType,
  onSelectInterviewType,
  selectedInterviewType,
}) => {
  const intl = useIntl();

  const fields = hasRoundTwo
    ? getRoundTwoInitialFields(
        formFields?.max_no_of_vacancy,
        formFields?.shortlist_ratio,
        formFields?.company_interview_types
      )
    : getInitialFields(
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
        hasRoundTwo,
        intl,
        isEditable,
        onRemoveInterviewType,
        onSelectInterviewType,
        selectedInterviewType,
      }}
    />
  );
};

export default CompanySettings;
