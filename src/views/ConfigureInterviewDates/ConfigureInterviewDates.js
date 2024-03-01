import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import ContentHeader from "../../containers/ContentHeader";
import ConfigureInterview from "../../containers/ConfigureInterview";
import CustomLoader from "../../components/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useFetch from "../../core/hooks/useFetch";
import {
  CORE_ROUTE,
  INTERVIEW_DATES,
  MOCK_INTERVIEWS,
} from "../../constant/apiEndpoints";
import { API_STATUS } from "../../constant/constant";
import styles from "./ConfigureInterviewDates.module.scss";
import { classes } from "./ConfigureInterviewDate.styles";
import commonStyles from "../../common/commonStyles.module.scss";

const ConfigureInterviewDates = () => {
  const intl = useIntl();
  const { centreId } = useParams();
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const {
    apiStatus,
    data: interviewData,
    error: errorWhileFetchingInterview,
    isLoading: isGettingInterview,
    fetchData,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      MOCK_INTERVIEWS +
      `/${centreId}` +
      INTERVIEW_DATES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (userProfileDetails?.selectedModuleItem?.key) {
      fetchData({});
    }
  }, [userProfileDetails?.selectedModuleItem?.key]);

  return (
    <TwoRow
      topSection={
        <ContentHeader
          headerText={intl.formatMessage({
            id: "label.configureInterviewDates",
          })}
          isLeftFillSpace={true}
          customStyles={styles.headerCustomStyles}
          customContainerStyle={styles.parentContainer}
        />
      }
      bottomSection={
        <>
          {(isGettingInterview ||
            apiStatus === API_STATUS.IDLE ||
            apiStatus === API_STATUS.LOADING) && (
            <div
              className={[
                commonStyles.errorContainer,
                styles.erroredContainer,
              ].join(" ")}
            >
              <CustomLoader />
            </div>
          )}
          {errorWhileFetchingInterview && (
            <div
              className={[
                commonStyles.errorContainer,
                styles.erroredContainer,
              ].join(" ")}
            >
              <ErrorMessageBox
                onRetry={() => fetchData({})}
                errorText={errorWhileFetchingInterview?.data?.message}
                errorHeading={intl.formatMessage({ id: "label.error" })}
              />
            </div>
          )}
          {apiStatus === API_STATUS.SUCCESS && interviewData && (
            <ConfigureInterview
              {...{
                centreId,
                interviewData,
              }}
            />
          )}
        </>
      }
      bottomSectionStyle={classes.bottomSectionStyle}
    />
  );
};

export default ConfigureInterviewDates;
