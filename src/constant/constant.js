import {
  CAMPUS_INTERVIEW_SETTINGS,
  CAMPUS_INTERVIEW_SETTINGS_ROUND_TWO,
  CONSENT_MARKING_ROUND_ONE,
  CONSENT_MARKING_ROUND_TWO,
  ROUND_ONE_ORIENTATION_CENTERS,
  ROUND_ONE_SETUP_CENTERS,
  ROUND_TWO_SETUP_CENTERS,
  SETUP_MOCK_INTERVIEW,
} from "../routes/routeNames";

export const API_VERSION_QUERY_PARAM = "api-version";
export const DEFAULT_PAGE_SIZE = 10;
export const TIMER_OF_15_MINUTES = 15;
export const TIMER_OF_1_MINUTES = 1;
export const SLIDE_BY = 300;
export const MESSAGE_MAX_LENGTH = 5000;
export const VALUE_ZERO = 0;
export const VALUE_ONE = 1;
export const VALUE_TWO = 2;
export const TYPE = "company";
export const HYPHEN = "-";
export const MAX_INPUT_LENGTH = 100;
export const MIN_INPUT_LENGTH = 0;
export const MAX_VIDEO_LENGTH = 999;
export const MIN_VIDEO_LENGTH = 1;
export const SESSION_ID_QUERY_PARAM = "session-id";

export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const STATUS_CODES = {
  SUCCESS_STATUS: 200,
  SUCCESS_POST: 201,
  NOT_FOUND: 404,
  UNAUTHORIZED_USER: 401,
};

export const SESSION_PATHS = [
  "setup-centers",
  "orientation-centers",
  "setup-mock-interview",
  "consent-marking",
  "campus-interview",
];

export const ROW_PER_PAGE_OPTIONS = [
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

export const VALID_ROW_PER_OPTIONS = [10, 20, 30, 40];

export const VALID_CONTACT_US_TABS_ID = ["1", "2"];
export const VALID_SESSION_TABS_ID = ["1", "2", "3"];
export const VALID_COMPANIES_TABS_ID = ["1", "2"];
export const VALID_CONSENT_MARKING_TABS_ID = {
  oneTab: ["1"],
  twoTab: ["1", "2"],
  threeTab: ["1", "2", "3"],
};
export const VALID_GLOBAL_CONFIGURATIONS_TABS_ID = ["1", "2"];

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

export const allModuleIdObject = {
  control: 12,
};

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
  FILTER: "filter",
  MODE: "mode",
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

export const COMPANY_INTERVIEW_TYPE = [
  {
    id: 1,
    label: "Written/Psychometric Test",
    value: "Written/Psychometric Test",
  },
  { id: 2, label: "Interviews", value: "Interviews" },
  { id: 3, label: "Group Discussion", value: "Group Discussion" },
];

export const COMPANY_TYPE_OPTIONS = [
  { id: 1, label: "Exempt", value: "exempt" },
  { id: 2, label: "Nil Rated", value: "nil rated" },
  { id: 3, label: "Bill of Supply", value: "bill of supply" },
  { id: 4, label: "Export", value: "export" },
  { id: 5, label: "SEZ", value: "sez" },
  { id: 6, label: "Deemed Export", value: "deemed export" },
  { id: 7, label: "Taxable", value: "taxable" },
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
    onClickNavigation: ROUND_ONE_SETUP_CENTERS,
  },
  {
    id: 2,
    imageUrl: "DeviceMessage",
    headingDescription:
      "Hone skills with simulated scenarios. Boost confidence through valuable practice.",
    headingIntl: "Setup Mock Interviews",
    onClickNavigation: SETUP_MOCK_INTERVIEW,
  },
  {
    id: 3,
    imageUrl: "Key",
    headingDescription:
      "Foster smooth transitions. Create welcoming spaces with essential information.",
    headingIntl: "Setup Orientation Centres",
    onClickNavigation: ROUND_ONE_ORIENTATION_CENTERS,
  },
  {
    id: 4,
    imageUrl: "Document",
    headingDescription:
      "Simplify onboarding. Gather participant info and ensure consent compliance.",
    headingIntl: "Registration and Consent Marking Schedule",
    onClickNavigation: CONSENT_MARKING_ROUND_ONE,
  },
  {
    id: 5,
    imageUrl: "Monitor",
    headingDescription:
      "Tailor campus interviews effortlessly. Customize preferences with an intuitive interface.",
    headingIntl: "Campus Interview Settings",
    onClickNavigation: CAMPUS_INTERVIEW_SETTINGS,
  },
];

export const ROUND_TWO_CARD_LIST = [
  {
    id: 1,
    imageUrl: "Building",
    headingDescription:
      "Streamline interview center management. Customize locations and logistics effortlessly.",
    headingIntl: "Setup Centres",
    onClickNavigation: ROUND_TWO_SETUP_CENTERS,
  },
  {
    id: 2,
    imageUrl: "Document",
    headingDescription:
      "Simplify onboarding. Gather participant info and ensure consent compliance.",
    headingIntl: "Registration and Consent Marking Schedule",
    onClickNavigation: CONSENT_MARKING_ROUND_TWO,
  },
  {
    id: 3,
    imageUrl: "Monitor",
    headingDescription:
      "Tailor campus interviews effortlessly. Customize preferences with an intuitive interface.",
    headingIntl: "Campus Interview Settings",
    onClickNavigation: CAMPUS_INTERVIEW_SETTINGS_ROUND_TWO,
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

export const CANDIDATES_EDUCATION_DETAILS = [
  "Education Details",
  "Exams",
  "Other Courses",
];
export const ALL_JOB_DETAILS = ["Job Details", "Questionnaire"];

export const CONTROL_MODULE_ID = 1;

export const ACTIVE_TAB = "activeTab";

export const STATUS = {
  CLOSED: "Closed",
  PENDING: "Pending",
  SUCCESS: "Success",
  ANSWERED: "Answered",
};

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
  BULK_NOTIFICATIONS: "bulk-notifications-management",
  TICKET_MANAGEMENT: "ticket-management",
  QUERY_MANAGEMENT: "query-management",
  TESTIMONIAL_MANAGEMENT: "testimonial-management",
  FEEDBACK_MANAGEMENT: "feedback-management",
  SUPPORT_EMAIL_MANGEMENT: "support-email-management",
  REGISTERED_COMPANIES: "registered-companies",
  SET_UP_SESSIONS: "setup-session",
  DASHBOARD: "dashboard",
  MANAGE_SUBSCRIPTIONS: "manage-subscriptions",
  GLOBAL_CONFIGURATIONS: "global-configs",
  MANAGE_PAYMENTS: "manage-payments",
  PAYMENTS: "payments",
  CANDIDATES: "candidates",
  COMPANIES: "companies",
  CONFIGURATIONS: "configurations",
  JOBS: "jobs",
  REPORT: "report",
  ROASTER: "roster",
  FEEDBACK: "feedback",
  CONTACT_US: "contact-us",
  ACTIVITY_LOGS: "activity-log",
  ALL_JOBS: "all-job-listing",
  ROUND_1_PLACEMENT: "round-1",
  ROUND_2_PLACEMENT: "round-2",
  CANDIDATE_DETAILS: "candidate-details",
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

export const ZOOM_CONSTANT = {
  MAX_ZOOM: 3,
  MIN_ZOOM: 1,
  ZOOM_STEP: 0.1,
};

export const ROTATE_IMAGE_BY = 90;

export const INITIAL_PASSWORD_DATA = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

export const SORTING_QUERY_PARAMS = {
  SORTED_KEY: "sorted-key",
  SORTED_DIRECTION: "sorted-direction",
};

export const NUMBER_OF_CHIPS_TO_SHOW = 15;

export const USER_PROFILE_QUERY_PARAMS = "user-profile";
export const ROUND_ID = "roundId";

export const MIN_SEARCH_TEXT_LENGTH = 2;
export const MIN_CHARACTERS_IN_INPUT_FIELD = 0;

export const CENTRE_TYPE_ENUM = {
  BIG: "big",
  SMALL: "small",
};

export const SESSION_KEY = "sessionKey";
export const MAX_HSN_CODE_LENGTH = 8;
export const MAX_BANK_AC_NO_LENGTH = 18;

export const ROLES = {
  SUPER_ADMIN: "super-admin",
};

export const MAX_CTC_LENGTH = 10;
export const MAX_EXPERIENCE_LENGTH = 2;
export const MAX_PARTNERS_LENGTH = 3;
export const MAX_VACANCIES_LENGTH = 4;
export const MAX_CHARACTERS_IN_INPUT_FIELD = 999;
export const SCHEDULE_INTERVIEW_ADDRESS_MAX_LENGTH = 250;

export const SHORTLISTED = "Shortlisted";
export const INTERVIEW_SCHEDULED = "Interview Scheduled"

export const PAYMENT_TYPE = {
  WHOLE: "whole",
  CENTRE_WISE: "centrewise",
};

export const INTERVIEW_TYPE = [
  { id: 1, label: "Online", value: "online" },
  { id: 2, label: "Offline", value: "offline" },
];

export const LIST_TYPE = [{ list: "ordered" }, { list: "bullet" }];
export const ATTACHMENT_TYPE = ["link", "image"];
export const LIST_OPTION = [
  { list: "ordered" },
  { list: "bullet" },
  { indent: "-1" },
  { indent: "+1" },
  { align: [] },
];

export const FORMAT = [
  "header",
  "height",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "color",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "size",
];

export const COLOR = [
  "#000000",
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
  "#444444",
  "#5c0000",
  "#663d00",
  "#666600",
  "#003700",
  "#002966",
  "#3d1466",
  "custom-color",
];

export const SIZE = ["small", false, "large", "huge"];

export const TEXT_FORMATS = [
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
];

export const MAX_REGISTRATION_FEE_LENGTH = 10;

export const NO_BREAK_SPACE = "\u00A0";

export const REGISTRATION_DATES = [
  { id: 1, labeIntl: "startDateCompanies" },
  { id: 2, labeIntl: "startDateCandidates" },
  { id: 3, labeIntl: "lastDateBigCentres" },
  { id: 4, labeIntl: "lastDateSmallCentres" },
];

export const REGISTRATIONS_DATES_FOR_ROUND_TWO = [
  { id: 1, labeIntl: "registrationStartDateCompanies" },
  { id: 2, labeIntl: "registrationEndDateCompanies" },
  { id: 3, labeIntl: "registrationStartDateCandidates" },
  { id: 4, labeIntl: "registrationEndDateCandidates" },
  { id: 5, labeIntl: "startShortlistingbyCompany" },
  { id: 6, labeIntl: "endShortlistingbyCompany" },
  { id: 7, labeIntl: "startCondidateConsentmarking" },
  { id: 8, labeIntl: "endCondidateConsentmarking" },
  { id: 9, labeIntl: "writtenTestDate" },
];

export const ENTITY_OPTIONS = [
  { id: 1, label: "Corporate", value: "Corporate" },
  { id: 2, label: "Non-Corporate", value: "Non-corporate" },
  {
    id: 3,
    label: "Firm of Chartered Accountants",
    value: "Firm of chartered accountants",
  },
  { id: 4, vlabel: "PSU", value: "PSU" },
];

export const SALUTATION_OPTIONS = [
  { id: 1, label: "Mr.", value: "Mr." },
  { id: 2, label: "Ms.", value: "Ms." },
  { id: 3, label: "Dr.", value: "Dr." },
];

export const NATURE_OF_SUPPLIER_OPTIONS = [
  { id: 1, label: "Registered", value: "Registered" },
  { id: 2, label: "Unregistered", value: "Unregistered" },
  { id: 3, label: "Composition Supplier", value: "Composition Supplier" },
  { id: 4, label: "UIN Holder", value: "UIN Holder" },
];

export const SOURCE_OF_INFORM_ICAI_OPTIONS = [
  "Email from CMIB",
  "Based on previous participation",
  "Campus",
  "Telephonic Call from ICAI Officials",
  "Programme brochure from ICAI",
  "Advertisement in the Chartered Accountant Journal",
];
