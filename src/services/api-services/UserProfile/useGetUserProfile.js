import { useContext } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import {
  setErrorGetingUserDetails,
  setIsGettingUserDetails,
  setUserDetails,
} from "../../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import {
  ADMIN_ROUTE,
  GET_USER_PROFILE_DETAILS,
} from "../../../constant/apiEndpoints";
import { STATUS_CODES } from "../../../constant/constant";

const useGetUserDetails = () => {
  const intl = useIntl();
  const [, userProfileDispatch] = useContext(UserProfileContext);

  const getUserDetails = async () => {
    try {
      userProfileDispatch(setIsGettingUserDetails(true));
      userProfileDispatch(setErrorGetingUserDetails(""));
      const res = await Http.get(ADMIN_ROUTE + GET_USER_PROFILE_DETAILS);
      userProfileDispatch(setIsGettingUserDetails(false));
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        userProfileDispatch(setUserDetails(res.data));
        return;
      }
      userProfileDispatch(
        setErrorGetingUserDetails(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        )
      );
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" });
      userProfileDispatch(setErrorGetingUserDetails(errorMessage));
    }
  };
  return { getUserDetails };
};

export default useGetUserDetails;
