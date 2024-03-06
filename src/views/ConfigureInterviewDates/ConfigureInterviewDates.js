import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import ContentHeader from "../../containers/ContentHeader";
import ConfigureInterview from "../../containers/ConfigureInterview";
import CustomLoader from "../../components/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useFetch from "../../core/hooks/useFetch";
import { urlService } from "../../Utils/urlService";
import {
  CORE_ROUTE,
  INTERVIEW_DATES,
  MOCK_INTERVIEWS,
} from "../../constant/apiEndpoints";
import { API_STATUS, STATUS_CODES, ROUND_ID } from "../../constant/constant";
import { SESSION, SETUP_MOCK_INTERVIEW } from "../../routes/routeNames";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./ConfigureInterviewDates.module.scss";
import { classes } from "./ConfigureInterviewDate.styles";

const ConfigureInterviewDates = () => {
  const intl = useIntl();
  const { centreId } = useParams();
  const navigate = useNavigate();
  const [userProfileDetails] = useContext(UserProfileContext);
  const roundId = urlService.getQueryStringValue(ROUND_ID);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const {
    apiStatus,
    data: interviewData,
    error: errorWhileFetchingInterview,
    isLoading: isGettingInterview,
    isSuccess: isInterviewSuccess,
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

  useEffect(() => {
    if (errorWhileFetchingInterview?.data?.code === STATUS_CODES.NOT_FOUND) {
      navigate(
        `/${currentlySelectedModuleKey}/${SESSION}${SETUP_MOCK_INTERVIEW}?${ROUND_ID}=${roundId}`
      );
    }
  }, [errorWhileFetchingInterview?.data?.code]);

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
          {(isGettingInterview || apiStatus === API_STATUS.IDLE) && (
            <div
              className={[
                commonStyles.errorContainer,
                styles.errorContainer,
              ].join(" ")}
            >
              <CustomLoader />
            </div>
          )}
          {!!errorWhileFetchingInterview && (
            <div
              className={[
                commonStyles.errorContainer,
                styles.errorContainer,
              ].join(" ")}
            >
              <ErrorMessageBox
                onRetry={() => fetchData({})}
                errorText={errorWhileFetchingInterview?.data?.message || ""}
                errorHeading={intl.formatMessage({ id: "label.error" })}
              />
            </div>
          )}
          {isInterviewSuccess && interviewData && (
            <ConfigureInterview
              {...{
                centreId,
                interviewData,
                roundId,
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
