import Home from "../pages/Home";
import Auth from "../pages/Auth";
import HeaderContentWithFooter from "../pages/HeaderContentWithFooter";
import LoginForm from "../views/LoginForm";
import Subscriptions from "../views/Subscriptions/Subscriptions";
import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import { CONFIGURATIONS, DASHBOARD, SUBSCRIPTIONS } from "./routeNames";
import Configurations from "../views/Configurations/Configurations";
import DashboardView from "../views/Dashboard/Dashboard";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";

const HomeWithPrivateAccess = withPrivateAccess(Home);
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
    pagePath: "/login",
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
    pagePath: "/forgot-password",
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
    pagePath: CONFIGURATIONS,
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <Configurations />, // view
      },
    ],
  },
];

export default config;
