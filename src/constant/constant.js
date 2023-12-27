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
    heading: "Controls",
    options: [
      { text: "Bulk notification", id: 7 },
      { text: "User Management", id: 8 },
      { text: "Ticket Management", id: 9 },
      { text: "Query Management", id: 10 },
      { text: "Testimonial Management", id: 11 },
      { text: "Registered Companies", id: 12 },
    ],
    allOptionIds: [7, 8, 9, 10, 11, 12],
  },
  {
    id: 2,
    heading: "CA-Jobs",
    options: [{ text: "Ca-jobs", id: 2 }],
    allOptionIds: [2],
  },
  {
    id: 3,
    heading: "Placements",
    options: [
      { text: "NQCA-Placement", id: 3 },
      { text: "Overseas-Placement", id: 4 },
      { text: "Career-Ascent", id: 5 },
      { text: "Women-Placement", id: 6 },
    ],
    allOptionIds: [3, 4, 5, 6],
  },
];
