import { useLocation, useNavigate } from "react-router-dom";

const useNavigateScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateScreen = (route) => {
    if (location.pathname !== route) {
      navigate(route);
    }
  };

  return { navigateScreen };
};

export default useNavigateScreen;
