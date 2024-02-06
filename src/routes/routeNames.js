/* Routes */
import { MODULE_KEYS } from "../constant/constant";

export const ROOT = "/";
export const CARRER_ASCENT_KEY = `/${MODULE_KEYS.CARRER_ASCENT_KEY}`;
export const CA_JOBS_KEY = `/${MODULE_KEYS.CA_JOBS_KEY}`;
export const CONTROL_KEY = `/${MODULE_KEYS.CONTROL_KEY}`;
export const Configurations = "/configurations";
export const EXPERIENCED_MEMBERS_KEY = `/${MODULE_KEYS.EXPERIENCED_MEMBERS_KEY}`;
export const FORGOT_PASSWORD = "/forgot-password";
export const LOGIN = "/login";
export const NEWLY_QUALIFIED_PLACEMENTS_KEY = `/${MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY}`;
export const OVERSEAS_CHAPTERS_KEY = `/${MODULE_KEYS.OVERSEAS_CHAPTERS_KEY}`;
export const WOMEN_PLACEMENT_KEY = `/${MODULE_KEYS.WOMEN_PARTTIME_KEY}`;

/* Sub Routes */
export const ADD = "add";
export const ADD_NEW_USER_DETAILS = "add";
export const CENTRE_DETAILS = "centre-details";
export const COMPANIES = "companies/";
export const COMPANIES_DETAILS = "company-details/:companyId";
export const CONFIGURE_CENTRES = "global-configurations/";
export const CONSENT_MARKING = "consent-marking";
export const CONTACT_US = "contact-us/";
export const DASHBOARD = "dashboard/";
export const EDIT_CONFIGURE_CENTRE = "centre-details/:centreId";
export const QUERY_DETAILS = "query/:queryId";
export const SESSION = "session/";
export const SETUP_CENTERS = "setup-centers/";
export const SETUP_CENTERS_DETAILS = "details/:centreId";
export const SUBSCRIPTIONS = "subscriptions/";
export const USER_DETAILS = "details/:userId";
export const USERS = "users/";
