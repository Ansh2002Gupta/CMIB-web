import dayjs from "dayjs";

import { compareTwoDayjsDates, isNotAFutureDate } from "../../constant/utils";

const handleError = (key, error, index, setErrors) => {
  setErrors((prevTableError) => {
    const newTableError = [...prevTableError];
    newTableError[index] = {
      ...newTableError[index],
      [key]: error,
    };
    return newTableError;
  });
};

export const disabledDate = (key, current, registrationDatesData) => {
  if (key === "company_reg_start_date") {
    return (
      isNotAFutureDate(current) ||
      compareTwoDayjsDates({
        current: current,
        date: registrationDatesData["candidate_reg_end_date_bg_centre"],
        checkForFuture: true,
      }) ||
      compareTwoDayjsDates({
        current: current,
        date: registrationDatesData["candidate_reg_end_date_sm_centre"],
        checkForFuture: true,
      })
    );
  }
  if (key === "candidate_reg_start_date") {
    return (
      isNotAFutureDate(current) ||
      compareTwoDayjsDates({
        current: current,
        date: registrationDatesData["candidate_reg_end_date_bg_centre"],
        checkForFuture: true,
      }) ||
      compareTwoDayjsDates({
        current: current,
        date: registrationDatesData["candidate_reg_end_date_sm_centre"],
        checkForFuture: true,
      })
    );
  }
  if (key === "candidate_reg_end_date_bg_centre")
    return (
      isNotAFutureDate(current) ||
      compareTwoDayjsDates({
        current: current,
        date: registrationDatesData["company_reg_start_date"],
        checkForFuture: false,
      }) ||
      compareTwoDayjsDates({
        current: current,
        date: registrationDatesData["candidate_reg_start_date"],
        checkForFuture: false,
      }) ||
      compareTwoDayjsDates({
        current: current,
        date: registrationDatesData["candidate_reg_end_date_sm_centre"],
        checkForFuture: true,
      })
    );
  return (
    isNotAFutureDate(current) ||
    compareTwoDayjsDates({
      current: current,
      date: registrationDatesData["company_reg_start_date"],
      checkForFuture: false,
    }) ||
    compareTwoDayjsDates({
      current: current,
      date: registrationDatesData["candidate_reg_start_date"],
      checkForFuture: false,
    }) ||
    compareTwoDayjsDates({
      current: current,
      date:
        registrationDatesData["candidate_reg_end_date_bg_centre"] ||
        registrationDatesData["candidate_reg_start_date"],
      checkForFuture: false,
    })
  );
};

export const onDateChange = (
  intl,
  record,
  key,
  value,
  tableData,
  setTableData,
  setErrors
) => {
  const index = tableData.findIndex((item) => item.id === record.id);
  const newData = [...tableData];
  newData[index][key] = value && dayjs(value).format("YYYY-MM-DD");
  setTableData(newData);
  if (!value) {
    handleError(
      key,
      intl.formatMessage({ id: "label.error.fieldEmpty" }),
      index,
      setErrors
    );
  } else {
    handleError(key, "", index, setErrors);
  }
};

export const NQCA_REGISTRATION_DATE_FIELDS = [
  {
    id: 1,
    labeIntl: "company_reg_start_date",
  },
  {
    id: 2,
    labeIntl: "candidate_reg_start_date",
  },
  {
    id: 3,
    labeIntl: "candidate_reg_end_date_bg_centre",
  },
  {
    id: 4,
    labeIntl: "candidate_reg_end_date_sm_centre",
  },
];

export const OTHER_MODULES_REGISTRATION_DATE_FIELDS = [
  {
    id: 1,
    labeIntl: "company_reg_start_date",
  },
  {
    id: 2,
    labeIntl: "candidate_reg_start_date",
  },
  {
    id: 3,
    labeIntl: "candidate_reg_end_date_bg_centre",
  },
];

export const handleInputChange = (
  value,
  name,
  setRegistrationDatesData,
  setRegistrationError,
  intl
) => {
  setRegistrationDatesData((prevFormData) => ({
    ...prevFormData,
    [name]: value && dayjs(value).format("YYYY-MM-DD"),
  }));

  if (!value) {
    setRegistrationError((prev) => {
      return {
        ...prev,
        [name]: intl.formatMessage({ id: "label.error.fieldEmpty" }),
      };
    });
  } else {
    setRegistrationError((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
  }
};

export const useIntitalDataAndError = ({
  consentRoundOneData,
  consentRoundTwoData,
  lastRegistrationDatesData,
}) => {
  const roundOneInitialData = consentRoundOneData?.map((item) => ({
    ...item,
    sNo: item.id,
    centre_name: item.centre_name,
    company_shortlisting_start_date: item.company_shortlisting_start_date
      ? item.company_shortlisting_start_date
      : null,
    company_shortlisting_end_date: item.company_shortlisting_end_date
      ? item.company_shortlisting_end_date
      : null,
    candidate_consent_marking_start_date:
      item.candidate_consent_marking_start_date
        ? item.candidate_consent_marking_start_date
        : null,
    candidate_consent_marking_end_date: item.candidate_consent_marking_end_date
      ? item.candidate_consent_marking_end_date
      : null,
  }));

  const roundTwoInitialData = consentRoundTwoData?.map((item) => ({
    ...item,
    id: item.id,
    centre_name: item.centre_name,
    company_shortlisting_start_date: item.company_shortlisting_start_date
      ? item.company_shortlisting_start_date
      : null,
    company_shortlisting_end_date: item.company_shortlisting_end_date
      ? item.company_shortlisting_end_date
      : null,
    candidate_consent_marking_start_date:
      item.candidate_consent_marking_start_date
        ? item.candidate_consent_marking_start_date
        : null,
    candidate_consent_marking_end_date: item.candidate_consent_marking_end_date
      ? item.candidate_consent_marking_end_date
      : null,
  }));

  const lastRegistrationInitialData = lastRegistrationDatesData?.map(
    (item) => ({
      ...item,
      id: item.id,
      name: item.name,
      company_reg_end_date: item.company_reg_end_date
        ? item.company_reg_end_date
        : null,
      psychometric_test_date: item.psychometric_test_date
        ? item.psychometric_test_date
        : null,
    })
  );

  const roundOneInitialError = consentRoundOneData?.map((item) => ({
    centre_name: "",
    company_shortlisting_start_date: "",
    company_shortlisting_end_date: "",
    candidate_consent_marking_start_date: "",
    candidate_consent_marking_end_date: "",
  }));

  const roundTwoInitialError = consentRoundTwoData?.map((item) => ({
    centre_name: "",
    company_shortlisting_start_date: "",
    company_shortlisting_end_date: "",
    candidate_consent_marking_start_date: "",
    candidate_consent_marking_end_date: "",
  }));

  const lastRegistrationInitialError = lastRegistrationDatesData?.map(
    (item) => ({
      name: "",
      company_reg_end_date: "",
      psychometric_test_date: "",
    })
  );

  return {
    roundOneInitialData,
    roundTwoInitialData,
    lastRegistrationInitialData,
    roundOneInitialError,
    roundTwoInitialError,
    lastRegistrationInitialError,
  };
};

export const validate = ({
  activeTab,
  intl,
  lastRegistrationTableData,
  roundOneTableData,
  roundTwoTableData,
  setLastRegistrationError,
  setRoundOneError,
  setRoundTwoError,
}) => {
  let errorCount = 0;
  if (activeTab === "1") {
    lastRegistrationTableData.map((item, index) => {
      if (!item?.company_reg_end_date) {
        errorCount++;
        handleError(
          "company_reg_end_date",
          intl.formatMessage({ id: "label.error.fieldEmpty" }),
          index,
          setLastRegistrationError
        );
      }
      if (!item?.psychometric_test_date) {
        errorCount++;
        handleError(
          "psychometric_test_date",
          intl.formatMessage({ id: "label.error.fieldEmpty" }),
          index,
          setLastRegistrationError
        );
      }
    });
  }
  if (activeTab === "2") {
    roundOneTableData.map((item, index) => {
      if (!item?.candidate_consent_marking_end_date) {
        errorCount++;
        handleError(
          "candidate_consent_marking_end_date",
          intl.formatMessage({ id: "label.error.fieldEmpty" }),
          index,
          setRoundOneError
        );
      }
      if (!item?.candidate_consent_marking_start_date) {
        errorCount++;
        handleError(
          "candidate_consent_marking_start_date",
          intl.formatMessage({ id: "label.error.fieldEmpty" }),
          index,
          setRoundOneError
        );
      }
      if (!item?.company_shortlisting_end_date) {
        errorCount++;
        handleError(
          "company_shortlisting_end_date",
          intl.formatMessage({ id: "label.error.fieldEmpty" }),
          index,
          setRoundOneError
        );
      }
      if (!item?.company_shortlisting_start_date) {
        errorCount++;
        handleError(
          "company_shortlisting_start_date",
          intl.formatMessage({ id: "label.error.fieldEmpty" }),
          index,
          setRoundOneError
        );
      }
    });
  }
  if (activeTab === "3") {
    roundTwoTableData.map((item, index) => {
      if (!item?.candidate_consent_marking_end_date) {
        errorCount++;
        handleError(
          "candidate_consent_marking_end_date",
          intl.formatMessage({ id: "label.error.fieldEmpty" }),
          index,
          setRoundTwoError
        );
      }
      if (!item?.candidate_consent_marking_start_date) {
        errorCount++;
        handleError(
          "candidate_consent_marking_start_date",
          intl.formatMessage({ id: "label.error.fieldEmpty" }),
          index,
          setRoundTwoError
        );
      }
      if (!item?.company_shortlisting_end_date) {
        errorCount++;
        handleError(
          "company_shortlisting_end_date",
          intl.formatMessage({ id: "label.error.fieldEmpty" }),
          index,
          setRoundTwoError
        );
      }
      if (!item?.company_shortlisting_start_date) {
        errorCount++;
        handleError(
          "company_shortlisting_start_date",
          intl.formatMessage({ id: "label.error.fieldEmpty" }),
          index,
          setRoundTwoError
        );
      }
    });
  }
  if (errorCount) {
    return false;
  }
  return true;
};
