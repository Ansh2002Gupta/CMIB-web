import { useContext } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import Http from "../../http-service";
import useHeader from "../../../core/hooks/useHeader";
import useGlobalSessionListApi from "../GlobalSessionList/useGlobalSessionListApi";
import { filterMenuData } from "../../../constant/utils";
import {
  setErrorGetingUserDetails,
  setIsGettingUserDetails,
  setUserDetails,
  setSelectedModule,
} from "../../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import modules from "../../../containers/SideMenu/sideMenuItems";
import { DASHBOARD } from "../../../routes/routeNames";
import { GET_USER_PROFILE_DETAILS } from "../../../constant/apiEndpoints";
import { STATUS_CODES } from "../../../constant/constant";

const useGetUserDetails = () => {
  const intl = useIntl();
  const location = useLocation();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { onLogout } = useHeader();
  const [, userProfileDispatch] = useContext(UserProfileContext);
  const pathSegments = location.pathname.split("/");
  const { getGlobalSessionList } = useGlobalSessionListApi();

  const setFirstActiveModule = (userData) => {
    const accessibleModules = filterMenuData(modules, userData?.menu_items);
    userProfileDispatch(setSelectedModule(accessibleModules[0]));
    accessibleModules?.[0] && getGlobalSessionList(accessibleModules?.[0]?.key);
    navigate(`/${accessibleModules[0]?.key}/${DASHBOARD}`);
  };

  const setDefaultActiveModule = (userData) => {
    const accessibleModules = filterMenuData(modules, userData?.menu_items);
    const selectedModule = accessibleModules.filter((item) => {
      return item.key === pathSegments[1];
    });
    selectedModule?.length && getGlobalSessionList(selectedModule?.[0]?.key);
    if (selectedModule?.length) {
      userProfileDispatch(setSelectedModule(selectedModule[0]));
      return;
    }
    setFirstActiveModule(userData);
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
        setDefaultActiveModule(res.data);
        return;
      }
      userProfileDispatch(
        setErrorGetingUserDetails(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        )
      );
      // onLogout();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" });
      userProfileDispatch(setErrorGetingUserDetails(errorMessage));
      // onLogout();
    }
  };

  const getUserDetails = () => {
    getUserFromServer();
  };

  return { getUserDetails };
};

export default useGetUserDetails;
