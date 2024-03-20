import { useState } from "react";

import { MAX_EXPERIENCE_LENGTH } from "../../../constant/constant";

const useCompanySettings = ({ companyDetails }) => {
  const [selectedInterviewType, setSelectedInterviewType] = useState([]);

  const initialValue = {
    max_no_of_vacancy: companyDetails?.max_no_of_vacancy || "",
    multiplier: companyDetails?.multiplier || "",
    shortlist_students_allowed:
      companyDetails?.shortlist_students_allowed || "",
    company_interview_types: companyDetails?.company_interview_types || [
      "online",
    ],
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
          isRequired: true,
          message: "company_interview_types",
        },
      },
    ];
  };

  const [formFields, setFormFields] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});

  const onSelectInterviewType = (item, option) => {
    let interview = option?.[0];
    if (selectedInterviewType.some((item) => item.id === interview.id)) {
      onRemoveInterviewType(interview);
    } else {
      setFormErrors({
        ...formErrors,
        ["company_interview_types"]: "",
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
    handleInputChange,
    isButtonDisable,
    onRemoveInterviewType,
    onSelectInterviewType,
    selectedInterviewType,
  };
};

export default useCompanySettings;
