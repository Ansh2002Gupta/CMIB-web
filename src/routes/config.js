import Auth from "../pages/Auth";
import Companies from "../views/Companies";
import CompaniesDetails from "../views/CompaniesDetails";
import Configurations from "../views/Configurations/Configurations";
import ConfigureCentres from "../views/ConfigureCentres";
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
import {
  ROUTE,
  DASHBOARD,
  SUBSCRIPTIONS,
  LOGIN,
  COMPANIES,
  COMPANIES_DETAILS,
  MANAGE_USERS,
  FORGOT_PASSWORD,
  ROOT,
  CONFIGURE_CENTRES,
  SESSION,
  SETUP_CENTERS,
  SETUP_CENTERS_DETAILS,
} from "./routeNames";

const HomeWithPrivateAccess = withPrivateAccess(Home);
const HomeWithPublicAccess = withPublicAccess(Home);
const AuthWithPublicAccess = withPublicAccess(Auth);
const HeaderContentWithFooterWithPublicAccess = withPublicAccess(
  HeaderContentWithFooter
);

const config = [
  {
    pagePath: "/example/:id",
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "route",
        element: <div>Example Route</div>,
      },
      {
        viewPath: "route1",
        element: <div>Example Route1</div>,
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
    element: <HomeWithPublicAccess />,
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
    pagePath: MANAGE_USERS,
    element: <HomeWithPublicAccess noOuterPadding />,
    views: [
      {
        viewPath: "",
        element: <ManageUsers />,
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
        viewPath: SETUP_CENTERS_DETAILS,
        element: <SetupCenterDetails />,
      },
    ],
  },
  {
    pagePath: CONFIGURE_CENTRES,
    element: <HomeWithPublicAccess noOuterPadding />,
    views: [
      {
        viewPath: "",
        element: <ConfigureCentres />,
      },
    ],
  },
];

export default config;
