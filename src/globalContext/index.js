/* import providers */
import authProvider from "./auth/authProvider";
import localeProviders from "./locale/localeProviders";
import dashboardProvider from "./dashboard/dashboardProvider";
import globalSessionProvider from "./globalSession/globalSessionProvider";
import userProfileProvider from "./userProfile/userProfileProvider";
import logoutProvider from "./logout/logoutProvider";
import notificationProvider from "./notification/notificationProvider";

// Import other created Providers and add them here -
const providers = [
  authProvider,
  dashboardProvider,
  globalSessionProvider,
  localeProviders,
  logoutProvider,
  userProfileProvider,
  notificationProvider,
];

const combineProviders = (components) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};

// Combining multiple providers to single provider - this will be wrapped around App.js
export default combineProviders(providers);
