import React from "react";

import SessionRoundDetailsTemplate from "./SessionRoundDetailsTemplate";

const SessionRoundDetails = ({ intl, onClickEdit, roundDetails, roundNo }) => {
  return (
    <SessionRoundDetailsTemplate
      roundDetails={roundDetails}
      roundNo={roundNo}
      intl={intl}
      onClickEdit={onClickEdit}
    />
  );
};

export default SessionRoundDetails;
