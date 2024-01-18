import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import _ from "lodash";

import { getItem, setItem } from "../services/encrypted-storage-service";
import useFetch from "../core/hooks/useFetch";
import useHeader from "../core/hooks/useHeader";
import useGetUserDetails from "../services/api-services/UserProfile/useGetUserProfile";
import { UserProfileContext } from "../globalContext/userProfile/userProfileProvider";
import CustomLoader from "../components/CustomLoader";
import { STORAGE_KEYS } from "../constant/constant";
import { CORE_MENU_PROFILE, ADMIN_ROUTE } from "../constant/apiEndpoints";
import { LOGIN } from "../routes/routeNames";

function withPrivateAccess(Component) {
  return (props) => {
    const auth = getItem("authToken");
    const navigate = useNavigate();
    const { onLogout } = useHeader();
    const { data, error, fetchData, isError } = useFetch({
      url: CORE_MENU_PROFILE + ADMIN_ROUTE,
      otherOptions: {
        skipApiCallOnMount: true,
      },
    });
    const [userProfileDetails] = useContext(UserProfileContext);
    const { getUserDetails } = useGetUserDetails();

    useEffect(() => {
      if (_.isEmpty(auth)) {
        navigate(LOGIN);
      }
      if (auth && !Object.keys(userProfileDetails.userDetails)?.length) {
        getUserDetails();
      }
      if (auth && !getItem(STORAGE_KEYS?.USER_DATA)) {
        fetchData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    useEffect(() => {
      if (data) {
        setItem(STORAGE_KEYS?.USER_DATA, data);
      }
      if (isError) {
        onLogout();
      }
    }, [data, isError, error]);

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
