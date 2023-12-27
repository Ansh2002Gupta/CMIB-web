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
    value: "CA-Jobs",
    label: "CA-Jobs",
  },
];

export const ROLE_ID_MAPPING = {
  placements: 1,
  "ca-jobs": 2,
};

export const ALL_ROLE_ID = [1, 2];

export const FORM_STATES = {
  VIEW_ONLY: "view only",
  EDITABLE: "editable",
  EMPTY: "empty",
};

export const NOTIFICATION_POSITIONS = {
  TOP_RIGHT: "topRight",
  TOP_LEFT: "topLeft",
  BOTTOM_RIGHT: "bottomRight",
  BOTTOM_LEFT: "bottomLeft",
};

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const ADD_NEW_USER_ACCESS_OPTIONS = [
  {
    id: 1,
    heading: "Placements",
    options: [
      "All",
      "NQCA-Placement",
      "Overseas-Placement",
      "Career-Ascent",
      "Women-Placement",
    ],
  },
  {
    id: 2,
    heading: "CA-Jobs",
    options: ["Ca-jobs"],
  },
  {
    id: 3,
    heading: "Controls",
    options: [
      "AlL",
      "Bulk notification",
      "User Management",
      "Ticket Management",
      "Query Management",
      "Testimonial Management",
      "Registered Companies",
    ],
  },
];
