// Note: The following constants variable names has been already updated to proper casing in login api integration branch.
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const atLeast6CharacterRegex = /.{6,}/;
export const atLeastOneCapitalLetter = /(?=.*[A-Z])/;
export const atLeastOneSmallLetter = /(?=.*[a-z])/;
export const atLeastOneNumericValue = /(?=.*\d)/;
export const atLeastOneSpecialCharacter = /(?=.*[!?.@#$%^&+=])/;
export const ADMIN_ROUTE = "admin";

export const ROW_PER_PAGE_OPTIONS = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "15",
    label: "15",
  },
  {
    value: "20",
    label: "20",
  },
];
