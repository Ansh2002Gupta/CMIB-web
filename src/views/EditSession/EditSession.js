import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";

import { TwoRow } from "core/layouts";
import useResponsive from "core/hooks/useResponsive";

import ContentHeader from "../../containers/ContentHeader";
import SessionDetails from "../../containers/SessionDetails";
import useFetch from "../../core/hooks/useFetch";
import { ADMIN_ROUTE, SESSIONS } from "../../constant/apiEndpoints";
import { FORM_STATES } from "../../constant/constant";
import variables from "../../themes/base/styles/variables";
import styles from "./EditSession.module.scss";

function EditSession() {
  const intl = useIntl();
  const [sessionId, setSessionId] = useState(1); //TODO : 1 has to replace once Global Session will implement as we will take id from there using useContext
  const {
    data: sessionData,
    error: sessionError,
    fetchData,
    isError: isSessionError,
    isLoading: isGettingSessions,
    isSuccess,
    setData,
  } = useFetch({
    url: ADMIN_ROUTE + SESSIONS + `/${sessionId}`,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFormState = searchParams.get("mode");

  const responsive = useResponsive();

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <ContentHeader
          customStyles={!responsive?.isMd ? styles.customStyles : ""}
          headerText={intl.formatMessage({ id: "session.setUpNewSession" })}
          customContainerStyle={styles.customContainerStyle}
        />
      }
      bottomSection={
        <SessionDetails
          key={Date.now()}
          {...{
            isEditable: true,
            addSession: currentFormState !== FORM_STATES.EDITABLE,
            isGettingSessions,
            isSessionError,
            fetchData,
            sessionData,
            sessionId,
            sessionError,
            setSessionId,
          }}
        />
      }
      bottomSectionStyle={{
        padding: variables.fontSizeXlargeMedium,
      }}
    />
  );
}

export default EditSession;
