import React, { useContext } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import ConsentMarkingContent from "../../containers/ConsentMarkingContent";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import HeaderAndTitle from "../../components/HeaderAndTitle";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { urlService } from "../../Utils/urlService";
import { ROUND_ID } from "../../constant/constant";
import useFetch from "../../core/hooks/useFetch";
import {
  CORE_ROUTE,
  REGISTRATION_DATES,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { Spin } from "antd";
import { getErrorMessage } from "../../constant/utils";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import styles from "./ConsentMarking.module.scss";

const ConsentMarking = () => {
  const intl = useIntl();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );
  const isEdit =
    currentGlobalSession?.is_editable && currentGlobalSession?.status;
  const roundId = urlService.getQueryStringValue(ROUND_ID);
  const {
    data: regAndConsentData,
    error: errorWhileGettingDetails,
    fetchData: getRegAndConsentMarkingDetail,
    isLoading: isGettingRegAndConsentMarkingDetail,
    isSuccess: isDetailsFetchSuccessful,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${roundId}` +
      REGISTRATION_DATES,
  });

  return (
    <>
      {isGettingRegAndConsentMarkingDetail && (
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      )}
      {!!errorWhileGettingDetails && !isDetailsFetchSuccessful && (
        <div className={styles.loaderContainer}>
          <ErrorMessageBox
            errorText={getErrorMessage(errorWhileGettingDetails)}
            onRetry={() => getRegAndConsentMarkingDetail({})}
            errorHeading={intl.formatMessage({ id: "label.errorOccured" })}
          />
        </div>
      )}
      {isDetailsFetchSuccessful && (
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
            !!regAndConsentData && (
              <ConsentMarkingContent
                {...{
                  isEdit: !!isEdit,
                  selectedModule: selectedModule?.key,
                  roundId,
                  regAndConsentData,
                }}
              />
            )
          }
        />
      )}
    </>
  );
};

export default ConsentMarking;
