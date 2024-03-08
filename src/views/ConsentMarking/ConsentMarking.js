import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import ConsentMarkingContent from "../../containers/ConsentMarkingContent";
import HeaderAndTitle from "../../components/HeaderAndTitle";
import useFetch from "../../core/hooks/useFetch";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { urlService } from "../../Utils/urlService";
import {
  ADMIN_ROUTE,
  CORE_ROUTE,
  LAST_REGISTRATION_DATES,
  REGISTRATION_CONSENT,
  REGISTRATION_DATES,
  ROUNDS,
  ROUND_1,
  ROUND_2,
} from "../../constant/apiEndpoints";
import { ROUND_ID } from "../../constant/constant";
import styles from "./ConsentMarking.module.scss";

const ConsentMarking = () => {
  const intl = useIntl();
  const isEdit = true;
  const [userProfileDetails] = useContext(UserProfileContext);
  const roundId = urlService.getQueryStringValue(ROUND_ID);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const {
    data: registrationDateData,
    error: errorWhileGettingRegistrationDate,
    fetchData: getRegistrationDate,
    isLoading: isGettingRegistrationDate,
    isSuccess: isRegistrationDateFetchSuccessful,
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
    isSuccess: islastRegistrationDatesFetchSuccessful,
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
    isSuccess: isConsentRound1FetchSuccessful,
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
    isSuccess: isConsentRound2FetchSuccessful,
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
    getlastRegistrationDates({});
    getConsentRound1({});
    getConsentRound2({});
  };

  useEffect(() => {
    if (currentlySelectedModuleKey) {
      getAllData();
    }
  }, [userProfileDetails?.selectedModuleItem?.key]);

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
      bottomSection={<ConsentMarkingContent {...{ isEdit, roundId }} />}
    />
  );
};

export default ConsentMarking;
