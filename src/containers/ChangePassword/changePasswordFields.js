export const FIELDS = (oldPassword, newPassword, confirmPassword) => {
  return [
    {
      id: 1,
      headingIntl: "oldPassword",
      label: "old_password",
      value: oldPassword,
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
      value: newPassword,
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
      value: confirmPassword,
      rules: [
        {
          required: true,
          message: "Please enter Confirm Password",
        },
      ],
    },
  ];
};
