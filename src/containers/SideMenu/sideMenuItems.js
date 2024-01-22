import {
  COMPANIES,
  CONFIGURE_CENTRES,
  DASHBOARD,
  SESSION,
  USERS,
  SUBSCRIPTIONS,
} from "../../routes/routeNames";
import { MODULE_KEYS, MENU_KEYS } from "../../constant/constant";
import { ReactComponent as Activity } from "../../themes/base/assets/icons/activity.svg";
import { ReactComponent as Briefcase } from "../../themes/base/assets/icons/briefcase.svg";
import { ReactComponent as Companies } from "../../themes/base/assets/icons/companies.svg";
import { ReactComponent as Dashboard } from "../../themes/base/assets/icons/dashboard.svg";
import { ReactComponent as Dollor } from "../../themes/base/assets/icons/dollarCircle.svg";
import { ReactComponent as Globe } from "../../themes/base/assets/icons/globe.svg";
import { ReactComponent as Message } from "../../themes/base/assets/icons/message.svg";
import { ReactComponent as Notification } from "../../themes/base/assets/icons/notification.svg";
import { ReactComponent as People } from "../../themes/base/assets/icons/people.svg";
import { ReactComponent as Report } from "../../themes/base/assets/icons/report.svg";
import { ReactComponent as Roaster } from "../../themes/base/assets/icons/roaster.svg";
import { ReactComponent as Round1 } from "../../themes/base/assets/icons/round1-circle.svg";
import { ReactComponent as Round2 } from "../../themes/base/assets/icons/round2-circle.svg";
import { ReactComponent as Send } from "../../themes/base/assets/icons/send.svg";
import { ReactComponent as Session } from "../../themes/base/assets/icons/session.svg";
import { ReactComponent as SMS } from "../../themes/base/assets/icons/sms.svg";
import { ReactComponent as Testimonials } from "../../themes/base/assets/icons/testimonials.svg";
import { ReactComponent as Wallet } from "../../themes/base/assets/icons/wallet.svg";

// TODO: need to add icons according to menu
const controlMenu = [
  { label: MENU_KEYS.USER_MANAGEMENT, key: USERS, icon: <People /> },
  {
    label: MENU_KEYS.BULK_NOTIFICATIONS,
    key: "/notifications",
    icon: <Notification />,
  },
  { label: MENU_KEYS.CONTACT_US, key: "/contact-us", icon: <Message /> },
  { label: MENU_KEYS.SESSIONS, key: SESSION, icon: <Session /> },
  { label: MENU_KEYS.FEEDBACK, key: "/feedback", icon: <Send /> },
  {
    label: MENU_KEYS.TESTIMONIAL_MANAGEMENT,
    key: "/testimonials",
    icon: <Testimonials />,
  },
  {
    label: MENU_KEYS.REGISTERED_COMPANIES,
    key: "/register-companies",
    icon: <Companies />,
  },
  {
    label: MENU_KEYS.ACTIVITY_LOGS,
    key: "/activity-logs",
    icon: <Activity />,
  },
  { label: MENU_KEYS.QUERY_MANAGEMENT, key: USERS, icon: <SMS /> },
];
const newlyQualifiedPlacementsMenu = [
  { label: MENU_KEYS.DASHBOARD, key: DASHBOARD, icon: <Dashboard /> },
  {
    label: MENU_KEYS.ROUND_1_PLACEMENT,
    key: "/round-1-placements",
    icon: <Round1 />,
  },
  {
    label: MENU_KEYS.ROUND_2_PLACEMENT,
    key: "/round-2-placements",
    icon: <Round2 />,
  },
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <Globe />,
  },
  { label: MENU_KEYS.COMPANIES, key: COMPANIES, icon: <Companies /> },
];
const caJobsMenu = [
  { label: MENU_KEYS.DASHBOARD, key: DASHBOARD, icon: <Dashboard /> },
  {
    label: MENU_KEYS.SUBSCRIPTIONS,
    key: SUBSCRIPTIONS,
    icon: <Dollor />,
  },
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <Globe />,
  },
  { label: MENU_KEYS.PAYMENTS, key: "/payments", icon: <Wallet /> },
  { label: MENU_KEYS.CANDIDATES, key: "/candidates", icon: <People /> },
  { label: MENU_KEYS.COMPANIES, key: COMPANIES, icon: <Companies /> },
  { label: MENU_KEYS.ALL_JOBS, key: "/all-jobs", icon: <Briefcase /> },
  { label: MENU_KEYS.REPORT, key: "/report", icon: <Report /> },
];
const experiencedMembersMenu = [
  { label: MENU_KEYS.DASHBOARD, key: DASHBOARD, icon: <Dashboard /> },
  { label: MENU_KEYS.PAYMENTS, key: "/payments", icon: <Wallet /> },
  { label: MENU_KEYS.CANDIDATES, key: "/candidates", icon: <People /> },
  { label: MENU_KEYS.COMPANIES, key: COMPANIES, icon: <Companies /> },
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <Globe />,
  },
  { label: MENU_KEYS.SESSIONS, key: SESSION, icon: <Session /> },
  { label: MENU_KEYS.ROASTER, key: "/roster", icon: <Roaster /> },
  { label: MENU_KEYS.REPORT, key: "/report", icon: <Report /> },
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
