import { useContext } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import {
  setErrorGetingUserDetails,
  setIsGettingUserDetails,
  setUserDetails,
} from "../../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import useHeader from "../../../core/hooks/useHeader";
import { GET_USER_PROFILE_DETAILS } from "../../../constant/apiEndpoints";
import { STATUS_CODES, STORAGE_KEYS } from "../../../constant/constant";
import { getItem, setItem } from "../../encrypted-storage-service";

const useGetUserDetails = () => {
  const intl = useIntl();
  const { onLogout } = useHeader();
  const [, userProfileDispatch] = useContext(UserProfileContext);

  const getUserFromServer = async () => {
    try {
      userProfileDispatch(setIsGettingUserDetails(true));
      userProfileDispatch(setErrorGetingUserDetails(""));
      const res = await Http.get(GET_USER_PROFILE_DETAILS);
      userProfileDispatch(setIsGettingUserDetails(false));
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        userProfileDispatch(setUserDetails(res.data));
        setItem(STORAGE_KEYS.USER_DATA, res.data);
        return;
      }
      userProfileDispatch(
        setErrorGetingUserDetails(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        )
      );
      onLogout();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" });
      userProfileDispatch(setErrorGetingUserDetails(errorMessage));
      onLogout();
    }
  };

  const getUserDetails = () => {
    const userData = getItem(STORAGE_KEYS?.USER_DATA);
    if (userData) {
      userProfileDispatch(setUserDetails(userData));
    } else {
      getUserFromServer();
    }
  };

  return { getUserDetails };
};

export default useGetUserDetails;
