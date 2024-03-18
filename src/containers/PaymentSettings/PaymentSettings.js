import React from "react";
import { useIntl } from "react-intl";

import PaymentSettingsTemplate from "./PaymentSettingsTemplate";

const PaymentSettings = ({
  formErrors,
  formFields,
  getInitialFields,
  handleInputChange,
  isEditable,
  onRemoveCompanyItem,
  onSelectCompanyItem,
  selectedCompanyList,
}) => {
  const intl = useIntl();

  const fields = getInitialFields(
    formFields?.cgst,
    formFields?.sgst,
    formFields?.igst,
    formFields?.no_gst,
    formFields?.discount_rate,
    formFields?.member_registration_fee
  );

  return (
    <PaymentSettingsTemplate
      {...{
        fields,
        formErrors,
        handleInputChange,
        intl,
        isEditable,
        onRemoveCompanyItem,
        onSelectCompanyItem,
        selectedCompanyList,
      }}
    />
  );
};

export default PaymentSettings;
