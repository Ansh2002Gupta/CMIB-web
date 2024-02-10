import { useLocation, useNavigate } from "react-router-dom";

const useNavigateScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateScreen = (route, replace = true) => {
    if (location.pathname !== route) {
      navigate(route, { replace: replace });
    }
  };

  return { navigateScreen };
};

export default useNavigateScreen;
