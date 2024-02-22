import { useContext, useEffect } from "react";

import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { PAGINATION_PROPERTIES } from "../../constant/constant";

const useModuleWiseApiCall = ({
  initialApiCall,
  paginationParams,
  setSearchParams,
  triggerPaginationUpdate,
}) => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  useEffect(() => {
    if (triggerPaginationUpdate) {
      setSearchParams((prev) => {
        prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, paginationParams.current);
        prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, paginationParams.pageSize);
        return prev;
      });
    }
    if (selectedModule?.key) {
      initialApiCall();
    }
  }, [selectedModule?.key]);
};

export default useModuleWiseApiCall;
