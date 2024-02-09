/* import providers */
import authProvider from "./auth/authProvider";
import localeProviders from "./locale/localeProviders";
import dashboardProvider from "./dashboard/dashboardProvider";
import userProfileProvider from "./userProfile/userProfileProvider";
import logoutProvider from "./logout/logoutProvider";
import UserDetailProvider from "./userDetail/userDetailProvider";

// Import other created Providers and add them here -
const providers = [
  authProvider,
  dashboardProvider,
  localeProviders,
  userProfileProvider,
  logoutProvider,
  UserDetailProvider,
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