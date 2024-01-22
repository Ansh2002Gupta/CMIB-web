import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import _ from "lodash";

import CustomLoader from "../components/CustomLoader";
import useGetUserDetails from "../services/api-services/UserProfile/useGetUserProfile";
import { getItem } from "../services/encrypted-storage-service";
import { UserProfileContext } from "../globalContext/userProfile/userProfileProvider";
import { LOGIN } from "../routes/routeNames";

function withPrivateAccess(Component) {
  return (props) => {
    const auth = getItem("authToken");
    const navigate = useNavigate();
    const [userProfileDetails] = useContext(UserProfileContext);
    const { getUserDetails } = useGetUserDetails();

    useEffect(() => {
      if (_.isEmpty(auth)) {
        navigate(LOGIN);
      }
      if (auth && !Object.keys(userProfileDetails.userDetails)?.length) {
        getUserDetails();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (
      userProfileDetails.isGettingUserDetails ||
      !Object.keys(userProfileDetails.userDetails)?.length
    ) {
      return <CustomLoader />;
    }

    if (!!Object.keys(userProfileDetails.userDetails)?.length) {
      return <Component {...props} />;
    }
    return null;
  };
}

export default withPrivateAccess;
