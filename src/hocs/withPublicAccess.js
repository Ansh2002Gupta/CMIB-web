import React, { useEffect } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

import { getItem } from "../services/encrypted-storage-service";
import { ROOT } from "../routes/routeNames";

function withPublicAccess(Component) {
  return (props) => {
    const auth = getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
      if (!_.isEmpty(auth)) {
        navigate(ROOT);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Component {...props} />;
  };
}

export default withPublicAccess;
