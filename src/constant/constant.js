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

export const ROUND_ONE_CARD_LIST = [
  {
    id: 1,
    imageUrl: "Building",
    headingDescription:
      "Streamline interview center management. Customize locations and logistics effortlessly.",
    headingIntl: "Setup Centres",
  },
  {
    id: 2,
    imageUrl: "DeviceMessage",
    headingDescription:
      "Hone skills with simulated scenarios. Boost confidence through valuable practice.",
    headingIntl: "Mock Interviews",
  },
  {
    id: 3,
    imageUrl: "Key",
    headingDescription:
      "Foster smooth transitions. Create welcoming spaces with essential information.",
    headingIntl: "Orientation Centres",
  },
  {
    id: 4,
    imageUrl: "Document",
    headingDescription:
      "Simplify onboarding. Gather participant info and ensure consent compliance.",
    headingIntl: "Registration and Consent Marking Schedule",
  },
  {
    id: 5,
    imageUrl: "Monitor",
    headingDescription:
      "Tailor campus interviews effortlessly. Customize preferences with an intuitive interface.",
    headingIntl: "Campus Interview Settings",
  },
];

export const ROUND_TWO_CARD_LIST = [
  {
    id: 1,
    imageUrl: "Building",
    headingDescription:
      "Streamline interview center management. Customize locations and logistics effortlessly.",
    headingIntl: "Setup Centres",
  },
  {
    id: 2,
    imageUrl: "Document",
    headingDescription:
      "Simplify onboarding. Gather participant info and ensure consent compliance.",
    headingIntl: "Registration and Consent Marking Schedule",
  },
  {
    id: 3,
    imageUrl: "Monitor",
    headingDescription:
      "Tailor campus interviews effortlessly. Customize preferences with an intuitive interface.",
    headingIntl: "Campus Interview Settings",
  },
];

export const CITY_CENTERS = [
  { id: 101, label: "Delhi", value: "Delhi" },
  { id: 102, label: "Mumbai", value: "Mumbai" },
  { id: 103, label: "Gurugram", value: "Gurugram" },
  { id: 104, label: "Pune", value: "Pune" },
  { id: 105, label: "Banglore", value: "Banglore" },
  { id: 106, label: "Goa", value: "Goa" },
];
