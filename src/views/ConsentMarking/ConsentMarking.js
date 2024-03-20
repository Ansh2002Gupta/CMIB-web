import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import ConsentMarkingContent from "../../containers/ConsentMarkingContent";
import ConsentMarkingContentRoundTwo from "../../containers/ConsentMarkingContentRoundTwo";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import HeaderAndTitle from "../../components/HeaderAndTitle";
import useFetch from "../../core/hooks/useFetch";
import useModuleWiseApiCall from "../../core/hooks/useModuleWiseApiCall";
import useShowNotification from "../../core/hooks/useShowNotification";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { urlService } from "../../Utils/urlService";
import { getCurrentActiveTab, getErrorMessage } from "../../constant/utils";
import {
  CORE_ROUTE,
  LAST_REGISTRATION_DATES,
  REGISTRATION_CONSENT,
  REGISTRATION_DATES,
  ROUNDS,
  ROUND_ONE,
  ROUND_TWO,
  UPDATED_API_VERSION,
} from "../../constant/apiEndpoints";
import {
  ACTIVE_TAB,
  API_VERSION_QUERY_PARAM,
  ROUND_ID,
  SESSION_ID_QUERY_PARAM,
  VALID_CONSENT_MARKING_TABS_ID,
} from "../../constant/constant";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./ConsentMarking.module.scss";

const ConsentMarking = () => {
  const intl = useIntl();
  const location = useLocation();
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );
  const sessionId = globalSessionDetails?.globalSessionId;

  const isEdit = !!(
    currentGlobalSession?.is_editable && currentGlobalSession?.status
  );
  const hasRoundTwo = location?.pathname.includes("round2");
  const [userProfileDetails] = useContext(UserProfileContext);
  const roundId = urlService.getQueryStringValue(ROUND_ID);
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService.getQueryStringValue(ACTIVE_TAB),
      VALID_CONSENT_MARKING_TABS_ID.threeTab
    )
  );

  const { showNotification, notificationContextHolder } = useShowNotification();

  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const {
    data: registrationDateData,
    error: errorWhileGettingRegistrationDate,
    fetchData: getRegistrationDate,
    isLoading: isGettingRegistrationDate,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      REGISTRATION_DATES +
      `?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
    apiOptions: { headers: { [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION } },
  });

  const {
    data: lastRegistrationDatesData,
    error: errorWhileGettinglastRegistrationDates,
    fetchData: getlastRegistrationDates,
    isLoading: isGettinglastRegistrationDates,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      LAST_REGISTRATION_DATES +
      `?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
    apiOptions: { headers: { [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION } },
  });

  const {
    data: consentRoundOneData,
    error: errorWhileGettingconsentRoundOne,
    fetchData: getConsentRoundOne,
    isLoading: isGettingConsentRoundOne,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      REGISTRATION_CONSENT +
      ROUND_ONE +
      `?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
    apiOptions: { headers: { [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION } },
  });

  const {
    data: consentRoundTwoData,
    error: errorWhileGettingconsentRoundTwo,
    fetchData: getConsentRoundTwo,
    isLoading: isGettingConsentRoundTwo,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      REGISTRATION_CONSENT +
      ROUND_TWO +
      `?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
    apiOptions: { headers: { [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION } },
  });

  useModuleWiseApiCall({
    otherOptions: { isApiCallDependentOnSessionId: true, sessionId },
    initialApiCall: () => {
      if (roundId) {
        getAllData();
      }
    },
  });

  const getAllData = () => {
    getRegistrationDate({});

    if (activeTab === "2") {
      getConsentRoundOne({});
      return;
    }
    if (activeTab === "3") {
      getConsentRoundTwo({});
      return;
    }
    getlastRegistrationDates({});
  };

  const renderError = (errorText, errorHeading, onRetryHandler) => (
    <div className={commonStyles.errorContainer}>
      <ErrorMessageBox
        onRetry={onRetryHandler}
        errorText={errorText}
        errorHeading={errorHeading}
      />
    </div>
  );

  const renderContent = () => {
    const isLoading =
      isGettingConsentRoundOne ||
      isGettingConsentRoundTwo ||
      isGettingRegistrationDate ||
      isGettinglastRegistrationDates;
    const errorHeading = intl.formatMessage({ id: "label.error" });

    if (isLoading) {
      return <CustomLoader />;
    }

    if (errorWhileGettingconsentRoundOne) {
      const errorText = errorWhileGettingconsentRoundOne?.data?.message;
      return renderError(errorText, errorHeading, getAllData);
    }

    if (errorWhileGettingconsentRoundTwo) {
      const errorText = errorWhileGettingconsentRoundTwo?.data?.message;
      return renderError(errorText, errorHeading, getAllData);
    }

    if (errorWhileGettingRegistrationDate) {
      const errorText = errorWhileGettingRegistrationDate?.data?.message;
      return renderError(errorText, errorHeading, getAllData);
    }

    if (errorWhileGettinglastRegistrationDates) {
      const errorText = errorWhileGettinglastRegistrationDates?.data?.message;
      return renderError(errorText, errorHeading, getAllData);
    }

    if (
      ((activeTab === "3" && consentRoundTwoData) ||
        (activeTab === "2" && consentRoundOneData) ||
        (activeTab === "1" && lastRegistrationDatesData) ||
        hasRoundTwo) &&
      registrationDateData
    ) {
      return hasRoundTwo ? (
        <ConsentMarkingContentRoundTwo
          {...{
            isEdit: !!isEdit,
            selectedModule: currentlySelectedModuleKey,
            roundId,
            regAndConsentData: registrationDateData,
            sessionId,
          }}
        />
      ) : (
        <ConsentMarkingContent
          {...{
            activeTab,
            consentRoundOneData,
            consentRoundTwoData,
            currentlySelectedModuleKey,
            isEdit,
            getRegistrationDate,
            lastRegistrationDatesData,
            roundId,
            registrationDateData,
            setActiveTab,
            sessionId,
            showNotification,
          }}
        />
      );
    }
    return <></>;
  };

  return (
    <>
      <TwoRow
        className={styles.mainContainer}
        topSection={
          <HeaderAndTitle
            headingLabel={intl.formatMessage({
              id: "label.registrationConsentSchedule",
            })}
            titleLabel={intl.formatMessage({
              id: "label.consentMarkingScheduleWarning",
            })}
          />
        }
        bottomSection={
          <>
            {notificationContextHolder}
            {renderContent()}
          </>
        }
      />
    </>
  );
};

export default ConsentMarking;
