import { UserOutlined } from "@ant-design/icons";
import {
  COMPANIES,
  CONFIGURE_CENTRES,
  DASHBOARD,
  SESSION,
  USERS,
  SUBSCRIPTIONS,
} from "../../routes/routeNames";

// TODO: need to add icons according to menu
const controlMenu = [
  { label: "Users", key: USERS, icon: <UserOutlined /> },
  { label: "Notifications", key: "/notifications", icon: <UserOutlined /> },
  { label: "Contact Us", key: "/contact-us", icon: <UserOutlined /> },
  { label: "Session", key: SESSION, icon: <UserOutlined /> },
  { label: "Feedback", key: "/feedback", icon: <UserOutlined /> },
  { label: "Testimonials", key: "/testimonials", icon: <UserOutlined /> },
  {
    label: "Registered Companies",
    key: "/register-companies",
    icon: <UserOutlined />,
  },
  { label: "Activity Logs", key: "/activity-logs", icon: <UserOutlined /> },
];
const newlyQualifiedPlacementsMenu = [
  { label: "Dashboard", key: DASHBOARD, icon: <UserOutlined /> },
  {
    label: "Round 1 Placements",
    key: "/round-1-placements",
    icon: <UserOutlined />,
  },
  {
    label: "Round 2 Placements",
    key: "/round-2-placements",
    icon: <UserOutlined />,
  },
  {
    label: "Global configurations",
    key: CONFIGURE_CENTRES,
    icon: <UserOutlined />,
  },
  { label: "Companies", key: COMPANIES, icon: <UserOutlined /> },
];
const caJobsMenu = [
  { label: "Dashboard", key: DASHBOARD, icon: <UserOutlined /> },
  { label: "Subscriptions", key: SUBSCRIPTIONS, icon: <UserOutlined /> },
  {
    label: "Global Configurations",
    key: CONFIGURE_CENTRES,
    icon: <UserOutlined />,
  },
  { label: "Payments", key: "/payments", icon: <UserOutlined /> },
  { label: "Candidates", key: "/candidates", icon: <UserOutlined /> },
  { label: "Companies", key: COMPANIES, icon: <UserOutlined /> },
  { label: "All Jobs", key: "/all-jobs", icon: <UserOutlined /> },
  { label: "Report", key: "/report", icon: <UserOutlined /> },
];
const experiencedMembersMenu = [
  { label: "Dashboard", key: DASHBOARD, icon: <UserOutlined /> },
  { label: "Payments", key: "/payments", icon: <UserOutlined /> },
  { label: "Candidates", key: "/candidates", icon: <UserOutlined /> },
  { label: "Companies", key: COMPANIES, icon: <UserOutlined /> },
  {
    label: "Global Configurations",
    key: CONFIGURE_CENTRES,
    icon: <UserOutlined />,
  },
  { label: "Session", key: SESSION, icon: <UserOutlined /> },
  { label: "Roster", key: "/roster", icon: <UserOutlined /> },
  { label: "Report", key: "/report", icon: <UserOutlined /> },
];
// TODO: need to add role based menu
const modules = [
  {
    label: "Control",
    key: "/control",
    children: controlMenu,
  },
  {
    label: "Newly Qualified Placements",
    key: "/newly-qualified-placements",
    children: newlyQualifiedPlacementsMenu,
  },
  {
    label: "CA Jobs",
    key: "/ca-jobs",
    children: caJobsMenu,
  },
  {
    label: "Experienced Members",
    key: "/experienced-members",
    subMenu: [
      {
        key: "career-ascent",
        label: "Career Ascent",
        children: experiencedMembersMenu,
      },
      {
        key: "women-part-time",
        label: "Women PartTime",
        children: experiencedMembersMenu,
      },
      {
        key: "overseas-chapters",
        label: "Overseas Chapters",
        children: experiencedMembersMenu,
      },
    ],
  },

  // Add more modules as needed
];

export default modules;
