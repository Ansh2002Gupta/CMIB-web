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
import UserDetails from "../views/UserDetails";
import {
  DASHBOARD,
  SUBSCRIPTIONS,
  LOGIN,
  MANAGE_USERS,
  FORGOT_PASSWORD,
  VIEW_USER_DETAILS,
  ROOT,
  USERS,
  EDIT_USER_DETAILS,
  ADD_NEW_USER_DETAILS,
} from "./routeNames";
import { FORM_STATES } from "../constant/constant";

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
    pagePath: USERS,
    element: <AuthWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: VIEW_USER_DETAILS,
        element: <UserDetails currentFormState={FORM_STATES.VIEW_ONLY} />, // view
      },
      {
        viewPath: EDIT_USER_DETAILS,
        element: <UserDetails currentFormState={FORM_STATES.EDITABLE} />, // view
      },
      {
        viewPath: ADD_NEW_USER_DETAILS,
        element: <UserDetails currentFormState={FORM_STATES.EMPTY} />, // view
      },
    ],
  },
];

export default config;
