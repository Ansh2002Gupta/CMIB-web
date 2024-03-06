import { useLocation } from "react-router-dom";

import useNavigateScreen from "./useNavigateScreen";
import { DASHBOARD } from "../../routes/routeNames";

const useSelectActiveMenuItem = () => {
  const location = useLocation();
  const { navigateScreen: navigate } = useNavigateScreen();

  const navigateToMenuItem = ({ selectedModule }) => {
    let menuItem = "";
    const activeMenuItemPath = location.pathname?.split("/")?.[2] || "";
    const activeMenuDetailsInSelectedModule = selectedModule?.children?.find(
      (item) => item?.key?.includes(activeMenuItemPath)
    );
    if (activeMenuDetailsInSelectedModule) {
      menuItem = activeMenuDetailsInSelectedModule?.key;
    } else {
      menuItem = selectedModule?.children?.[0]?.key || DASHBOARD;
    }
    navigate(`/${selectedModule?.key}/${menuItem}`);
  };

  const navigateToFirstAccessibleItem = ({ selectedModule }) => {
    const firstAccessibleMnuItem =
      selectedModule?.children?.[0]?.key || DASHBOARD;
    navigate(`/${selectedModule?.key}/${firstAccessibleMnuItem}`);
  };

  return { navigateToFirstAccessibleItem, navigateToMenuItem };
};

export default useSelectActiveMenuItem;
