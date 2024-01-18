import { UserOutlined } from "@ant-design/icons";
import {
  COMPANIES,
  CONFIGURE_CENTRES,
  DASHBOARD,
  SESSION,
  USERS,
  SUBSCRIPTIONS,
} from "../../routes/routeNames";
import { MODULE_KEYS, MENU_KEYS } from "../../constant/constant";

// TODO: need to add icons according to menu
const controlMenu = [
  { label: MENU_KEYS.USER_MANAGEMENT, key: USERS, icon: <UserOutlined /> },
  {
    label: MENU_KEYS.BULK_NOTIFICATIONS,
    key: "/notifications",
    icon: <UserOutlined />,
  },
  { label: MENU_KEYS.CONTACT_US, key: "/contact-us", icon: <UserOutlined /> },
  { label: MENU_KEYS.SESSIONS, key: SESSION, icon: <UserOutlined /> },
  { label: MENU_KEYS.FEEDBACK, key: "/feedback", icon: <UserOutlined /> },
  {
    label: MENU_KEYS.TESTIMONIAL_MANAGEMENT,
    key: "/testimonials",
    icon: <UserOutlined />,
  },
  {
    label: MENU_KEYS.REGISTERED_COMPANIES,
    key: "/register-companies",
    icon: <UserOutlined />,
  },
  {
    label: MENU_KEYS.ACTIVITY_LOGS,
    key: "/activity-logs",
    icon: <UserOutlined />,
  },
];
const newlyQualifiedPlacementsMenu = [
  { label: MENU_KEYS.DASHBOARD, key: DASHBOARD, icon: <UserOutlined /> },
  {
    label: MENU_KEYS.ROUND_1_PLACEMENT,
    key: "/round-1-placements",
    icon: <UserOutlined />,
  },
  {
    label: MENU_KEYS.ROUND_2_PLACEMENT,
    key: "/round-2-placements",
    icon: <UserOutlined />,
  },
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <UserOutlined />,
  },
  { label: MENU_KEYS.COMPANIES, key: COMPANIES, icon: <UserOutlined /> },
];
const caJobsMenu = [
  { label: MENU_KEYS.DASHBOARD, key: DASHBOARD, icon: <UserOutlined /> },
  {
    label: MENU_KEYS.SUBSCRIPTIONS,
    key: SUBSCRIPTIONS,
    icon: <UserOutlined />,
  },
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <UserOutlined />,
  },
  { label: MENU_KEYS.PAYMENTS, key: "/payments", icon: <UserOutlined /> },
  { label: MENU_KEYS.CANDIDATES, key: "/candidates", icon: <UserOutlined /> },
  { label: MENU_KEYS.COMPANIES, key: COMPANIES, icon: <UserOutlined /> },
  { label: MENU_KEYS.ALL_JOBS, key: "/all-jobs", icon: <UserOutlined /> },
  { label: MENU_KEYS.REPORT, key: "/report", icon: <UserOutlined /> },
];
const experiencedMembersMenu = [
  { label: MENU_KEYS.DASHBOARD, key: DASHBOARD, icon: <UserOutlined /> },
  { label: MENU_KEYS.PAYMENTS, key: "/payments", icon: <UserOutlined /> },
  { label: MENU_KEYS.CANDIDATES, key: "/candidates", icon: <UserOutlined /> },
  { label: MENU_KEYS.COMPANIES, key: COMPANIES, icon: <UserOutlined /> },
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <UserOutlined />,
  },
  { label: MENU_KEYS.SESSIONS, key: SESSION, icon: <UserOutlined /> },
  { label: MENU_KEYS.ROASTER, key: "/roster", icon: <UserOutlined /> },
  { label: MENU_KEYS.REPORT, key: "/report", icon: <UserOutlined /> },
];
// TODO: need to add role based menu
const modules = [
  {
    label: "Control",
    key: MODULE_KEYS.CONTROL_KEY,
    children: controlMenu,
  },
  {
    label: "Newly Qualified Placements",
    key: MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY,
    children: newlyQualifiedPlacementsMenu,
  },
  {
    label: "CA Jobs",
    key: MODULE_KEYS.CA_JOBS_KEY,
    children: caJobsMenu,
  },
  {
    label: "Experienced Members",
    key: MODULE_KEYS.EXPERIENCED_MEMBERS_KEY,
    subMenu: [
      {
        key: MODULE_KEYS.CARRER_ASCENT_KEY,
        label: "Career Ascent",
        children: experiencedMembersMenu,
      },
      {
        key: MODULE_KEYS.WOMEN_PARTTIME_KEY,
        label: "Women PartTime",
        children: experiencedMembersMenu,
      },
      {
        key: MODULE_KEYS.OVERSEAS_CHAPTERS_KEY,
        label: "Overseas Chapters",
        children: experiencedMembersMenu,
      },
    ],
  },

  // Add more modules as needed
];

export default modules;
