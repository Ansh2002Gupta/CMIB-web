export const getPasswordStrengthPointsArray = (intl, passwordValidations) => {
    return [
      {
        str: intl.formatMessage({ id: "label.passwordStrengthCheck1" }),
        isValid: passwordValidations.atLeast6Characters,
      },
      {
        str: intl.formatMessage({ id: "label.passwordStrengthCheck2" }),
        isValid: passwordValidations.oneNumericValue,
      },
      {
        str: intl.formatMessage({ id: "label.passwordStrengthCheck3" }),
        isValid: passwordValidations.oneCapitalLetterValue,
      },
      {
        str: intl.formatMessage({ id: "label.passwordStrengthCheck4" }),
        isValid: passwordValidations.oneSmallLetterValue,
      },
      {
        str: intl.formatMessage({ id: "label.passwordStrengthCheck5" }),
        isValid: passwordValidations.oneSpecialCharacterValue,
      },
    ];
  };

