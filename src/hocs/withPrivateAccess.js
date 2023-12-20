import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import _ from "lodash";

import { getItem } from "../services/encrypted-storage-service";
import { LOGIN } from "../routes/routeNames";

function withPrivateAccess(Component) {
  return (props) => {
    const auth = getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
      if (_.isEmpty(auth)) {
        navigate(LOGIN);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return <Component {...props} />;
  };
}

export default withPrivateAccess;
