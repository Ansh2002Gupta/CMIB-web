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
import useSelectActiveMenuItem from "../../../core/hooks/useSelectActiveMenuItem";
import modules from "../../../containers/SideMenu/sideMenuItems";
import { GET_USER_PROFILE_DETAILS } from "../../../constant/apiEndpoints";
import { STATUS_CODES } from "../../../constant/constant";

const useGetUserDetails = () => {
  const location = useLocation();
  const intl = useIntl();

  const [, userProfileDispatch] = useContext(UserProfileContext);

  const { onLogout } = useHeader();
  const { navigateToFirstAccessibleItem, navigateToMenuItem } =
    useSelectActiveMenuItem();
  const { getGlobalSessionList } = useGlobalSessionListApi();

  const pathSegments = location.pathname.split("/");

  const setFirstActiveModule = (userData) => {
    const accessibleModules = filterMenuData(modules, userData?.menu_items);
    userProfileDispatch(setSelectedModule(accessibleModules[0]));
    accessibleModules?.[0] && getGlobalSessionList(accessibleModules?.[0]?.key);
    navigateToMenuItem({
      selectedModule: accessibleModules[0],
    });
  };

  const setDefaultActiveModule = (userData) => {
    const accessibleModules = filterMenuData(modules, userData?.menu_items);
    const selectedModule = accessibleModules.filter((item) => {
      return item.key === pathSegments[1];
    });
    selectedModule?.length && getGlobalSessionList(selectedModule?.[0]?.key);
    if (selectedModule?.length) {
      userProfileDispatch(setSelectedModule(selectedModule[0]));
      const activePath = location.pathname?.split("/")?.[2];
      const menuItemDetails = selectedModule[0]?.children?.find(
        (controlModule) => controlModule.key?.includes(activePath)
      );
      if (!menuItemDetails) {
        navigateToFirstAccessibleItem({ selectedModule: selectedModule?.[0] });
      }
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
    getUserFromServer();
  };

  return { getUserDetails };
};

export default useGetUserDetails;
