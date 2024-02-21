import {
  COMPANIES,
  CONFIGURE_CENTRES,
  DASHBOARD,
  SESSION,
  USERS,
  SUBSCRIPTIONS,
  QUERIES,
  TICKETS,
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
import { ReactComponent as Ticket } from "../../themes/base/assets/icons/ticket.svg";
import { ReactComponent as EmailAlias } from "../../themes/base/assets/icons/emailAlias.svg";
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
import { ReactComponent as SelectedTicket } from "../../themes/base/assets/icons/selectedTicket.svg";
import { ReactComponent as SelectedEmailAlias } from "../../themes/base/assets/icons/selectedEmailAlias.svg";

const caJobsMenu = [
  {
    label: MENU_KEYS.DASHBOARD,
    key: DASHBOARD,
    icon: <Dashboard />,
    selectedicon: <SelectedDashboard />,
  },
  {
    label: MENU_KEYS.MANAGE_SUBSCRIPTIONS,
    key: SUBSCRIPTIONS,
    icon: <Dollor />,
    selectedicon: <SelectedDollor />,
  },
  {
    label: MENU_KEYS.CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <Globe />,
    selectedicon: <SelectedGlobe />,
  },
  {
    label: MENU_KEYS.MANAGE_PAYMENTS,
    key: "/payments",
    icon: <Wallet />,
    selectedicon: <SelectedWallet />,
  },
  {
    label: MENU_KEYS.MANAGE_CANDIDATES,
    key: "/candidates",
    icon: <People />,
    selectedicon: <SelectedPeople />,
  },
  {
    label: MENU_KEYS.MANAGE_COMPANIES,
    key: COMPANIES,
    icon: <Companies />,
    selectedicon: <SelectedCompanies />,
  },
  {
    label: MENU_KEYS.ALL_JOBS,
    key: "/all-jobs",
    icon: <Briefcase />,
    selectedicon: <SelectedBriefcase />,
  },
  {
    label: MENU_KEYS.REPORT,
    key: "/report",
    icon: <Report />,
    selectedicon: <SelectedReport />,
  },
];

export const controlMenu = [
  {
    label: MENU_KEYS.TICKET_MANAGEMENT,
    key: TICKETS,
    icon: <Ticket />,
    selectedicon: <SelectedTicket />,
  },
  {
    label: MENU_KEYS.QUERY_MANAGEMENT,
    key: QUERIES,
    icon: <SMS />,
    selectedicon: <SelectedSMS />,
  },
  {
    label: MENU_KEYS.USER_MANAGEMENT,
    key: USERS,
    icon: <People />,
    selectedicon: <SelectedPeople />,
  },
  {
    label: MENU_KEYS.BULK_NOTIFICATIONS,
    key: "/notifications",
    icon: <Notification />,
    selectedicon: <SelectedNotification />,
  },
  {
    label: MENU_KEYS.FEEDBACK_MANAGEMENT,
    key: "/feedback-management",
    icon: <Send />,
    selectedicon: <SelectedSend />,
  },
  {
    label: MENU_KEYS.TESTIMONIAL_MANAGEMENT,
    key: "/testimonials",
    icon: <Testimonials />,
    selectedicon: <SelectedTestimonials />,
  },
  {
    label: MENU_KEYS.REGISTERED_COMPANIES,
    key: "/register-companies",
    icon: <Companies />,
    selectedicon: <SelectedCompanies />,
  },
  {
    label: MENU_KEYS.ACTIVITY_LOGS,
    key: "/activity-log",
    icon: <Activity />,
    selectedicon: <SelectedActivity />,
  },
  {
    label: MENU_KEYS.SUPPORT_EMAIL_MANGEMENT,
    key: "/email-management",
    icon: <EmailAlias />,
    selectedicon: <SelectedEmailAlias />,
  },
];

const newlyQualifiedPlacementsMenu = [
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <Globe />,
    selectedicon: <SelectedGlobe />,
  },
  {
    label: MENU_KEYS.SET_UP_SESSIONS,
    key: SESSION,
    icon: <Session />,
    selectedicon: <SelectedSession />,
  },
  {
    label: MENU_KEYS.DASHBOARD,
    key: DASHBOARD,
    icon: <Dashboard />,
    selectedicon: <SelectedDashboard />,
  },
  {
    label: MENU_KEYS.CANDIDATE_DETAILS,
    key: "/candidates-details",
    icon: <People />,
    selectedicon: <SelectedPeople />,
  },
  {
    label: MENU_KEYS.COMPANY_DETAILS,
    key: COMPANIES,
    icon: <Companies />,
    selectedicon: <SelectedCompanies />,
  },
  {
    label: MENU_KEYS.ROASTER,
    key: "/roster",
    icon: <Roaster />,
    selectedicon: <SelectedRoaster />,
  },
  {
    label: MENU_KEYS.PAYMENTS,
    key: "/payments",
    icon: <Wallet />,
    selectedicon: <SelectedWallet />,
  },
  {
    label: MENU_KEYS.REPORT,
    key: "/report",
    icon: <Report />,
    selectedicon: <SelectedReport />,
  },

  {
    label: MENU_KEYS.ROUND_1_PLACEMENT,
    key: "/round-1-placements",
    icon: <Round1 />,
    selectedicon: <SelectedRound1 />,
  },
  {
    label: MENU_KEYS.ROUND_2_PLACEMENT,
    key: "/round-2-placements",
    icon: <Round2 />,
    selectedicon: <SelectedRound2 />,
  },
  {
    label: MENU_KEYS.COMPANIES,
    key: COMPANIES,
    icon: <Companies />,
    selectedicon: <SelectedCompanies />,
  },
];

const experiencedMembersMenu = [
  {
    label: MENU_KEYS.GLOBAL_CONFIGURATIONS,
    key: CONFIGURE_CENTRES,
    icon: <Globe />,
    selectedicon: <SelectedGlobe />,
  },
  {
    label: MENU_KEYS.SET_UP_SESSIONS,
    key: SESSION,
    icon: <Session />,
    selectedicon: <SelectedSession />,
  },
  {
    label: MENU_KEYS.DASHBOARD,
    key: DASHBOARD,
    icon: <Dashboard />,
    selectedicon: <SelectedDashboard />,
  },
  {
    label: MENU_KEYS.CANDIDATE_DETAILS,
    key: "/candidates-details",
    icon: <People />,
    selectedicon: <SelectedPeople />,
  },
  {
    label: MENU_KEYS.COMPANY_DETAILS,
    key: COMPANIES,
    icon: <Companies />,
    selectedicon: <SelectedCompanies />,
  },
  {
    label: MENU_KEYS.PAYMENTS,
    key: "/payments",
    icon: <Wallet />,
    selectedicon: <SelectedWallet />,
  },
  {
    label: MENU_KEYS.ROASTER,
    key: "/roster",
    icon: <Roaster />,
    selectedicon: <SelectedRoaster />,
  },

  {
    label: MENU_KEYS.REPORT,
    key: "/report",
    icon: <Report />,
    selectedicon: <SelectedReport />,
  },

  {
    label: MENU_KEYS.ROUND_1_PLACEMENT,
    key: "/round-1-placements",
    icon: <Round1 />,
    selectedicon: <SelectedRound1 />,
  },
  {
    label: MENU_KEYS.ROUND_2_PLACEMENT,
    key: "/round-2-placements",
    icon: <Round2 />,
    selectedicon: <SelectedRound2 />,
  },

  {
    label: MENU_KEYS.COMPANIES,
    key: COMPANIES,
    icon: <Companies />,
    selectedicon: <SelectedCompanies />,
  },
];

export const modules = [
  {
    id: 1,
    label: "CA Jobs",
    key: MODULE_KEYS.CA_JOBS_KEY,
    children: caJobsMenu,
    image: "suiteCase",
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
    key: MODULE_KEYS.OVERSEAS_CHAPTERS_KEY,
    label: "Overseas Chapters",
    children: experiencedMembersMenu,
    image: "global",
    isExperiencedMember: true,
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
    label: "Women Placement",
    children: experiencedMembersMenu,
    image: "woman",
    isExperiencedMember: true,
  },
  {
    id: 6,
    label: "Control",
    key: MODULE_KEYS.CONTROL_KEY,
    children: controlMenu,
    image: "settings",
    isExperiencedMember: false,
  },
];

export default modules;
