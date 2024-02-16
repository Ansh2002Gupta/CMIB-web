import Companies from "../views/Companies";
import CompaniesDetails from "../views/CompaniesDetails";
import Configurations from "../views/Configurations/Configurations";
import ConfigureCentres from "../views/ConfigureCentres";
import ContactUsListing from "../views/ContactUsListing";
import ConfigureCentreView from "../views/ConfigureCentreView";
import ConsentMarking from "../views/ConsentMarking";
import DashboardView from "../views/Dashboard/Dashboard";
import DefaultRoute from "./components/DefaultRoute";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";
import HeaderContentWithFooter from "../pages/HeaderContentWithFooter";
import Home from "../pages/Home";
import LoginForm from "../views/LoginForm";
import ManageUsers from "../views/ManageUsers";
import OrientationCenter from "../views/OrientationCenter";
import RedirectToAccessedModule from "./components/RedirectToAccessModules";
import Session from "../views/Session";
import SetupCenter from "../views/SetupCenters";
import Subscriptions from "../views/Subscriptions/Subscriptions";
import SetupCenterDetails from "../views/SetupCenterDetails";
import SetupMockInterview from "../views/SetupMockInterview";
import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import UserDetails from "../views/UserDetails";
import QueryDetails from "../views/QueryDetails";
import {
  ADD,
  ADD_NEW_USER_DETAILS,
  CONFIGURATIONS,
  COMPANIES,
  COMPANIES_DETAILS,
  CONFIGURE_CENTRES,
  CONSENT_MARKING,
  CONTACT_US,
  DASHBOARD,
  EDIT_CONFIGURE_CENTRE,
  FORGOT_PASSWORD,
  ORIENTATION_CENTERS,
  LOGIN,
  OUT_SOURCED,
  QUERY_DETAILS,
  ROOT,
  SESSION,
  SETUP_CENTERS,
  SETUP_CENTERS_DETAILS,
  SETUP_MOCK_INTERVIEW,
  SUBSCRIPTIONS,
  USERS,
  USER_DETAILS,
} from "./routeNames";
import { MODULE_KEYS } from "../constant/constant";

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
        viewPath: SESSION + SETUP_CENTERS,
        element: <SetupCenter />,
      },
      {
        viewPath: SESSION + SETUP_CENTERS + SETUP_CENTERS_DETAILS,
        element: <SetupCenterDetails />,
      },
      { viewPath: CONSENT_MARKING, element: <ConsentMarking /> },
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
        viewPath: SESSION + SETUP_CENTERS,
        element: <SetupCenter />,
      },
      {
        viewPath: SESSION + SETUP_CENTERS + SETUP_CENTERS_DETAILS,
        element: <SetupCenterDetails />,
      },
      { viewPath: CONSENT_MARKING, element: <ConsentMarking /> },
      {
        viewPath: SESSION + ORIENTATION_CENTERS,
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
        viewPath: CONTACT_US,
        element: <ContactUsListing />,
      },
      {
        viewPath: CONTACT_US + QUERY_DETAILS,
        element: <QueryDetails />,
      },
      {
        viewPath: SESSION + SETUP_MOCK_INTERVIEW,
        element: <SetupMockInterview />,
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
        viewPath: SESSION + SETUP_CENTERS,
        element: <SetupCenter />,
      },
      {
        viewPath: SESSION + SETUP_CENTERS + SETUP_CENTERS_DETAILS,
        element: <SetupCenterDetails />,
      },
      { viewPath: CONSENT_MARKING, element: <ConsentMarking /> },
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
        viewPath: SESSION + SETUP_CENTERS,
        element: <SetupCenter />,
      },
      {
        viewPath: SESSION + SETUP_CENTERS + SETUP_CENTERS_DETAILS,
        element: <SetupCenterDetails />,
      },
      { viewPath: CONSENT_MARKING, element: <ConsentMarking /> },
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
