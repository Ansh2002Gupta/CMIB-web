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
  ROUND_ONE,
  ROUND_TWO,
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
  const isEdit = !!(
    currentGlobalSession?.is_editable && currentGlobalSession?.status
  );
  const [userProfileDetails] = useContext(UserProfileContext);
  const roundId = urlService.getQueryStringValue(ROUND_ID);
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService.getQueryStringValue(ACTIVE_TAB),
      VALID_CONSENT_MARKING_TABS_ID.threeTab
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
      ROUND_ONE,
    otherOptions: {
      skipApiCallOnMount: true,
    },
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
      ROUND_TWO,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const getAllData = () => {
    if (!registrationDateData) {
      getRegistrationDate({});
    }

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
        (activeTab === "1" && lastRegistrationDatesData)) &&
      registrationDateData
    ) {
      return (
        <ConsentMarkingContent
          {...{
            activeTab,
            consentRoundOneData,
            consentRoundTwoData,
            currentlySelectedModuleKey,
            isEdit,
            lastRegistrationDatesData,
            roundId,
            registrationDateData,
            setActiveTab,
          }}
        />
      );
    }
    return <></>;
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
