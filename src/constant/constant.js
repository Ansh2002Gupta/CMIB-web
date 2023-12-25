export const PAGE_SIZE = 10;
export const TIMER_OF_15_MINUTES = 15;
export const TIMER_OF_1_MINUTES = 1;

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
    value: 10,
    label: 10,
  },
  {
    value: 15,
    label: 15,
  },
  {
    value: 20,
    label: 20,
  },
];

export const ACCESS_OPTIONS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "placements",
    label: "Placements",
  },
  {
    value: "ca-jobs",
    label: "CA-Jobs",
  },
];

export const ROLE_ID_MAPPING = {
  placements: 1,
  "ca-jobs": 2,
};

export const ALL_ROLE_ID = [1, 2];
