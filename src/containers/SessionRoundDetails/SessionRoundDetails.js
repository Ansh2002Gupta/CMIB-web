import React from "react";

import SessionRoundDetailsTemplate from "./SessionRoundDetailsTemplate";

const SessionRoundDetails = ({
  currentGlobalSession,
  intl,
  onClickEdit,
  roundDetails,
  roundNo,
  sessionData,
}) => {
  return (
    <SessionRoundDetailsTemplate
      currentGlobalSession={currentGlobalSession}
      roundDetails={roundDetails}
      roundNo={roundNo}
      sessionData={sessionData}
      intl={intl}
      onClickEdit={onClickEdit}
    />
  );
};

export default SessionRoundDetails;
