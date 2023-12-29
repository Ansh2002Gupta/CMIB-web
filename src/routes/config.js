import Auth from "../pages/Auth";
import Configurations from "../views/Configurations/Configurations";
import ConfigureCentres from "../views/ConfigureCentres";
import DashboardView from "../views/Dashboard/Dashboard";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";
import HeaderContentWithFooter from "../pages/HeaderContentWithFooter";
import Home from "../pages/Home";
import LoginForm from "../views/LoginForm";
import Session from "../views/Session";
import ManageUsers from "../views/ManageUsers";
import Subscriptions from "../views/Subscriptions/Subscriptions";
import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import UserDetails from "../views/UserDetails";
import {
  DASHBOARD,
  SUBSCRIPTIONS,
  LOGIN,
  FORGOT_PASSWORD,
  ROOT,
  USERS,
  USER_DETAILS,
  ADD_NEW_USER_DETAILS,
  CONFIGURE_CENTRES,
  SESSION,
  ROUTE,
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
    pagePath: USERS,
    element: <AuthWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <ManageUsers />, // view
      },
      {
        viewPath: USER_DETAILS,
        element: <UserDetails />, // view
      },
      {
        viewPath: ADD_NEW_USER_DETAILS,
        element: <UserDetails />, // view
      },
    ],
  },
  {
    pagePath: SESSION,
    element: <HomeWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <Session />,
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
