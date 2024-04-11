import CaJobsConfigurations from "../views/CAJobs/CaJobsConfigurations/CaJobsConfigurations.js";
import CampusInterviewSettings from "../views/CampusInterviewSettings";
import Companies from "../views/Companies";
import CompaniesDetails from "../views/CompaniesDetails";
import Configurations from "../views/Configurations/Configurations";
import ConfigureCentres from "../views/ConfigureCentres";
import QueriesListing from "../views/QueriesListing";
import ConfigureCentreView from "../views/ConfigureCentreView";
import ConfigureInterviewDates from "../views/ConfigureInterviewDates";
import ConsentMarking from "../views/ConsentMarking";
import DashboardView from "../views/Dashboard/Dashboard";
import DefaultRoute from "./components/DefaultRoute";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";
import HeaderContentWithFooter from "../pages/HeaderContentWithFooter";
import Home from "../pages/Home";
import LoginForm from "../views/LoginForm";
import ManageCompanies from "../views/ManageCompanies/ManageCompanies.js";
import ManageCompanyDetails from "../views/ManageCompanyDetails/ManageCompanyDetails.js";
import ManageUsers from "../views/ManageUsers";
import OrientationCenter from "../views/OrientationCenter";
import RedirectToAccessedModule from "./components/RedirectToAccessModules";
import RegisteredCompaniesList from "../views/RegisteredCompaniesList/RegisteredCompaniesList";
import RegisteredCompaniesDetails from "../views/RegisteredCompaniesDetails/RegisteredCompaniesDetails";
import Session from "../views/Session";
import SubscriptionDetails from "../containers/SubscriptionDetails/index";
import EditSession from "../views/EditSession/EditSession";
import SetupCenter from "../views/SetupCenters";
import Subscriptions from "../views/Subscriptions/Subscriptions";
import SetupCenterDetails from "../views/SetupCenterDetails";
import SetupMockInterview from "../views/SetupMockInterview";
import TicketChatScreen from "../views/TicketChatScreen";
import TicketListing from "../views/TicketListing/TicketListing";
import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import UserDetails from "../views/UserDetails";
import QueryDetails from "../views/QueryDetails";
import JobDetails from "../views/AllJobDetails";
import AllJobApplicantDetail from "../containers/AllJobApplicantDetail/index.js";

import {
  ADD,
  ADD_NEW_USER_DETAILS,
  ADD_SESSION,
  CAMPUS_INTERVIEW_SETTINGS,
  CAMPUS_INTERVIEW_SETTINGS_ROUND_TWO,
  ADD_SUBSCRIPTIONS,
  CONFIGURATIONS,
  COMPANIES,
  COMPANIES_DETAILS,
  CONFIGURE_CENTRES,
  CONSENT_MARKING_ROUND_ONE,
  CONSENT_MARKING_ROUND_TWO,
  DASHBOARD,
  DETAILS,
  EDIT_CONFIGURE_CENTRE,
  EDIT_SESSION,
  FORGOT_PASSWORD,
  INTERVIEW_DETAILS,
  LOGIN,
  OUT_SOURCED,
  QUERIES,
  QUERY_DETAILS,
  REGISTERED_COMPANY,
  REGISTERED_COMPANY_DETAILS,
  ROOT,
  ROUND_ONE_ORIENTATION_CENTERS,
  ROUND_ONE_SETUP_CENTERS,
  ROUND_TWO_SETUP_CENTERS,
  SESSION,
  SETUP_CENTERS,
  SETUP_CENTERS_DETAILS,
  SETUP_MOCK_INTERVIEW,
  SUBSCRIPTIONS,
  SUBSCRIPTIONS_DETAILS,
  USERS,
  USER_DETAILS,
  TICKETS,
  TICKETS_VIEW_DETAILS,
  JOB_LISTING,
  JOB_DETAILS,
  CANDIDATES,
  CANDIDATES_DETAILS,
  APPLICANTS_DETAILS,
} from "./routeNames";
import { MODULE_KEYS } from "../constant/constant";
import Candidates from "../views/Candidates/Candidates.js";
import CandidateDetails from "../views/CandidateDetails/CandidateDetails.js";
import AllJobs from "../views/AllJobs/AllJobs.js";

const HomeWithPrivateAccess = withPrivateAccess(Home);
const HeaderContentWithFooterWithPublicAccess = withPublicAccess(
  HeaderContentWithFooter
);

const config = [
  {
    pagePath: OUT_SOURCED,
    element: <DefaultRoute />,
    views: [
      {
        viewPath: "",
        element: <DefaultRoute />,
      },
    ],
  },
  {
    pagePath: FORGOT_PASSWORD,
    element: <HeaderContentWithFooterWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    pagePath: LOGIN,
    element: <HeaderContentWithFooterWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <LoginForm />,
      },
    ],
  },
  {
    pagePath: ROOT,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <RedirectToAccessedModule />,
      },
    ],
  },
  {
    pagePath: MODULE_KEYS.CARRER_ASCENT_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
      {
        viewPath: SESSION,
        element: <Session />,
      },
      {
        viewPath: SESSION + ADD_SESSION,
        element: <EditSession />,
      },
      {
        viewPath: SESSION + EDIT_SESSION,
        element: <EditSession />,
      },
      {
        viewPath: SESSION + ROUND_ONE_SETUP_CENTERS,
        element: <SetupCenter />,
      },
      {
        viewPath: SESSION + ROUND_ONE_SETUP_CENTERS + SETUP_CENTERS_DETAILS,
        element: <SetupCenterDetails />,
      },
      {
        viewPath: SESSION + CONSENT_MARKING_ROUND_ONE,
        element: <ConsentMarking />,
      },
      {
        viewPath: SESSION + CONSENT_MARKING_ROUND_TWO,
        element: <ConsentMarking />,
      },
      {
        viewPath: COMPANIES,
        element: <Companies />,
      },
      {
        viewPath: COMPANIES + COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
      {
        viewPath: CONFIGURE_CENTRES,
        element: <ConfigureCentres />,
      },
      {
        viewPath: CONFIGURE_CENTRES + ADD,
        element: <ConfigureCentreView />,
      },
      {
        viewPath: CONFIGURE_CENTRES + EDIT_CONFIGURE_CENTRE,
        element: <ConfigureCentreView />,
      },
      {
        viewPath: SESSION + SETUP_MOCK_INTERVIEW,
        element: <SetupMockInterview />,
      },
      {
        viewPath: SESSION + SETUP_MOCK_INTERVIEW + INTERVIEW_DETAILS,
        element: <ConfigureInterviewDates />,
      },
      {
        viewPath: SESSION + CAMPUS_INTERVIEW_SETTINGS,
        element: <CampusInterviewSettings />,
      },
    ],
  },
  {
    pagePath: MODULE_KEYS.CA_JOBS_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
      {
        viewPath: SUBSCRIPTIONS,
        element: <Subscriptions />,
      },
      {
        viewPath: CANDIDATES,
        element: <Candidates/>,
      },
      {
        viewPath: CANDIDATES + CANDIDATES_DETAILS,
        element: <CandidateDetails/>,
      },
      {
        viewPath: COMPANIES,
        element: <ManageCompanies />,
      },
      {
        viewPath: COMPANIES + COMPANIES_DETAILS,
        element: <ManageCompanyDetails />,
      },
      {
        viewPath: CONFIGURE_CENTRES,
        element: <CaJobsConfigurations />,
      },
      {
        viewPath: CONFIGURE_CENTRES + ADD,
        element: <ConfigureCentreView />,
      },
      {
        viewPath: CONFIGURE_CENTRES + EDIT_CONFIGURE_CENTRE,
        element: <ConfigureCentreView />,
      },
      {
        viewPath: SUBSCRIPTIONS + ADD_SUBSCRIPTIONS,
        element: <SubscriptionDetails isAddSubscription />,
      },
      {
        viewPath: SUBSCRIPTIONS + SUBSCRIPTIONS_DETAILS,
        element: <SubscriptionDetails />,
      },
      {
        viewPath: JOB_LISTING,
        element: <AllJobs />,
      },
      {
        viewPath: JOB_LISTING + JOB_DETAILS,
        element: <JobDetails />,
      },
      {
        viewPath: JOB_LISTING + JOB_DETAILS + APPLICANTS_DETAILS,
        element: <AllJobApplicantDetail />
      },
    ],
  },
  {
    pagePath: MODULE_KEYS.CONTROL_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
      {
        viewPath: USERS,
        element: <ManageUsers />,
      },
      {
        viewPath: USERS + USER_DETAILS,
        element: <UserDetails />,
      },
      {
        viewPath: USERS + ADD_NEW_USER_DETAILS,
        element: <UserDetails />,
      },
      {
        viewPath: QUERIES,
        element: <QueriesListing />,
      },
      {
        viewPath: QUERIES + QUERY_DETAILS,
        element: <QueryDetails />,
      },
      {
        viewPath: TICKETS,
        element: <TicketListing />,
      },
      {
        viewPath: TICKETS + TICKETS_VIEW_DETAILS,
        element: <TicketChatScreen />,
      },
      {
        viewPath: REGISTERED_COMPANY,
        element: <RegisteredCompaniesList />,
      },
      {
        viewPath: REGISTERED_COMPANY + REGISTERED_COMPANY_DETAILS,
        element: <RegisteredCompaniesDetails />,
      },
    ],
  },
  {
    pagePath: MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
      {
        viewPath: SESSION,
        element: <Session />,
      },
      {
        viewPath: SESSION + ADD_SESSION,
        element: <EditSession />,
      },
      {
        viewPath: SESSION + EDIT_SESSION,
        element: <EditSession />,
      },
      {
        viewPath: SESSION + ROUND_ONE_SETUP_CENTERS,
        element: <SetupCenter />,
      },
      {
        viewPath: SESSION + ROUND_ONE_SETUP_CENTERS + SETUP_CENTERS_DETAILS,
        element: <SetupCenterDetails />,
      },
      {
        viewPath: SESSION + ROUND_TWO_SETUP_CENTERS,
        element: <SetupCenter />,
      },
      {
        viewPath: SESSION + ROUND_TWO_SETUP_CENTERS + SETUP_CENTERS_DETAILS,
        element: <SetupCenterDetails />,
      },
      {
        viewPath: SESSION + CONSENT_MARKING_ROUND_ONE,
        element: <ConsentMarking />,
      },
      {
        viewPath: SESSION + CONSENT_MARKING_ROUND_TWO,
        element: <ConsentMarking />,
      },
      {
        viewPath: SESSION + ROUND_ONE_ORIENTATION_CENTERS,
        element: <OrientationCenter />,
      },
      {
        viewPath: COMPANIES,
        element: <Companies />,
      },
      {
        viewPath: COMPANIES + COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
      {
        viewPath: CONFIGURE_CENTRES,
        element: <ConfigureCentres />,
      },
      {
        viewPath: CONFIGURE_CENTRES + ADD,
        element: <ConfigureCentreView />,
      },
      {
        viewPath: CONFIGURE_CENTRES + EDIT_CONFIGURE_CENTRE,
        element: <ConfigureCentreView />,
      },
      {
        viewPath: SESSION + SETUP_MOCK_INTERVIEW,
        element: <SetupMockInterview />,
      },
      {
        viewPath: SESSION + SETUP_MOCK_INTERVIEW + INTERVIEW_DETAILS,
        element: <ConfigureInterviewDates />,
      },
      {
        viewPath: SESSION + CAMPUS_INTERVIEW_SETTINGS,
        element: <CampusInterviewSettings />,
      },
      {
        viewPath: SESSION + CAMPUS_INTERVIEW_SETTINGS_ROUND_TWO,
        element: <CampusInterviewSettings />,
      },
    ],
  },
  {
    pagePath: MODULE_KEYS.OVERSEAS_CHAPTERS_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
      {
        viewPath: SESSION,
        element: <Session />,
      },
      {
        viewPath: SESSION + ADD_SESSION,
        element: <EditSession />,
      },
      {
        viewPath: SESSION + EDIT_SESSION,
        element: <EditSession />,
      },
      {
        viewPath: SESSION + ROUND_ONE_SETUP_CENTERS,
        element: <SetupCenter />,
      },
      {
        viewPath: SESSION + ROUND_ONE_SETUP_CENTERS + SETUP_CENTERS_DETAILS,
        element: <SetupCenterDetails />,
      },
      {
        viewPath: SESSION + CONSENT_MARKING_ROUND_ONE,
        element: <ConsentMarking />,
      },
      {
        viewPath: SESSION + CONSENT_MARKING_ROUND_TWO,
        element: <ConsentMarking />,
      },
      {
        viewPath: COMPANIES,
        element: <Companies />,
      },
      {
        viewPath: COMPANIES + COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
      {
        viewPath: CONFIGURE_CENTRES,
        element: <ConfigureCentres />,
      },
      {
        viewPath: CONFIGURE_CENTRES + ADD,
        element: <ConfigureCentreView />,
      },
      {
        viewPath: CONFIGURE_CENTRES + EDIT_CONFIGURE_CENTRE,
        element: <ConfigureCentreView />,
      },
      {
        viewPath: SESSION + SETUP_MOCK_INTERVIEW,
        element: <SetupMockInterview />,
      },
      {
        viewPath: SESSION + SETUP_MOCK_INTERVIEW + INTERVIEW_DETAILS,
        element: <ConfigureInterviewDates />,
      },
      {
        viewPath: SESSION + CAMPUS_INTERVIEW_SETTINGS,
        element: <CampusInterviewSettings />,
      },
    ],
  },
  {
    pagePath: MODULE_KEYS.WOMEN_PARTTIME_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
      {
        viewPath: SESSION,
        element: <Session />,
      },
      {
        viewPath: SESSION + ADD_SESSION,
        element: <EditSession />,
      },
      {
        viewPath: SESSION + EDIT_SESSION,
        element: <EditSession />,
      },
      {
        viewPath: SESSION + ROUND_ONE_SETUP_CENTERS,
        element: <SetupCenter />,
      },
      {
        viewPath: SESSION + ROUND_ONE_SETUP_CENTERS + SETUP_CENTERS_DETAILS,
        element: <SetupCenterDetails />,
      },
      {
        viewPath: SESSION + CONSENT_MARKING_ROUND_ONE,
        element: <ConsentMarking />,
      },
      {
        viewPath: SESSION + CONSENT_MARKING_ROUND_TWO,
        element: <ConsentMarking />,
      },
      {
        viewPath: COMPANIES,
        element: <Companies />,
      },
      {
        viewPath: COMPANIES + COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
      {
        viewPath: CONFIGURE_CENTRES,
        element: <ConfigureCentres />,
      },
      {
        viewPath: CONFIGURE_CENTRES + ADD,
        element: <ConfigureCentreView />,
      },
      {
        viewPath: CONFIGURE_CENTRES + EDIT_CONFIGURE_CENTRE,
        element: <ConfigureCentreView />,
      },
      {
        viewPath: SESSION + SETUP_MOCK_INTERVIEW,
        element: <SetupMockInterview />,
      },
      {
        viewPath: SESSION + SETUP_MOCK_INTERVIEW + INTERVIEW_DETAILS,
        element: <ConfigureInterviewDates />,
      },
      {
        viewPath: SESSION + CAMPUS_INTERVIEW_SETTINGS,
        element: <CampusInterviewSettings />,
      },
    ],
  },
  {
    pagePath: CONFIGURATIONS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <Configurations />,
      },
    ],
  },
];

export default config;
