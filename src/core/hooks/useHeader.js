import { useContext } from "react";
import { useIntl } from "react-intl";

import { AuthContext } from "../../globalContext/auth/authProvider";
import { LogoutContext } from "../../globalContext/logout/logoutProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useLogout from "../../services/api-services/Logout/useLogout";
import useNavigateScreen from "./useNavigateScreen";
import { resetUserDetails } from "../../globalContext/userProfile/userProfileActions";
import { setLogoutToast } from "../../globalContext/logout/logoutActions";
import { clearAuthAndLogout } from "../../globalContext/auth/authActions";
import { LOGIN } from "../../routes/routeNames";

function useHeader() {
  const intl = useIntl();
  const [, authDispatch] = useContext(AuthContext);
  const [, userProfileDispatch] = useContext(UserProfileContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const { handleUserLogout, isLoading: isUserLoggingOut } = useLogout();
  const [, setLogoutDispatch] = useContext(LogoutContext);

  const onLogout = async (showToast = true) => {
    await handleUserLogout();
    authDispatch(clearAuthAndLogout());
    userProfileDispatch(resetUserDetails());
    if (showToast) {
      setLogoutDispatch(
        setLogoutToast({
          isSuccess: true,
          message: intl.formatMessage({ id: "label.logoutSuccessful" }),
        })
      );
    }
    navigate(LOGIN);
  };

  return {
    onLogout,
    isUserLoggingOut,
  };
}

export default useHeader;
