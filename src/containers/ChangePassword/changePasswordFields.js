export const FIELDS = (old_password, new_password, confirm_password) => {
  return [
    {
      id: 1,
      headingIntl: "oldPassword",
      label: "old_password",
      value: old_password,
      rules: [
        {
          required: true,
          message: "Please enter Old Password",
        },
      ],
    },
    {
      id: 2,
      headingIntl: "newPassword",
      label: "new_password",
      value: new_password,
      rules: [
        {
          required: true,
          message: "Please enter New Password",
        },
      ],
    },
    {
      id: 3,
      headingIntl: "confirmPassword",
      label: "confirm_password",
      value: confirm_password,
      rules: [
        {
          required: true,
          message: "Please enter Confirm Password",
        },
      ],
    },
  ];
};
