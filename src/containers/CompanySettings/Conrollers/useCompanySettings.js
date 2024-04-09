import { useEffect, useState } from "react";

import { MAX_EXPERIENCE_LENGTH } from "../../../constant/constant";
import { formateArrayToArrayOfobject } from "../../../constant/utils";

const useCompanySettings = ({ companyDetails, hasRoundTwo }) => {
  const [selectedInterviewType, setSelectedInterviewType] = useState([]);
  const can_edit_company = companyDetails?.can_edit?.can_edit_company;

  const initialValue = {
    max_no_of_vacancy: "",
    multiplier: "",
    shortlist_students_allowed: "",
    company_interview_types: [],
  };

  const roundTwoInitialValue = {
    max_no_of_vacancy: "",
    shortlist_ratio: "",
    company_interview_types: [],
  };

  const getInitialFields = (
    max_no_of_vacancy,
    multiplier,
    company_interview_types
  ) => {
    return [
      {
        id: 1,
        headingIntl: "max_no_of_vacancy",
        label: "max_no_of_vacancy",
        value: max_no_of_vacancy,
        hasControls: true,
        rules: {
          isDisabled: !can_edit_company,
          isRequired: true,
          message: "max_no_of_vacancy",
        },
      },
      {
        id: 2,
        headingIntl: "multiplier",
        label: "multiplier",
        value: multiplier,
        rules: {
          isDisabled: !can_edit_company,
          maxLength: MAX_EXPERIENCE_LENGTH,
          isRequired: true,
          message: "multiplier",
        },
      },
      {
        id: 3,
        headingIntl: "shortlist_students_allowed",
        label: "shortlist_students_allowed",
        value: calculateShortlistStudentsAllowed(),
        rules: {
          isDisabled: true,
          message: "shortlist_students_allowed",
        },
      },
      {
        isMultiSelect: true,
        id: 4,
        headingIntl: "company_interview_types",
        label: "company_interview_types",
        value: company_interview_types,
        rules: {
          isDisabled: !can_edit_company,
          isRequired: true,
          message: "company_interview_types",
        },
      },
    ];
  };

  const getRoundTwoInitialFields = (
    max_no_of_vacancy,
    shortlist_ratio,
    company_interview_types
  ) => {
    return [
      {
        id: 1,
        headingIntl: "max_no_of_vacancy",
        label: "max_no_of_vacancy",
        value: max_no_of_vacancy,
        hasControls: true,
        rules: {
          isRequired: true,
          isDisabled: !can_edit_company,
          message: "max_no_of_vacancy",
        },
      },
      {
        id: 2,
        isPreffix: true,
        headingIntl: "shortlist_ratio",
        label: "shortlist_ratio",
        value: shortlist_ratio,
        rules: {
          isDisabled: !can_edit_company,
          maxLength: MAX_EXPERIENCE_LENGTH,
          isRequired: true,
          message: "shortlist_ratio",
        },
      },

      {
        isMultiSelect: true,
        id: 3,
        headingIntl: "company_interview_types",
        label: "company_interview_types",
        value: company_interview_types,
        rules: {
          isDisabled: !can_edit_company,
          isRequired: true,
          message: "company_interview_types",
        },
      },
    ];
  };

  const initialFields = hasRoundTwo ? roundTwoInitialValue : initialValue;

  const [formFields, setFormFields] = useState(initialFields);
  const [formErrors, setFormErrors] = useState({});

  const intialApiData = hasRoundTwo
    ? {
        max_no_of_vacancy: companyDetails?.max_no_vacancy_company || "",
        shortlist_ratio: companyDetails?.shortlist_ratio || "",
        company_interview_types: companyDetails?.company_interview_types || [],
      }
    : {
        max_no_of_vacancy: companyDetails?.max_no_vacancy_company || "",
        multiplier: companyDetails?.multiplier_company || "",
        shortlist_students_allowed:
          companyDetails?.shotlist_candidate_allowed_company || "",
        company_interview_types: companyDetails?.company_interview_types || [],
      };

  useEffect(() => {
    setFormFields(intialApiData);
    const updatedInterviewtypes = formateArrayToArrayOfobject(
      companyDetails?.company_interview_types
    );
    setSelectedInterviewType(updatedInterviewtypes);
  }, [companyDetails]);

  const onSelectInterviewType = (item, option) => {
    let interview = option?.[0];
    if (selectedInterviewType.some((item) => item.id === interview.id)) {
      onRemoveInterviewType(interview);
    } else {
      setFormErrors({
        ...formErrors,
        ["company_interview_types"]: "",
      });
      setFormFields({
        ...formFields,
        ["company_interview_types"]: [
          ...formFields?.company_interview_types,
          ...item,
        ],
      });
      setSelectedInterviewType([...selectedInterviewType, interview]);
    }
  };

  const calculateShortlistStudentsAllowed = () => {
    const max_no_of_vacancy = parseInt(formFields.max_no_of_vacancy, 10);
    const multiplier = parseFloat(formFields.multiplier);
    if (!isNaN(max_no_of_vacancy) && !isNaN(multiplier)) {
      return max_no_of_vacancy * multiplier;
    }
    return "";
  };

  const onRemoveInterviewType = (item) => {
    const updatedTypes = selectedInterviewType?.filter(
      (ele) => ele.id !== item.id
    );
    const updatedNoGst = formFields.company_interview_types.filter(
      (ele) => ele !== item.value
    );
    setFormFields({
      ...formFields,
      ["company_interview_types"]: updatedNoGst,
    });

    setSelectedInterviewType(updatedTypes);
    if (!updatedTypes.length) {
      setFormErrors({
        ...formErrors,
        ["company_interview_types"]: "fieldEmpty",
      });
    }
  };

  const handleInputChange = (value, name) => {
    setFormFields((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        [name]: value,
      };

      if (name === "max_no_of_vacancy" || name === "multiplier") {
        const max_no_of_vacancy =
          name === "max_no_of_vacancy"
            ? parseInt(value, 10)
            : parseInt(prevFormData.max_no_of_vacancy, 10);
        const multiplier =
          name === "multiplier"
            ? parseFloat(value)
            : parseFloat(prevFormData.multiplier);
        const shortlist_students_allowed =
          !isNaN(max_no_of_vacancy) && !isNaN(multiplier)
            ? max_no_of_vacancy * multiplier
            : "";
        if (!hasRoundTwo)
          return {
            ...newFormData,
            shortlist_students_allowed: shortlist_students_allowed,
          };
      }

      return newFormData;
    });

    let error = false;
    if (name === "company_interview_types") {
      error = !selectedInterviewType.length;
    } else if (value === null || value === "") {
      error = true;
    }
    setFormErrors({
      ...formErrors,
      [name]: error ? "fieldEmpty" : "",
    });
  };

  const isButtonDisable = () => {
    if (hasRoundTwo) {
      return (
        !formFields?.max_no_of_vacancy ||
        !formFields?.shortlist_ratio ||
        !selectedInterviewType.length
      );
    }
    return (
      !formFields?.max_no_of_vacancy ||
      !formFields?.multiplier ||
      !selectedInterviewType.length
    );
  };

  return {
    formErrors,
    formFields,
    getInitialFields,
    getRoundTwoInitialFields,
    handleInputChange,
    isButtonDisable,
    onRemoveInterviewType,
    onSelectInterviewType,
    selectedInterviewType,
  };
};

export default useCompanySettings;
