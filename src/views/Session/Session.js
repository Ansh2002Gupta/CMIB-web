import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "core/layouts";
import useResponsive from "core/hooks/useResponsive";

import ContentHeader from "../../containers/ContentHeader";
import CustomButton from "../../components/CustomButton";
import CustomTabs from "../../components/CustomTabs";
import SessionDetails from "../../containers/SessionDetails";
import SessionRound from "../SessionRound";
import useFetch from "../../core/hooks/useFetch";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useShowNotification from "../../core/hooks/useShowNotification";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  addSessionNotification,
  setShowSuccessNotification,
  updateSessionNotification,
} from "../../globalContext/notification/notificationActions";
import { getCurrentActiveTab } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { CORE_ROUTE, SESSIONS } from "../../constant/apiEndpoints";
import { ADD_SESSION } from "../../routes/routeNames";
import {
  MENU_KEYS,
  NOTIFICATION_TYPES,
  ROUND_ONE_CARD_LIST,
  ROUND_TWO_CARD_LIST,
  VALID_SESSION_TABS_ID,
} from "../../constant/constant";
import { ReactComponent as AddIcon } from "../../themes/base/assets/images/plus icon.svg";
import styles from "./session.module.scss";

function Session() {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService?.getQueryStringValue("tab"),
      VALID_SESSION_TABS_ID
    )
  );
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [notificationState, setNotificationStateDispatch] =
    useContext(NotificationContext);

  const {
    data: sessionData,
    error: sessionError,
    fetchData,
    isError: isSessionError,
    isLoading: isGettingSessions,
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
    if (globalSessionDetails?.globalSessionId) {
      fetchData({});
    }
  }, [globalSessionDetails?.globalSessionId]);

  useEffect(() => {
    if (
      notificationState?.addSessionSuccessfully ||
      notificationState?.updateSessionSuccessfully
    ) {
      showNotification({
        text: intl.formatMessage({
          id: notificationState?.addSessionSuccessfully
            ? "label.addSessionSuccessfully"
            : "label.updateSessionSuccessfully",
        }),
        type: NOTIFICATION_TYPES.SUCCESS,
      });
      setNotificationStateDispatch(addSessionNotification(false));
      setNotificationStateDispatch(updateSessionNotification(false));
    }
    if (notificationState?.showSuccessNotification?.isEdited) {
      showNotification({
        text: intl.formatMessage({ id: "label.data_saved_successfully" }),
        type: NOTIFICATION_TYPES.SUCCESS,
      });
      setNotificationStateDispatch(setShowSuccessNotification(false));
      return;
    }
    if (notificationState?.showSuccessNotification) {
      showNotification({
        text: intl.formatMessage({ id: "label.dates_added_successfully" }),
        type: NOTIFICATION_TYPES.SUCCESS,
      });
      setNotificationStateDispatch(setShowSuccessNotification(false));
    }
  }, [
    notificationState?.addSessionSuccessfully,
    notificationState?.updateSessionSuccesssfully,
    notificationState?.showSuccessNotification,
  ]);

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({ id: "session.sessionDetails" }),
      children: (
        <SessionDetails
          key={Date.now()}
          {...{
            isEditable: false,
            isGettingSessions:
              globalSessionDetails?.isGettingGlobalSessions ||
              isGettingSessions,
            isSessionError,
            fetchData,
            sessionData,
            sessionError,
          }}
        />
      ),
    },
    ...(sessionData?.rounds?.[0]
      ? [
          {
            key: "2",
            title: intl.formatMessage({ id: "session.roundOne" }),
            children: (
              <SessionRound
                {...{ currentlySelectedModuleKey }}
                roundNo={1}
                roundId={
                  (
                    sessionData?.rounds?.find(
                      (obj) => obj.round_code === MENU_KEYS.ROUND_1_PLACEMENT
                    ) || {}
                  ).id
                }
                roundList={ROUND_ONE_CARD_LIST}
                sessionData={sessionData}
                switchLabel={intl.formatMessage({
                  id: "session.roundOneStatus",
                })}
              />
            ),
          },
        ]
      : []),
    ...(sessionData?.rounds?.[1]
      ? [
          {
            key: "3",
            title: intl.formatMessage({ id: "session.roundTwo" }),
            children: (
              <SessionRound
                {...{ currentlySelectedModuleKey }}
                roundId={
                  (
                    sessionData?.rounds?.find(
                      (obj) => obj.round_code === MENU_KEYS.ROUND_2_PLACEMENT
                    ) || {}
                  ).id
                }
                roundNo={2}
                roundId={
                  (
                    sessionData?.rounds?.find(
                      (obj) => obj.round_code === "round-2"
                    ) || {}
                  ).id
                }
                roundList={ROUND_TWO_CARD_LIST}
                sessionData={sessionData}
                switchLabel={intl.formatMessage({
                  id: "session.roundTwoStatus",
                })}
              />
            ),
          },
        ]
      : []),
  ];

  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  return (
    <>
      {notificationContextHolder}
      <TwoRow
        className={styles.mainContainer}
        topSection={
          <TwoRow
            className={styles.topSectionStyle}
            topSection={
              <ContentHeader
                customStyles={!responsive?.isMd ? styles.customStyles : ""}
                headerText={intl.formatMessage({ id: "label.session" })}
                rightSection={
                  <CustomButton
                    btnText={intl.formatMessage({
                      id: "session.setUpNewSession",
                    })}
                    customStyle={!responsive.isMd ? styles.buttonStyles : ""}
                    IconElement={responsive.isMd ? AddIcon : null}
                    textStyle={styles.textStyle}
                    onClick={() => {
                      navigate(ADD_SESSION, false);
                    }}
                  />
                }
              />
            }
            bottomSection={
              <CustomTabs
                tabs={tabItems}
                activeTab={activeTab}
                resetMode
                setActiveTab={setActiveTab}
              />
            }
          />
        }
        bottomSection={!!activeTabChildren && activeTabChildren.children}
      />
    </>
  );
}

export default Session;
