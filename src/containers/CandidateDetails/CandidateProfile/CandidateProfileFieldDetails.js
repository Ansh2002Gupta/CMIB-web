export const PERSONAL_DETAILS_FEILDS = (
  gender,
  marital_status,
  date_of_birth,
  email,
  passport,
  passport_no,
) => {
  return [
    {
      id: 1,
      headingIntl: "gender",
      label: "gender",
      value: gender,
    },
    {
      id: 2,
      headingIntl: "maritalStatus",
      label: "marital_status",
      value: marital_status,
    },
    {
      id: 3,
      headingIntl: "dateOfBirth",
      label: "date_of_birth",
      value: date_of_birth,
    },
    {
      id: 4,
      headingIntl: "email",
      label: "email",
      value: email,
    },
    {
      id: 5,
      headingIntl: "passport",
      label: "passport",
      value: passport,
    },
    {
      id: 6,
      headingIntl: "passportNo",
      label: "passport_no",
      value: passport_no,
    },
  ];
};

export const CORRESPONDENCE_ADDRESS_FEILDS = (
  address1,
  address2,
  address3,
  country,
  state,
  city,
  pin_code,
  mobile_no,
  phone_no,
  nationality,
  mobile_country_code,
) => {
  return [
    {
      id: 1,
      headingIntl: "address1",
      label: "address1",
      value: address1,
    },
    {
      id: 2,
      headingIntl: "address2",
      label: "address2",
      value: address2,
    },
    {
      id: 3,
      headingIntl: "address3",
      label: "address3",
      value: address3,
    },
    {
      id: 4,
      headingIntl: "country",
      label: "country",
      value: country,
    },
    {
      id: 5,
      headingIntl: "state",
      label: "state",
      value: state,
    },
    {
      id: 6,
      headingIntl: "city",
      label: "city",
      value: city,
    },    {
      id: 7,
      headingIntl: "pin_code",
      label: "pin_code",
      value: pin_code,
    },
    {
      id: 8,
      headingIntl: "mobile_no",
      label: "mobile_no",
      value: `${mobile_country_code}-${mobile_no}`,
    },
    {
      id: 9,
      headingIntl: "phone_no",
      label: "phone_no",
      value: phone_no,
    },
    {
      id: 10,
      headingIntl: "nationality",
      label: "nationality",
      value: nationality,
    },
  ];
};

export const PERMANENT_ADDRESS_FEILDS = (
  address1,
  address2,
  address3,
  country,
  state,
  city,
  pin_code,
) => {
  return [
    {
      id: 1,
      headingIntl: "address1",
      label: "address1",
      value: address1,
    },
    {
      id: 2,
      headingIntl: "address2",
      label: "address2",
      value: address2,
    },
    {
      id: 3,
      headingIntl: "address3",
      label: "address3",
      value: address3,
    },
    {
      id: 4,
      headingIntl: "country",
      label: "country",
      value: country,
    },
    {
      id: 5,
      headingIntl: "state",
      label: "state",
      value: state,
    },
    {
      id: 6,
      headingIntl: "city",
      label: "city",
      value: city,
    },    {
      id: 7,
      headingIntl: "pin_code",
      label: "pin_code",
      value: pin_code,
    },
  ];
};
