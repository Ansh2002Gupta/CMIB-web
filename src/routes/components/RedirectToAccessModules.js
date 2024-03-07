import React, { useContext, useEffect } from "react";

import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useSelectActiveMenuItem from "../../core/hooks/useSelectActiveMenuItem";

const RedirectToAccessedModule = () => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const { navigateToMenuItem } = useSelectActiveMenuItem();

  useEffect(() => {
    if (userProfileDetails?.selectedModuleItem?.key) {
      navigateToMenuItem({
        selectedModule: userProfileDetails?.selectedModuleItem,
      });
    }
  }, [userProfileDetails?.selectedModuleItem]);

  return <div></div>;
};

export default RedirectToAccessedModule;
