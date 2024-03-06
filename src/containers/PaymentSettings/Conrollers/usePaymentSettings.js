import { useState } from "react";
import { useNavigate } from "react-router-dom";

const usePaymentSettings = () => {
  const [selectedCompanyList, setSelectedCompanyList] = useState([]);
  const navigate = useNavigate();

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
        rules: [
          {
            required: true,
            message: "cgst",
          },
        ],
      },
      {
        id: 2,
        headingIntl: "sgst",
        label: "sgst",
        value: sgst,
        rules: [
          {
            required: true,
            message: "sgst",
          },
        ],
      },
      {
        id: 3,
        headingIntl: "igst",
        label: "igst",
        value: igst,
        rules: [
          {
            required: true,
            message: "igst",
          },
        ],
      },
      {
        id: 4,
        headingIntl: "noGst",
        label: "no_gst",
        value: no_gst,
        rules: [
          {
            required: true,
            message: "noGst",
          },
        ],
      },
      {
        id: 5,
        headingIntl: "discountRate",
        label: "discount_rate",
        value: discount_rate,
        rules: [
          {
            required: true,
            message: "discountRate",
          },
        ],
      },
      {
        id: 6,
        headingIntl: "memberRegistrationFee",
        label: "member_registration_fee",
        value: member_registration_fee,
        rules: [
          {
            required: true,
            message: "memberRegistrationFee",
          },
        ],
      },
    ];
  };

  const [formFields, setFormFields] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  const onSelectCompanyItem = (item, option) => {
    let company = option?.[0];
    if (selectedCompanyList.some((item) => item.id === company.id)) {
      onRemoveCompanyItem(company);
    } else {
      setFormErrors({
        ...formErrors,
        ["no_gst"]: "",
      });
      setSelectedCompanyList([...selectedCompanyList, company]);
    }
  };

  const onRemoveCompanyItem = (item) => {
    const updatedCompany = selectedCompanyList?.filter(
      (ele) => ele.id !== item.id
    );
    setSelectedCompanyList(updatedCompany);
    console.log(updatedCompany.length);
    if(!updatedCompany.length){
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
    console.log(value);
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

  const onClickCancel = () => {
    navigate(-1);
  };

  const onClickSave = () => {};

  return {
    formErrors,
    formFields,
    getInitialFields,
    handleInputChange,
    initialFormState,
    isButtonDisable,
    onClickCancel,
    onClickSave,
    onRemoveCompanyItem,
    onSelectCompanyItem,
    selectedCompanyList,
  };
};

export default usePaymentSettings;
