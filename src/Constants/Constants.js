export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const AT_LEAST_SIX_CHARACTERS_REGEX = /.{6,}/;
export const AT_LEAST_ONE_CAPITAL_LETTER = /(?=.*[A-Z])/;
export const AT_LEAST_ONE_SMALL_LETTER = /(?=.*[a-z])/;
export const AT_LEAST_ONE_NUMERIC_VALUE = /(?=.*\d)/;
export const AT_LEAST_ONE_SPECIAL_CHARACTER = /(?=.*[!?.@#$%^&+=])/;
export const ADMIN_ROUTE = "admin";

export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const STATUS_CODES = {
  SUCCESS_STATUS: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED_USER: 401,
};

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
