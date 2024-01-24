import Auth from "../pages/Auth";
import Companies from "../views/Companies";
import CompaniesDetails from "../views/CompaniesDetails";
import Configurations from "../views/Configurations/Configurations";
import ConfigureCentres from "../views/ConfigureCentres";
import ContactUsListing from "../views/ContactUsListing";
import ConfigureCentreView from "../views/ConfigureCentreView";
import ConfigureInterviewDates from "../views/ConfigureInterviewDates";
import ConsentMarking from "../views/ConsentMarking";
import DashboardView from "../views/Dashboard/Dashboard";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";
import HeaderContentWithFooter from "../pages/HeaderContentWithFooter";
import Home from "../pages/Home";
import LoginForm from "../views/LoginForm";
import ManageUsers from "../views/ManageUsers";
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
  DASHBOARD,
  DETAILS,
  SUBSCRIPTIONS,
  LOGIN,
  COMPANIES,
  COMPANIES_DETAILS,
  FORGOT_PASSWORD,
  ROOT,
  USERS,
  USER_DETAILS,
  ADD_NEW_USER_DETAILS,
  CONFIGURE_CENTRES,
  SESSION,
  CONTACT_US,
  ROUTE,
  SETUP_CENTERS,
  CONSENT_MARKING,
  QUERY_DETAILS,
  SETUP_MOCK_INTERVIEW,
} from "./routeNames";

const HomeWithPrivateAccess = withPrivateAccess(Home);
const HomeWithPublicAccess = withPublicAccess(Home);
const AuthWithPublicAccess = withPublicAccess(Auth);
const AuthWithPrivateAccess = withPrivateAccess(Auth);
const HeaderContentWithFooterWithPublicAccess = withPublicAccess(
  HeaderContentWithFooter
);

const config = [
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
    pagePath: ROOT,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <DashboardView />,
      },
    ],
  },
  {
    pagePath: DASHBOARD,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <DashboardView />,
      },
    ],
  },
  {
    pagePath: SUBSCRIPTIONS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <Subscriptions />,
      },
    ],
  },
  {
    pagePath: ROUTE,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <Configurations />,
      },
    ],
  },
  {
    pagePath: COMPANIES,
    element: <HomeWithPrivateAccess noOuterPadding />,
    views: [
      {
        viewPath: "",
        element: <Companies />,
      },
      {
        viewPath: COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
    ],
  },
  {
    pagePath: COMPANIES,
    element: <HomeWithPrivateAccess noOuterPadding />,

    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <Companies />,
      },
      {
        viewPath: COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
    ],
  },
  {
    pagePath: USERS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <ManageUsers />,
      },
      {
        viewPath: USER_DETAILS,
        element: <UserDetails />,
      },
      {
        viewPath: ADD_NEW_USER_DETAILS,
        element: <UserDetails />,
      },
    ],
  },
  {
    pagePath: SESSION,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <Session />,
      },
      {
        viewPath: SETUP_CENTERS,
        element: <SetupCenter />,
      },
      {
        viewPath: SETUP_CENTERS + DETAILS,
        element: <SetupCenterDetails />,
      },
      {
        viewPath: SETUP_MOCK_INTERVIEW,
        element: <SetupMockInterview />,
      },
      {
        viewPath: SETUP_MOCK_INTERVIEW + DETAILS,
        element: <ConfigureInterviewDates />,
      },
      { viewPath: CONSENT_MARKING, element: <ConsentMarking /> },
    ],
  },
  {
    pagePath: CONFIGURE_CENTRES,
    element: <HomeWithPrivateAccess noOuterPadding />,
    views: [
      {
        viewPath: "",
        element: <ConfigureCentres />,
      },
      {
        viewPath: ADD,
        element: <ConfigureCentreView />,
      },
    ],
  },
  {
    pagePath: CONTACT_US,
    element: <HomeWithPrivateAccess noOuterPadding />,
    views: [
      {
        viewPath: "",
        element: <ContactUsListing />,
      },
      {
        viewPath: QUERY_DETAILS,
        element: <QueryDetails />,
      },
    ],
  },
];

export default config;
