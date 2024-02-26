import React from "react";

import SessionRoundDetailsTemplate from "./SessionRoundDetailsTemplate";

const SessionRoundDetails = ({
  intl,
  onClickEdit,
  roundDetails,
  roundNo,
  sessionData,
}) => {
  return (
    <SessionRoundDetailsTemplate
      roundDetails={roundDetails}
      roundNo={roundNo}
      sessionData={sessionData}
      intl={intl}
      onClickEdit={onClickEdit}
    />
  );
};

export default SessionRoundDetails;
