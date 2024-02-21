import React from "react";

import SessionRoundDetailsTemplate from "./SessionRoundDetailsTemplate";

const SessionRoundDetails = ({
  currentGlobalSession,
  intl,
  onClickEdit,
  roundDetails,
  roundNo,
}) => {
  return (
    <SessionRoundDetailsTemplate
      currentGlobalSession={currentGlobalSession}
      roundDetails={roundDetails}
      roundNo={roundNo}
      intl={intl}
      onClickEdit={onClickEdit}
    />
  );
};

export default SessionRoundDetails;
