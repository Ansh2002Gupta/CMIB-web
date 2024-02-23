import { useLocation, useNavigate } from "react-router-dom";

const useNavigateScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateScreen = (route, replace = false, state = {}) => {
    if (location.pathname !== route) {
      navigate(route, { replace: replace, state });
    }
  };

  return { navigateScreen };
};

export default useNavigateScreen;
