import { useContext, useEffect } from "react";

import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { urlService } from "../../Utils/urlService";
import { PAGINATION_PROPERTIES } from "../../constant/constant";

const useModuleWiseApiCall = ({
  otherDependencies = "",
  isSessionId,
  initialApiCall,
  paginationParams,
  triggerPaginationUpdate,
}) => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  useEffect(() => {
    if (triggerPaginationUpdate) {
      const paginationQueryParams = {
        [PAGINATION_PROPERTIES.CURRENT_PAGE]: paginationParams.current,
        [PAGINATION_PROPERTIES.ROW_PER_PAGE]: paginationParams.pageSize,
      };
      urlService.setMultipleQueryStringValues(paginationQueryParams);
    }
    if (selectedModule?.key && isSessionId) {
      initialApiCall();
    }
  }, [selectedModule?.key, isSessionId, otherDependencies]);
};

export default useModuleWiseApiCall;
