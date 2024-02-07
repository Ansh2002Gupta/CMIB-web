import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getItem } from "../../services/encrypted-storage-service";
import { LOGIN, ROOT } from "../routeNames";

const DefaultRoute = () => {
  const auth = getItem("authToken");
  const [navigationPath, setNavigationPath] = useState(null);

  useEffect(() => {
    async function checkAuthAndNavigate() {
      if (!auth) {
        setNavigationPath(LOGIN);
        return;
      }
      setNavigationPath(ROOT);
    }

    checkAuthAndNavigate();
  }, []);

  // If navigationPath is not null, navigate to the corresponding route
  if (navigationPath) {
    return <Navigate to={navigationPath} replace />;
  }

  // Render nothing or a loading spinner until navigationPath is determined
  return null; // or return <LoadingIndicator />;
};

export default DefaultRoute;
