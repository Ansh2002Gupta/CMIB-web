import React, { useContext, useEffect } from "react";

import useNavigateScreen from "../core/hooks/useNavigateScreen";
import { UserProfileContext } from "../globalContext/userProfile/userProfileProvider";
import { DASHBOARD } from "./routeNames";

const RedirectToAccessedModule = () => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const { navigateScreen: navigate } = useNavigateScreen();

  useEffect(() => {
    if (userProfileDetails?.selectedModuleItem?.key) {
      navigate(`/${userProfileDetails?.selectedModuleItem?.key}/${DASHBOARD}`);
    }
  }, [userProfileDetails?.selectedModuleItem]);

  return <div></div>;
};

export default RedirectToAccessedModule;
