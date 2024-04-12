import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

const useCandidateSettings = ({
  candidateDetails,
  isEditable,
  hasRoundTwo,
}) => {
  const can_edit_max_interview_allowed =
    candidateDetails?.can_edit?.can_edit_max_interview_allowed;
  const can_edit_candidate_max_offer_accepted =
    candidateDetails?.can_edit?.can_edit_candidate_max_offer_accepted;
  const can_edit_candidate_big_center_change_start_date =
    candidateDetails?.can_edit?.can_edit_candidate_big_center_change_start_date;
  const can_edit_candidate_big_center_change_end_date =
    candidateDetails?.can_edit?.can_edit_candidate_big_center_change_end_date;
  const can_edit_candidate_small_center_change_start_date =
    candidateDetails?.can_edit
      ?.can_edit_candidate_small_center_change_start_date;
  const can_edit_candidate_small_center_change_end_date =
    candidateDetails?.can_edit?.can_edit_candidate_small_center_change_end_date;
  const isStartDateEditable =
    candidateDetails?.can_edit?.can_edit_candidate_center_change_start_date;
  const isEndDateEditable =
    candidateDetails?.can_edit?.can_edit_candidate_center_change_end_date;

  const addTableData = {
    isAddRow: true,
    centre_name: "",
    from_date: null,
    to_date: null,
    from_time: null,
    to_time: null,
  };
  const roundTwoAddTableData = {
    isAddRow: true,
    centre_name: "",
    from_date: null,
    to_date: null,
  };

  const addSelectedTableData = {
    from_date: null,
    to_date: null,
  };

  const initalTableData = hasRoundTwo ? roundTwoAddTableData : addTableData;

  const [tableData, setTableData] = useState([initalTableData]);
  const [selectedCenterTableData, setSelectedCenterTableData] = useState([
    addSelectedTableData,
  ]);
  const intl = useIntl();
  const [errors, setErrors] = useState(
    tableData.map(() => ({
      centre_name: "",
      from_date: "",
      to_date: "",
      from_time: "",
      to_time: "",
    }))
  );

  const handleRemove = (index) => {
    const filteredData = tableData.filter((item, idx) => idx !== index);
    setTableData(filteredData);
    setErrors((prevErrors) => prevErrors.filter((item, idx) => idx !== index));
  };

  const handleAdd = (index) => {
    if (validate(index)) {
      if (hasRoundTwo) {
        setErrors((prevErrors) => [
          ...prevErrors,
          {
            centre_name: "",
            from_date: "",
            to_date: "",
          },
        ]);
        setTableData((prevTableData) => {
          delete prevTableData[index].isAddRow;
          return [...prevTableData, addTableData];
        });
      } else {
        setErrors((prevErrors) => [
          ...prevErrors,
          {
            centre_name: "",
            from_date: "",
            to_date: "",
            from_time: "",
            to_time: "",
          },
        ]);
        setTableData((prevTableData) => {
          delete prevTableData[index].isAddRow;
          return [...prevTableData, addTableData];
        });
      }
    }
  };

  const handleCandidateDataChange = (value, name, index, isRequired) => {
    if (name === "big_centre_end_date" || name === "big_centre_start_date") {
      setSelectedCenterTableData((prevTableData) => {
        const newTableData = [...prevTableData];
        newTableData[index] = {
          ...newTableData[index],
          [name]: value,
        };
        return newTableData;
      });
    } else {
      setTableData((prevTableData) => {
        const newTableData = [...prevTableData];
        newTableData[index] = {
          ...newTableData[index],
          [name]: value,
        };
        return newTableData;
      });
    }
    if (isRequired) {
      if (value === null || value === "") {
        setErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = {
            ...newErrors[index],
            [name]: intl.formatMessage({ id: "label.error.fieldEmpty" }),
          };
          return newErrors;
        });
      } else {
        setErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = {
            ...newErrors[index],
            [name]: "",
          };
          return newErrors;
        });
      }
    }
  };

  const initialFormState = {
    max_no_of_interview: "",
    max_no_of_offer: "",
    big_centre_start_date: null,
    big_centre_end_date: null,
    small_centre_start_date: null,
    small_centre_end_date: null,
  };

  const roundTwoInitialFormState = {
    max_no_of_interview: "",
    max_no_of_offer: "",
  };

  const getInitialFields = (
    max_no_of_interview,
    max_no_of_offer,
    big_centre_start_date,
    big_centre_end_date,
    small_centre_start_date,
    small_centre_end_date
  ) => {
    return [
      [
        {
          id: 1,
          headingIntl: "max_no_of_interview",
          label: "max_no_of_interview",
          value: max_no_of_interview,
          rules: {
            isDisabled: !can_edit_max_interview_allowed,
            isRequired: true,
            message: "max_no_of_interview",
          },
        },
        {
          id: 2,
          headingIntl: "max_no_of_offer",
          label: "max_no_of_offer",
          value: max_no_of_offer,
          rules: {
            isDisabled: !can_edit_candidate_max_offer_accepted,
            isRequired: true,
            message: "max_no_of_offer",
          },
        },
      ],
      [
        {
          id: 3,
          headingIntl: "big_centre_start_date",
          label: "big_centre_start_date",
          value: big_centre_start_date,
          isDateTimePicker: true,
          rules: {
            isDisabled: !can_edit_candidate_big_center_change_start_date,
            message: "big_centre_start_date",
          },
        },
        {
          id: 4,
          headingIntl: "big_centre_end_date",
          label: "big_centre_end_date",
          value: big_centre_end_date,
          isDateTimePicker: true,
          rules: {
            isDisabled: !can_edit_candidate_big_center_change_end_date,
            message: "big_centre_end_date",
          },
        },
      ],
      [
        {
          id: 5,
          headingIntl: "small_centre_start_date",
          label: "small_centre_start_date",
          value: small_centre_start_date,
          isDateTimePicker: true,
          rules: {
            isDisabled: !can_edit_candidate_small_center_change_start_date,
            message: "small_centre_start_date",
          },
        },
        {
          id: 6,
          headingIntl: "small_centre_end_date",
          label: "small_centre_end_date",
          value: small_centre_end_date,
          isDateTimePicker: true,
          rules: {
            isDisabled: !can_edit_candidate_small_center_change_end_date,
            message: "small_centre_end_date",
          },
        },
      ],
    ];
  };

  const getRoundTwoInitialFields = (max_no_of_interview, max_no_of_offer) => {
    return [
      [
        {
          id: 1,
          headingIntl: "max_no_of_interview",
          label: "max_no_of_interview",
          value: max_no_of_interview,
          rules: {
            isRequired: true,
            isDisabled: !can_edit_max_interview_allowed,
            message: "max_no_of_interview",
          },
        },
        {
          id: 2,
          headingIntl: "max_no_of_offer",
          label: "max_no_of_offer",
          value: max_no_of_offer,
          rules: {
            isRequired: true,
            isDisabled: !can_edit_candidate_max_offer_accepted,
            message: "max_no_of_offer",
          },
        },
      ],
    ];
  };

  const initialFields = hasRoundTwo
    ? roundTwoInitialFormState
    : initialFormState;
  const [formFields, setFormFields] = useState(initialFields);
  const [formErrors, setFormErrors] = useState({});

  const getAPITableData = () => {
    const data = candidateDetails?.candidate_consent
      .map((item) => {
        if (item?.from_date !== null) {
          return {
            id: item?.id,
            centre_name: item?.centre_name,
            from_date: item?.from_date,
            to_date: item?.to_date,
            from_time: item?.from_time,
            to_time: item?.to_time,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
    return data || [];
  };

  const intialApiData = hasRoundTwo
    ? {
        max_no_of_interview: candidateDetails?.max_interview_allowed_candidate,
        max_no_of_offer: candidateDetails?.max_offer_accepted_candidate,
      }
    : {
        max_no_of_interview: candidateDetails?.max_interview_allowed_candidate,
        max_no_of_offer: candidateDetails?.max_offer_accepted_candidate,
        big_centre_start_date:
          candidateDetails?.big_center_change_start_date_candidate,
        big_centre_end_date:
          candidateDetails?.big_center_change_end_date_candidate,
        small_centre_start_date:
          candidateDetails?.small_center_change_start_date_candidate,
        small_centre_end_date:
          candidateDetails?.small_center_change_end_date_candidate,
      };

  useEffect(() => {
    setFormFields(intialApiData);
    const apiTableData = getAPITableData();
    const updatedtableData = isEditable
      ? [...apiTableData, ...[addTableData]]
      : apiTableData;
    setTableData(updatedtableData);
    if (hasRoundTwo) {
      setSelectedCenterTableData([
        {
          big_centre_start_date:
            candidateDetails?.center_change_start_date_candidate,
          big_centre_end_date:
            candidateDetails?.center_change_end_date_candidate,
        },
      ]);
    }
  }, [candidateDetails]);

  const handleSetError = (name, index) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      if (!newErrors[index]) {
        newErrors[index] = {};
      }
      newErrors[index][name] = `* ${intl.formatMessage({
        id: "label.error.fieldEmpty",
      })}`;
      return newErrors;
    });
  };

  const handleInputChange = (value, name) => {
    if (value === 0) {
      setFormErrors({
        ...formErrors,
        [name]: "field_cannot_be_zero",
      });
    } else {
      setFormFields((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      let error = false;
      if (value === null || value === "") {
        error = true;
      }
      setFormErrors({
        ...formErrors,
        [name]: error ? "fieldEmpty" : "",
      });
    }
  };

  const validate = (index) => {
    let errorCount = 0;
    if (!tableData[index]?.centre_name) {
      handleSetError("centre_name", index);
      errorCount += 1;
    }
    if (!tableData[index]?.from_date) {
      handleSetError("from_date", index);
      errorCount += 1;
    }
    if (!tableData[index]?.to_date) {
      handleSetError("to_date", index);
      errorCount += 1;
    }
    if (!tableData[index]?.from_time && !hasRoundTwo) {
      handleSetError("from_time", index);
      errorCount += 1;
    }
    if (!tableData[index]?.to_time && !hasRoundTwo) {
      handleSetError("to_time", index);
      errorCount += 1;
    }
    return errorCount <= 0;
  };

  const handleValidation = () => {
    let isValid = true;
    let newErrors = [];

    // Helper function to determine if an item is partially filled
    const isPartiallyFilled = (item) => {
      const fields = hasRoundTwo
        ? [item.centre_name, item.from_date, item.to_date]
        : [
            item.centre_name,
            item.from_date,
            item.to_date,
            item.from_time,
            item.to_time,
          ];
      const filledFields = fields.filter((field) => field);
      return filledFields.length > 0 && filledFields.length < fields.length;
    };

    // Check if any item is partially filled
    const anyPartiallyFilled = tableData.some(isPartiallyFilled);

    if (anyPartiallyFilled) {
      newErrors = tableData.map((item) => {
        if (isPartiallyFilled(item)) {
          return {
            centre_name: !item.centre_name
              ? intl.formatMessage({ id: "label.error.fieldEmpty" })
              : "",
            from_date: !item.from_date
              ? intl.formatMessage({ id: "label.error.fieldEmpty" })
              : "",
            to_date: !item.to_date
              ? intl.formatMessage({ id: "label.error.fieldEmpty" })
              : "",
            from_time:
              !item.from_time && !hasRoundTwo
                ? intl.formatMessage({ id: "label.error.fieldEmpty" })
                : "",
            to_time:
              !item.to_time && !hasRoundTwo
                ? intl.formatMessage({ id: "label.error.fieldEmpty" })
                : "",
          };
        }
        return {
          centre_name: "",
          from_date: "",
          to_date: "",
          from_time: "",
          to_time: "",
        };
      });
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
    }

    return isValid;
  };

  const isButtonDisable = () => {
    return !formFields?.max_no_of_interview || !formFields?.max_no_of_offer;
  };

  return {
    formErrors,
    formFields,
    getInitialFields,
    getRoundTwoInitialFields,
    handleInputChange,
    initialFormState,
    isButtonDisable,
    isStartDateEditable,
    isEndDateEditable,
    tableData,
    setTableData,
    handleAdd,
    handleRemove,
    handleValidation,
    handleSetError,
    selectedCenterTableData,
    errors,
    handleCandidateDataChange,
  };
};

export default useCandidateSettings;
