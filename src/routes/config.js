import Auth from "../pages/Auth";
import DashboardView from "../views/Dashboard/Dashboard";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";
import HeaderContentWithFooter from "../pages/HeaderContentWithFooter";
import Home from "../pages/Home";
import LoginForm from "../views/LoginForm";
import ManageUsers from "../views/ManageUsers";
import Subscriptions from "../views/Subscriptions/Subscriptions";
import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import {
  DASHBOARD,
  SUBSCRIPTIONS,
  LOGIN,
  MANAGE_USERS,
  FORGOT_PASSWORD,
  VIEW_USER_DETAILS,
  ROOT,
} from "./routeNames";
import UserDetails from "../views/UserDetails";

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
    element: <HeaderContentWithFooterWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <LoginForm />, // view
      },
    ],
  },
  {
    pagePath: FORGOT_PASSWORD,
    element: <HeaderContentWithFooterWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <ForgotPassword />, // view
      },
    ],
  },
  {
    pagePath: ROOT,
    element: <HomeWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <DashboardView />, // view
      },
    ],
  },
  {
    pagePath: DASHBOARD,
    element: <HomeWithPrivateAccess />, // Page
    // element: <AuthWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <DashboardView />, // view
      },
    ],
  },
  {
    pagePath: SUBSCRIPTIONS,
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <Subscriptions />, // view
      },
    ],
  },
  {
    pagePath: MANAGE_USERS,
    element: <HomeWithPublicAccess noOuterPadding />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <ManageUsers />, // view
      },
    ],
  },
  {
    pagePath: VIEW_USER_DETAILS,
    element: <AuthWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <UserDetails />, // view
      },
    ],
  },
];

export default config;
