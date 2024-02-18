import React from "react";

import SessionRoundDetailsTemplate from "./SessionRoundDetailsTemplate";

const SessionRoundDetails = ({ intl, onClickEdit, roundDetails }) => {
  return (
    <SessionRoundDetailsTemplate
      roundDetails={roundDetails}
      intl={intl}
      onClickEdit={onClickEdit}
    />
  );
};

export default SessionRoundDetails;
