import { useState } from "react";
import { useIntl } from "react-intl";

const useCandidateSettings = () => {
  const addTableData = {
    isAddRow: true,
    centre: "",
    from_date: null,
    to_date: null,
    from_time: null,
    to_time: null,
  };

  const [tableData, setTableData] = useState([addTableData]);
  const intl = useIntl();
  const [errors, setErrors] = useState(
    tableData.map(() => ({
      centre: "",
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
      setTableData((prevTableData) => {
        delete prevTableData[index].isAddRow;
        return [...prevTableData, addTableData];
      });
    }
  };

  const handleTableChange = (value, name, index) => {
    setTableData((prevTableData) => {
      const newTableData = [...prevTableData];
      newTableData[index] = {
        ...newTableData[index],
        [name]: value,
      };
      return newTableData;
    });
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
  };

  const initialFormState = {
    max_no_of_interview: "",
    max_no_of_offer: "",
    big_centre_start_date: null,
    big_centre_end_date: null,
    small_centre_start_date: null,
    small_centre_end_date: null,
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
            isRequired: true,
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
            isRequired: true,
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
            isRequired: true,
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
            isRequired: true,
            message: "small_centre_end_date",
          },
        },
      ],
    ];
  };

  const [formFields, setFormFields] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  const handleSetError = (name, index) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      console.log({ newErrors });
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
  };

  const validate = (index) => {
    let errorCount = 0;
    if (!tableData[index]?.centre) {
      handleSetError("centre", index);
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
    if (!tableData[index]?.from_time) {
      handleSetError("from_time", index);
      errorCount += 1;
    }
    if (!tableData[index]?.to_time) {
      handleSetError("to_time", index);
      errorCount += 1;
    }
    return errorCount <= 0;
  };

  const isButtonDisable = () => {
    return (
      !formFields?.max_no_of_interview ||
      !formFields?.max_no_of_offer ||
      !formFields?.big_centre_start_date ||
      !formFields?.big_centre_end_date ||
      !formFields?.small_centre_start_date ||
      !formFields?.small_centre_end_date
    );
  };

  return {
    formErrors,
    formFields,
    getInitialFields,
    handleInputChange,
    initialFormState,
    isButtonDisable,
    tableData,
    setTableData,
    handleAdd,
    handleRemove,
    handleSetError,
    errors,
    handleTableChange,
  };
};

export default useCandidateSettings;
