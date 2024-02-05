import Auth from "../pages/Auth";
import Companies from "../views/Companies";
import CompaniesDetails from "../views/CompaniesDetails";
import Configurations from "../views/Configurations/Configurations";
import ConfigureCentres from "../views/ConfigureCentres";
import ContactUsListing from "../views/ContactUsListing";
import ConfigureCentreView from "../views/ConfigureCentreView";
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
import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import UserDetails from "../views/UserDetails";
import QueryDetails from "../views/QueryDetails";
import {
  ADD,
  DASHBOARD,
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
  SETUP_CENTERS_DETAILS,
  EDIT_CONFIGURE_CENTRE,
  CA_JOBS_KEY,
  CARRER_ASCENT_KEY,
  CONTROL_KEY,
  NEWLY_QUALIFIED_PLACEMENTS_KEY,
  OVERSEAS_CHAPTERS_KEY,
  WOMEN_PLACEMENT_KEY,
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
    pagePath: CA_JOBS_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
    ],
  },
  {
    pagePath: NEWLY_QUALIFIED_PLACEMENTS_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
    ],
  },
  {
    pagePath: OVERSEAS_CHAPTERS_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
    ],
  },
  {
    pagePath: CARRER_ASCENT_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
    ],
  },
  {
    pagePath: WOMEN_PLACEMENT_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
    ],
  },
  {
    pagePath: CONTROL_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: DASHBOARD,
        element: <DashboardView />,
      },
    ],
  },
  {
    pagePath: CA_JOBS_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: SUBSCRIPTIONS,
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
    pagePath: CA_JOBS_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,
    views: [
      {
        viewPath: COMPANIES,
        element: <Companies />,
      },
      {
        viewPath: COMPANIES + COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
    ],
  },
  {
    pagePath: NEWLY_QUALIFIED_PLACEMENTS_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,

    views: [
      // array of views under Page route
      {
        viewPath: COMPANIES,
        element: <Companies />,
      },
      {
        viewPath: COMPANIES + COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
    ],
  },
  {
    pagePath: OVERSEAS_CHAPTERS_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,

    views: [
      // array of views under Page route
      {
        viewPath: COMPANIES,
        element: <Companies />,
      },
      {
        viewPath: COMPANIES + COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
    ],
  },
  {
    pagePath: CARRER_ASCENT_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,

    views: [
      // array of views under Page route
      {
        viewPath: COMPANIES,
        element: <Companies />,
      },
      {
        viewPath: COMPANIES + COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
    ],
  },
  {
    pagePath: WOMEN_PLACEMENT_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,

    views: [
      // array of views under Page route
      {
        viewPath: COMPANIES,
        element: <Companies />,
      },
      {
        viewPath: COMPANIES + COMPANIES_DETAILS,
        element: <CompaniesDetails />,
      },
    ],
  },
  {
    pagePath: CONTROL_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
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
    pagePath: NEWLY_QUALIFIED_PLACEMENTS_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
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
    ],
  },
  {
    pagePath: OVERSEAS_CHAPTERS_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
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
    ],
  },
  {
    pagePath: CARRER_ASCENT_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
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
    ],
  },
  {
    pagePath: WOMEN_PLACEMENT_KEY,
    element: <HomeWithPrivateAccess />,
    views: [
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
    ],
  },
  {
    pagePath: CA_JOBS_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,
    views: [
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
    pagePath: NEWLY_QUALIFIED_PLACEMENTS_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,
    views: [
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
    pagePath: OVERSEAS_CHAPTERS_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,
    views: [
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
    pagePath: CARRER_ASCENT_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,
    views: [
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
    pagePath: WOMEN_PLACEMENT_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,
    views: [
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
    pagePath: NEWLY_QUALIFIED_PLACEMENTS_KEY,
    element: <HomeWithPrivateAccess noOuterPadding />,
    views: [
      {
        viewPath: CONTACT_US,
        element: <ContactUsListing />,
      },
      {
        viewPath: CONTACT_US + QUERY_DETAILS,
        element: <QueryDetails />,
      },
    ],
  },
];

export default config;
