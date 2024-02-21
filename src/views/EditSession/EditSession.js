import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { TwoRow } from "core/layouts";
import useResponsive from "core/hooks/useResponsive";

import ContentHeader from "../../containers/ContentHeader";
import SessionDetails from "../../containers/SessionDetails";
import useFetch from "../../core/hooks/useFetch";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { CORE_ROUTE, SESSIONS } from "../../constant/apiEndpoints";
import variables from "../../themes/base/styles/variables";
import styles from "./EditSession.module.scss";

function EditSession() {
  const intl = useIntl();
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const location = useLocation();
  const isEditSession = location.pathname.includes("/edit-session");
  const {
    data: sessionData,
    error: sessionError,
    fetchData,
    isError: isSessionError,
    isLoading: isGettingSessions,
    isSuccess,
    setData,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      SESSIONS +
      `/${globalSessionDetails?.globalSessionId}`,
    otherOptions: { skipApiCallOnMount: true },
  });

  const responsive = useResponsive();

  useEffect(() => {
    if (globalSessionDetails?.globalSessionId && isEditSession) {
      fetchData({});
    }
  }, [globalSessionDetails?.globalSessionId]);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <ContentHeader
          customStyles={!responsive?.isMd ? styles.customStyles : ""}
          headerText={intl.formatMessage({
            id: isEditSession
              ? "session.editSession"
              : "session.setUpNewSession",
          })}
          customContainerStyle={styles.customContainerStyle}
        />
      }
      bottomSection={
        <SessionDetails
          key={Date.now()}
          {...{
            isEditable: true,
            addSession: !isEditSession,
            isGettingSessions,
            isSessionError,
            fetchData,
            sessionData,
            sessionError,
          }}
        />
      }
    />
  );
}

export default EditSession;
