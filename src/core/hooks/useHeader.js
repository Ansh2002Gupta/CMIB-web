import { useContext } from "react";

import { AuthContext } from "../../globalContext/auth/authProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useNavigateScreen from "./useNavigateScreen";
import { resetUserDetails } from "../../globalContext/userProfile/userProfileActions";
import { clearAuthAndLogout } from "../../globalContext/auth/authActions";
import { LOGIN } from "../../routes/routeNames";

function useHeader() {
  const [, authDispatch] = useContext(AuthContext);
  const [, userProfileDispatch] = useContext(UserProfileContext);
  const { navigateScreen: navigate } = useNavigateScreen();

  const onLogout = () => {
    authDispatch(clearAuthAndLogout());
    userProfileDispatch(resetUserDetails());
    navigate(LOGIN);
  };

  return {
    onLogout,
  };
}

export default useHeader;
