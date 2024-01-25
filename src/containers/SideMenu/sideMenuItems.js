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
import { ReactComponent as SelectedActivity } from "../../themes/base/assets/icons/selectedActivity.svg";
import { ReactComponent as SelectedBriefcase } from "../../themes/base/assets/icons/selectedBriefcase.svg";
import { ReactComponent as SelectedCompanies } from "../../themes/base/assets/icons/selectedCompanies.svg";
import { ReactComponent as SelectedDashboard } from "../../themes/base/assets/icons/selectedDashboard.svg";
import { ReactComponent as SelectedDollor } from "../../themes/base/assets/icons/selectedDollarCircle.svg";
import { ReactComponent as SelectedGlobe } from "../../themes/base/assets/icons/selectedGlobe.svg";
import { ReactComponent as SelectedMessage } from "../../themes/base/assets/icons/selectedMessage.svg";
import { ReactComponent as SelectedNotification } from "../../themes/base/assets/icons/selectedNotification.svg";
import { ReactComponent as SelectedPeople } from "../../themes/base/assets/icons/selectedPeople.svg";
import { ReactComponent as SelectedReport } from "../../themes/base/assets/icons/selectedReport.svg";
import { ReactComponent as SelectedRoaster } from "../../themes/base/assets/icons/selectedRoaster.svg";
import { ReactComponent as SelectedRound1 } from "../../themes/base/assets/icons/selectedRound-1circle.svg";
import { ReactComponent as SelectedRound2 } from "../../themes/base/assets/icons/selectedRound-2circle.svg";
import { ReactComponent as SelectedSend } from "../../themes/base/assets/icons/selectedSend.svg";
import { ReactComponent as SelectedSession } from "../../themes/base/assets/icons/selectedSession.svg";
import { ReactComponent as SelectedSMS } from "../../themes/base/assets/icons/selectedSms.svg";
import { ReactComponent as SelectedTestimonials } from "../../themes/base/assets/icons/selectedTestimonials.svg";
import { ReactComponent as SelectedWallet } from "../../themes/base/assets/icons/selectedWallet.svg";

const controlMenu = [
  {
    label: MENU_KEYS.USER_MANAGEMENT,
    key: USERS,
    icon: <People />,
    selectedIcon: <SelectedPeople />,
  },
  {
    label: MENU_KEYS.BULK_NOTIFICATIONS,
    key: "/notifications",
    icon: <Notification />,
    selectedIcon: <SelectedNotification />,
  },
  {
    label: MENU_KEYS.CONTACT_US,
    key: "/contact-us",
    icon: <Message />,
    selectedIcon: <SelectedMessage />,
  },
  {
    label: MENU_KEYS.SESSIONS,
    key: SESSION,
    icon: <Session />,
    selectedIcon: <SelectedSession />,
  },
  {
    label: MENU_KEYS.FEEDBACK,
    key: "/feedback",
    icon: <Send />,
    selectedIcon: <SelectedSend />,
  },
  {
    label: MENU_KEYS.TESTIMONIAL_MANAGEMENT,
    key: "/testimonials",
    icon: <Testimonials />,
    selectedIcon: <SelectedTestimonials />,
  },
  {
    label: MENU_KEYS.REGISTERED_COMPANIES,
    key: "/register-companies",
    icon: <Companies />,
    selectedIcon: <SelectedCompanies />,
  },
  {
    label: MENU_KEYS.ACTIVITY_LOGS,
    key: "/activity-logs",
    icon: <Activity />,
    selectedIcon: <SelectedActivity />,
  },
  {
    label: MENU_KEYS.QUERY_MANAGEMENT,
    key: "/query-management",
    icon: <SMS />,
    selectedIcon: <SelectedSMS />,
  },
];

const newlyQualifiedPlacementsMenu = [
  {
    label: MENU_KEYS.DASHBOARD,
    key: DASHBOARD,
    icon: <Dashboard />,
    selectedIcon: <SelectedDashboard />,
  },
  {
    label: MENU_KEYS.ROUND_1_PLACEMENT,
    key: "/round-1-placements",
    icon: <Round1 />,
    selectedIcon: <SelectedRound1 />,
  },
  {
    label: MENU_KEYS.ROUND_2_PLACEMENT,
    key: "/round-2-placements",
    icon: <Round2 />,
    selectedIcon: <SelectedRound2 />,
  },
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <Globe />,
    selectedIcon: <SelectedGlobe />,
  },
  {
    label: MENU_KEYS.COMPANIES,
    key: COMPANIES,
    icon: <Companies />,
    selectedIcon: <SelectedCompanies />,
  },
];

const caJobsMenu = [
  {
    label: MENU_KEYS.DASHBOARD,
    key: DASHBOARD,
    icon: <Dashboard />,
    selectedIcon: <SelectedDashboard />,
  },
  {
    label: MENU_KEYS.SUBSCRIPTIONS,
    key: SUBSCRIPTIONS,
    icon: <Dollor />,
    selectedIcon: <SelectedDollor />,
  },
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <Globe />,
    selectedIcon: <SelectedGlobe />,
  },
  {
    label: MENU_KEYS.PAYMENTS,
    key: "/payments",
    icon: <Wallet />,
    selectedIcon: <SelectedWallet />,
  },
  {
    label: MENU_KEYS.CANDIDATES,
    key: "/candidates",
    icon: <People />,
    selectedIcon: <SelectedPeople />,
  },
  {
    label: MENU_KEYS.COMPANIES,
    key: COMPANIES,
    icon: <Companies />,
    selectedIcon: <SelectedCompanies />,
  },
  {
    label: MENU_KEYS.ALL_JOBS,
    key: "/all-jobs",
    icon: <Briefcase />,
    selectedIcon: <SelectedBriefcase />,
  },
  {
    label: MENU_KEYS.REPORT,
    key: "/report",
    icon: <Report />,
    selectedIcon: <SelectedReport />,
  },
];

const experiencedMembersMenu = [
  {
    label: MENU_KEYS.DASHBOARD,
    key: DASHBOARD,
    icon: <Dashboard />,
    selectedIcon: <SelectedDashboard />,
  },
  { label: MENU_KEYS.PAYMENTS, key: "/payments", icon: <Wallet /> },
  {
    label: MENU_KEYS.CANDIDATES,
    key: "/candidates",
    icon: <People />,
    selectedIcon: <SelectedPeople />,
  },
  {
    label: MENU_KEYS.COMPANIES,
    key: COMPANIES,
    icon: <Companies />,
    selectedIcon: <SelectedCompanies />,
  },
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <Globe />,
    selectedIcon: <SelectedGlobe />,
  },
  {
    label: MENU_KEYS.SESSIONS,
    key: SESSION,
    icon: <Session />,
    selectedIcon: <SelectedSession />,
  },
  {
    label: MENU_KEYS.ROASTER,
    key: "/roster",
    icon: <Roaster />,
    selectedIcon: <SelectedRoaster />,
  },
  {
    label: MENU_KEYS.REPORT,
    key: "/report",
    icon: <Report />,
    selectedIcon: <SelectedReport />,
  },
];

const modules = [
  {
    id: 1,
    label: "Control",
    key: MODULE_KEYS.CONTROL_KEY,
    children: controlMenu,
    image: "settings",
    isExperiencedMember: false,
  },
  {
    id: 2,
    label: "Newly Qualified Placements",
    key: MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY,
    children: newlyQualifiedPlacementsMenu,
    image: "scholar",
    isExperiencedMember: false,
  },
  {
    id: 3,
    label: "CA Jobs",
    key: MODULE_KEYS.CA_JOBS_KEY,
    children: caJobsMenu,
    image: "suiteCase",
    isExperiencedMember: false,
  },
  {
    id: 4,
    key: MODULE_KEYS.CARRER_ASCENT_KEY,
    label: "Career Ascent",
    children: experiencedMembersMenu,
    image: "flagOnPedestal",
    isExperiencedMember: true,
  },
  {
    id: 5,
    key: MODULE_KEYS.WOMEN_PARTTIME_KEY,
    label: "Women Part Time",
    children: experiencedMembersMenu,
    image: "woman",
    isExperiencedMember: true,
  },
  {
    id: 6,
    key: MODULE_KEYS.OVERSEAS_CHAPTERS_KEY,
    label: "Overseas Chapters",
    children: experiencedMembersMenu,
    image: "global",
    isExperiencedMember: true,
  },
];

export default modules;
