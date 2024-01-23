import { useContext } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import useHeader from "../../../core/hooks/useHeader";
import { filterMenuData } from "../../../constant/utils";
import { getItem, setItem } from "../../encrypted-storage-service";
import {
  setErrorGetingUserDetails,
  setIsGettingUserDetails,
  setUserDetails,
  setSelectedModule,
} from "../../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import modules from "../../../containers/SideMenu/sideMenuItems";
import { GET_USER_PROFILE_DETAILS } from "../../../constant/apiEndpoints";
import { STATUS_CODES, STORAGE_KEYS } from "../../../constant/constant";

const useGetUserDetails = () => {
  const intl = useIntl();
  const { onLogout } = useHeader();
  const [, userProfileDispatch] = useContext(UserProfileContext);

  const setFirstActiveModule = (userData) => {
    const accessibleModules = filterMenuData(modules, userData?.menu_items);
    userProfileDispatch(setSelectedModule(accessibleModules[0]));
  };

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
        setFirstActiveModule(res.data);
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
      setFirstActiveModule(userData);
    } else {
      getUserFromServer();
    }
  };

  return { getUserDetails };
};

export default useGetUserDetails;
