import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import ConsentMarkingContent from "../../containers/ConsentMarkingContent";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import HeaderAndTitle from "../../components/HeaderAndTitle";
import useFetch from "../../core/hooks/useFetch";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { urlService } from "../../Utils/urlService";
import { getCurrentActiveTab } from "../../constant/utils";
import {
  CORE_ROUTE,
  LAST_REGISTRATION_DATES,
  REGISTRATION_CONSENT,
  REGISTRATION_DATES,
  ROUNDS,
  ROUND_1,
  ROUND_2,
} from "../../constant/apiEndpoints";
import {
  ACTIVE_TAB,
  ROUND_ID,
  VALID_CONSENT_MARKING_TABS_ID,
} from "../../constant/constant";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./ConsentMarking.module.scss";

const ConsentMarking = () => {
  const intl = useIntl();
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );
  const isEdit =
    currentGlobalSession?.is_editable && currentGlobalSession?.status;
  const [userProfileDetails] = useContext(UserProfileContext);
  const roundId = urlService.getQueryStringValue(ROUND_ID);
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService.getQueryStringValue(ACTIVE_TAB),
      VALID_CONSENT_MARKING_TABS_ID
    )
  );
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
      REGISTRATION_DATES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
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
      LAST_REGISTRATION_DATES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: consentRound1Data,
    error: errorWhileGettingconsentRound1,
    fetchData: getConsentRound1,
    isLoading: isGettingConsentRound1,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      REGISTRATION_CONSENT +
      ROUND_1,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: consentRound2Data,
    error: errorWhileGettingconsentRound2,
    fetchData: getConsentRound2,
    isLoading: isGettingConsentRound2,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      REGISTRATION_CONSENT +
      ROUND_2,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const getAllData = () => {
    getRegistrationDate({});
    if (activeTab === "2") {
      getConsentRound1({});
      return;
    }
    if (activeTab === "3") {
      getConsentRound2({});
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
      isGettingConsentRound1 ||
      isGettingConsentRound2 ||
      isGettingRegistrationDate ||
      isGettinglastRegistrationDates;
    const errorHeading = intl.formatMessage({ id: "label.error" });

    if (isLoading) {
      return <CustomLoader />;
    }

    if (errorWhileGettingconsentRound1) {
      const errorText = errorWhileGettingconsentRound1?.data?.message;
      return renderError(errorText, errorHeading, getAllData);
    }

    if (errorWhileGettingconsentRound2) {
      const errorText = errorWhileGettingconsentRound2?.data?.message;
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
      (consentRound2Data || consentRound1Data || lastRegistrationDatesData) &&
      registrationDateData
    ) {
      return (
        <ConsentMarkingContent
          {...{
            activeTab,
            consentRound1Data,
            consentRound2Data,
            isEdit,
            lastRegistrationDatesData,
            roundId,
            registrationDateData,
            setActiveTab,
          }}
        />
      );
    }
  };

  useEffect(() => {
    if (currentlySelectedModuleKey) {
      getAllData();
    }
  }, [userProfileDetails?.selectedModuleItem?.key, activeTab]);

  return (
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
      bottomSection={renderContent()}
    />
  );
};

export default ConsentMarking;
