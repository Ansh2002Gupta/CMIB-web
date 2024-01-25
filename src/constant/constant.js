import { SETUP_CENTERS, CONSENT_MARKING } from "../routes/routeNames";

export const DEFAULT_PAGE_SIZE = 10;
export const TIMER_OF_15_MINUTES = 15;
export const TIMER_OF_1_MINUTES = 1;
export const SLIDE_BY = 300;

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
    value: 2,
    label: 2,
  },
  {
    value: 10,
    label: 10,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 30,
    label: 30,
  },
  {
    value: 40,
    label: 40,
  },
];

export const VALID_ROW_PER_OPTIONS = [2, 10, 20, 30, 40];

export const VALID_CONTACT_US_TABS_ID = ["1", "2"];
export const VALID_CONSENT_MARKING_TABS_ID = ["1", "2", "3"];

// TODO: Need to remove it once the new custom multi-select is integrated.
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
  VIEW_ONLY: "view",
  EDITABLE: "edit",
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

export const allAccessIdObject = [
  { text: "Bulk notification", id: 7 },
  { text: "User Management", id: 8 },
  { text: "Ticket Management", id: 9 },
  { text: "Query Management", id: 10 },
  { text: "Testimonial Management", id: 11 },
  { text: "Registered Companies", id: 12 },
  { text: "NQCA-Placement", id: 3 },
  { text: "Overseas-Placement", id: 4 },
  { text: "Career-Ascent", id: 5 },
  { text: "Women-Placement", id: 6 },
  { text: "Ca-jobs", id: 2 },
  { text: "Control", id: 1 },
];

export const ALLOWED_MOBILE_PREFIXES = [
  {
    value: "91",
    label: "+91",
  },
];

export const PAGINATION_PROPERTIES = {
  CURRENT_PAGE: "current-page",
  ROW_PER_PAGE: "row-per-page",
  SEARCH_QUERY: "search-query",
};

//TODO:need to implement it using api
//TODO:need to implement it using api
export const SESSION_PERIOD = [
  { id: 101, label: "May 2025", value: "May 2025" },
  { id: 102, label: "November 2025", value: "November 2025" },
  { id: 103, label: "May 2024", value: "May 2024" },
  { id: 104, label: "November 2024", value: "November 2024" },
  { id: 105, label: "May 2023", value: "May 2023" },
  { id: 106, label: "November 2023", value: "November 2023" },
  { id: 107, label: "May 2022", value: "May 2022" },
  { id: 108, label: "November 2022", value: "November 2022" },
  { id: 109, label: "May 2021", value: "May 2021" },
  { id: 110, label: "November 2021", value: "November 2021" },
  { id: 111, label: "May 2020", value: "May 2020" },
  { id: 112, label: "November 2020", value: "November 2020" },
];

export const CENTRE_TYPE = [
  { id: 1, label: "Small Centre", value: "small" },
  { id: 2, label: "Big Centre", value: "big" },
];

export const ROUND_ONE_CARD_LIST = [
  {
    id: 1,
    imageUrl: "Building",
    headingDescription:
      "Streamline interview center management. Customize locations and logistics effortlessly.",
    headingIntl: "Setup Centres",
    onClickNaviagtion: SETUP_CENTERS,
  },
  {
    id: 2,
    imageUrl: "DeviceMessage",
    headingDescription:
      "Hone skills with simulated scenarios. Boost confidence through valuable practice.",
    headingIntl: "Mock Interviews",
    onClickNaviagtion: SETUP_CENTERS,
  },
  {
    id: 3,
    imageUrl: "Key",
    headingDescription:
      "Foster smooth transitions. Create welcoming spaces with essential information.",
    headingIntl: "Orientation Centres",
    onClickNaviagtion: SETUP_CENTERS,
  },
  {
    id: 4,
    imageUrl: "Document",
    headingDescription:
      "Simplify onboarding. Gather participant info and ensure consent compliance.",
    headingIntl: "Registration and Consent Marking Schedule",
    onClickNaviagtion: CONSENT_MARKING,
  },
  {
    id: 5,
    imageUrl: "Monitor",
    headingDescription:
      "Tailor campus interviews effortlessly. Customize preferences with an intuitive interface.",
    headingIntl: "Campus Interview Settings",
    onClickNaviagtion: SETUP_CENTERS,
  },
];

export const ROUND_TWO_CARD_LIST = [
  {
    id: 1,
    imageUrl: "Building",
    headingDescription:
      "Streamline interview center management. Customize locations and logistics effortlessly.",
    headingIntl: "Setup Centres",
    onClickNaviagtion: SETUP_CENTERS,
  },
  {
    id: 2,
    imageUrl: "Document",
    headingDescription:
      "Simplify onboarding. Gather participant info and ensure consent compliance.",
    headingIntl: "Registration and Consent Marking Schedule",
    onClickNaviagtion: CONSENT_MARKING,
  },
  {
    id: 3,
    imageUrl: "Monitor",
    headingDescription:
      "Tailor campus interviews effortlessly. Customize preferences with an intuitive interface.",
    headingIntl: "Campus Interview Settings",
    onClickNaviagtion: SETUP_CENTERS,
  },
];

export const COMPANY_ROUND_ONE = [
  "Company Profile",
  "Job Details",
  "Pre-Interview Preferences",
  "Centre Details",
  "Billing Info",
  "Payment",
  "Interview Roster",
  "Consent Marking And Interview Process",
];

export const COMPANY_ROUND_TWO = [
  "Company Profile",
  "Job Details",
  "Pre-Interview Preferences",
  "Centre Details",
  "Interview Roster",
  "Consent Marking And Interview Process",
];

export const CITY_CENTERS = [
  { id: 101, label: "Delhi", value: "Delhi" },
  { id: 102, label: "Mumbai", value: "Mumbai" },
  { id: 103, label: "Gurugram", value: "Gurugram" },
  { id: 104, label: "Pune", value: "Pune" },
  { id: 105, label: "Banglore", value: "Banglore" },
  { id: 106, label: "Goa", value: "Goa" },
];

export const CONTROL_MODULE_ID = 1;

export const ACTIVE_TAB = "activeTab";

export const MODULE_KEYS = {
  CONTROL_KEY: "control",
  NEWLY_QUALIFIED_PLACEMENTS_KEY: "nqca-placements",
  CA_JOBS_KEY: "ca-jobs",
  EXPERIENCED_MEMBERS_KEY: "experienced-members",
  CARRER_ASCENT_KEY: "career-ascents",
  WOMEN_PARTTIME_KEY: "women-placements",
  OVERSEAS_CHAPTERS_KEY: "overseas-chapters",
};

export const MENU_KEYS = {
  USER_MANAGEMENT: "user-management",
  BULK_NOTIFICATIONS: "bulk-notifications",
  TICKET_MANAGEMENT: "ticket-management",
  QUERY_MANAGEMENT: "query-management",
  TESTIMONIAL_MANAGEMENT: "testimonial-management",
  REGISTERED_COMPANIES: "registered-companies",
  SESSIONS: "setup-session",
  DASHBOARD: "dashboard",
  SUBSCRIPTIONS: "manage-subscriptions",
  GLOBAL_CONFIGURATIONS: "global-configs",
  PAYMENTS: "payments",
  CANDIDATES: "candidates",
  COMPANIES: "companies",
  JOBS: "jobs",
  REPORT: "report",
  ROASTER: "roster",
  FEEDBACK: "feedback",
  CONTACT_US: "contact-us",
  ACTIVITY_LOGS: "activity_logs",
  ALL_JOBS: "all-job-listing",
  ROUND_1_PLACEMENT: "round-1",
  ROUND_2_PLACEMENT: "round-2",
  CANDIDATE_DETAILS: "company-details",
  COMPANY_DETAILS: "company-details",
  MANAGE_CANDIDATES: "manage-candidates",
  MANAGE_COMPANIES: "manage-companies",
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  USER_DATA: "userData",
};

export const SORT_VALUES = {
  ASCENDING: "asc",
  DESCENDING: "desc",
};

export const DEBOUNCE_TIME = 500;

export const SORT_PROPERTIES = {
  SORT_BY: "sortBy",
};

export const GENERIC_ERROR_MESSAGE = "Placeholder text";
