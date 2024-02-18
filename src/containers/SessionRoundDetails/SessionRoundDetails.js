import React from "react";
import useFetch from "../../core/hooks/useFetch";

import SessionRoundDetailsTemplate from "./SessionRoundDetailsTemplate";
import CustomLoader from "../../components/CustomLoader";
import { ADMIN_ROUTE, ROUNDS } from "../../constant/apiEndpoints";

const SessionRoundDetails = ({ intl, onClickEdit, selectedModule }) => {
  const { data: roundDetails, isError, isLoading } = useFetch({
    // TODO : remove constant round id
    url: ADMIN_ROUTE + `/${selectedModule?.key}` + ROUNDS + "/117",
  });

  return isLoading ? (
    <CustomLoader />
  ) : (
    <SessionRoundDetailsTemplate
      roundDetails={roundDetails}
      intl={intl}
      onClickEdit={onClickEdit}
    />
  );
};

export default SessionRoundDetails;
