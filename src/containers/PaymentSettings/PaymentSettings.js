import React from "react";
import { useIntl } from "react-intl";

import PaymentSettingsTemplate from "./PaymentSettingsTemplate";
import usePaymentSettings from "./Conrollers/usePaymentSettings";

const PaymentSettings = () => {
  const intl = useIntl();
  const {
    formErrors,
    formFields,
    getInitialFields,
    handleInputChange,
    onRemoveCompanyItem,
    onSelectCompanyItem,
    selectedCompanyList,
  } = usePaymentSettings();

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
        onRemoveCompanyItem,
        onSelectCompanyItem,
        selectedCompanyList,
      }}
    />
  );
};

export default PaymentSettings;
