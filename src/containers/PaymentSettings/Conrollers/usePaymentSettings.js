import { useEffect, useState } from "react";
import { formateArrayToArrayOfobject } from "../../../constant/utils";

const usePaymentSettings = ({ paymentDetails }) => {
  const [selectedCompanyList, setSelectedCompanyList] = useState([]);

  const initialFormState = {
    cgst: "",
    sgst: "",
    igst: "",
    no_gst: [],
    discount_rate: "",
    member_registration_fee: "",
  };

  const getInitialFields = (
    cgst,
    sgst,
    igst,
    no_gst,
    discount_rate,
    member_registration_fee
  ) => {
    return [
      {
        id: 1,
        headingIntl: "cgst",
        label: "cgst",
        value: cgst,
        rules: {
          isPercentage: true,
          isRequired: true,
          message: "cgst",
        },
      },
      {
        id: 2,
        headingIntl: "sgst",
        label: "sgst",
        value: sgst,
        rules: {
          isPercentage: true,
          isRequired: true,
          message: "sgst",
        },
      },
      {
        id: 3,
        headingIntl: "igst",
        label: "igst",
        value: igst,
        rules: {
          isPercentage: true,
          isRequired: true,
          message: "igst",
        },
      },
      {
        isMultiSelect: true,
        id: 4,
        headingIntl: "noGst",
        label: "no_gst",
        value: no_gst,
        rules: {
          isRequired: true,
          message: "noGst",
        },
      },
      {
        id: 5,
        headingIntl: "discountRate",
        label: "discount_rate",
        value: discount_rate,
        rules: {
          isPercentage: true,
          isRequired: true,
          message: "discountRate",
        },
      },
      {
        id: 6,
        headingIntl: "memberRegistrationFee",
        label: "member_registration_fee",
        value: member_registration_fee,
        rules: {
          isRequired: true,
          message: "memberRegistrationFee",
        },
      },
    ];
  };

  const [formFields, setFormFields] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setFormFields({
      cgst: paymentDetails?.cgst || "",
      sgst: paymentDetails?.sgst || "",
      igst: paymentDetails?.igst || "",
      no_gst: paymentDetails?.no_gst || [],
      discount_rate: paymentDetails?.disconunt_rate || "",
      member_registration_fee: paymentDetails?.member_registration_fee || "",
    });
    const updatedCompanyTypes = formateArrayToArrayOfobject(
      paymentDetails?.no_gst
    );
    setSelectedCompanyList(updatedCompanyTypes);
  }, [paymentDetails]);

  const onSelectCompanyItem = (item, option) => {
    let company = option?.[0];
    if (selectedCompanyList.some((item) => item.id === company.id)) {
      onRemoveCompanyItem(company);
    } else {
      setFormErrors({
        ...formErrors,
        ["no_gst"]: "",
      });
      setFormFields({
        ...formFields,
        ["no_gst"]: [...formFields?.no_gst, ...item],
      });
      setSelectedCompanyList([...selectedCompanyList, company]);
    }
  };

  const onRemoveCompanyItem = (item) => {
    const updatedCompany = selectedCompanyList?.filter(
      (ele) => ele.id !== item.id
    );
    setSelectedCompanyList(updatedCompany);
    if (!updatedCompany.length) {
      setFormErrors({
        ...formErrors,
        ["no_gst"]: "fieldEmpty",
      });
    }
  };

  const handleInputChange = (value, name) => {
    setFormFields((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    let error = false;
    if (name === "no_gst") {
      error = !selectedCompanyList.length;
    } else if (value === null || value === "") {
      error = true;
    }
    setFormErrors({
      ...formErrors,
      [name]: error ? "fieldEmpty" : "",
    });
  };

  const isButtonDisable = () => {
    return (
      !formFields?.cgst ||
      !formFields?.discount_rate ||
      !formFields?.igst ||
      !formFields?.member_registration_fee ||
      !selectedCompanyList.length ||
      !formFields?.sgst
    );
  };

  return {
    formErrors,
    formFields,
    getInitialFields,
    handleInputChange,
    initialFormState,
    isButtonDisable,
    onRemoveCompanyItem,
    onSelectCompanyItem,
    selectedCompanyList,
  };
};

export default usePaymentSettings;
