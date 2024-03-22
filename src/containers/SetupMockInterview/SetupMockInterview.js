import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import CustomLoader from "../../components/CustomLoader";
import DataTable from "../../components/DataTable/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import { ThemeContext } from "core/providers/theme";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useDownload from "../../core/hooks/useDownload";
import useFetch from "../../core/hooks/useFetch";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useShowNotification from "../../core/hooks/useShowNotification";
import getSetupMockColumn from "./SetupMockInterviewConfig";
import { updateInterviewNotification } from "../../globalContext/notification/notificationActions";
import { urlService } from "../../Utils/urlService";

import {
  API_VERSION_QUERY_PARAM,
  ROUND_ID,
  NOTIFICATION_TYPES,
  STATUS_CODES,
  SESSION_ID_QUERY_PARAM,
  API_STATUS,
} from "../../constant/constant";
import {
  CORE_ROUTE,
  DOWNLOAD,
  MOCK_INTERVIEWS,
  ROUNDS,
  UPDATED_API_VERSION,
} from "../../constant/apiEndpoints";
import { SESSION } from "../../routes/routeNames";
import { classes } from "./SetupMockInterview.styles";
import useModuleWiseApiCall from "../../core/hooks/useModuleWiseApiCall";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./SetupMockInterview.module.scss";

const SetupMockInterviewContent = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [notificationState, setNotificationStateDispatch] =
    useContext(NotificationContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const roundId = urlService.getQueryStringValue(ROUND_ID);
  const [globalSessionDetails] = useContext(GlobalSessionContext);

  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );
  const sessionId = globalSessionDetails?.globalSessionId;

  const {
    data,
    error: errorWhileFetchingInterview,
    isLoading: isGettingInterview,
    fetchData,
    apiStatus,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      MOCK_INTERVIEWS +
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
        fetchData({});
      } else {
        navigate(`/${currentlySelectedModuleKey}/${SESSION}`);
      }
    },
  });

  const {
    data: downloadData,
    error: errorWhileDownloadingInterview,
    isLoading: isDownloadingInterview,
    initiateDownload,
  } = useDownload({});

  const { showNotification, notificationContextHolder } = useShowNotification();

  const isEdit =
    currentGlobalSession?.is_editable && currentGlobalSession?.status;

  const goToConfigureInterview = (rowData, isEdit) => {
    const centreId = rowData?.id;
    navigate(`interviewDetails/${centreId}?roundId=${roundId}`, false);
  };

  const downloadInterviewDates = (id) => {
    initiateDownload({
      url:
        CORE_ROUTE +
        `/${currentlySelectedModuleKey}` +
        ROUNDS +
        `/${roundId}` +
        MOCK_INTERVIEWS +
        `/${id}` +
        DOWNLOAD,
      onSuccessCallback: (response) => {
        showNotification({
          text: intl.formatMessage({
            id: "label.downloadSucess",
          }),
          type: NOTIFICATION_TYPES.SUCCESS,
        });
      },
      onErrorCallback: (errorMessage) => {
        showNotification({
          text: errorMessage,
          type: NOTIFICATION_TYPES.ERROR,
        });
      },
    });
  };

  const columns = getSetupMockColumn(
    downloadInterviewDates,
    isDownloadingInterview,
    intl,
    isEdit,
    getImage,
    goToConfigureInterview,
    renderColumn
  );

  useEffect(() => {
    if (errorWhileFetchingInterview?.data?.code === STATUS_CODES.NOT_FOUND) {
      navigate(`/${currentlySelectedModuleKey}/${SESSION}`);
    }
  }, [errorWhileFetchingInterview?.data?.code]);

  useEffect(() => {
    if (notificationState?.updateInterviewDateSuccessfully) {
      showNotification({
        text: intl.formatMessage({
          id: "label.updateInterviewDateSuccessfully",
        }),
        type: NOTIFICATION_TYPES.SUCCESS,
      });
      setNotificationStateDispatch(updateInterviewNotification(false));
    }
  }, [notificationState?.updateInterviewDateSuccessfully]);

  return (
    <>
      {notificationContextHolder}
      <TwoRow
        className={styles.mainContainer}
        topSection={
          <HeadingAndSubHeading
            customContainerStyles={styles.customContainerStyles}
            headingText={intl.formatMessage({
              id: "label.session.setupMockInterviews",
            })}
            subHeadingText={intl.formatMessage({
              id: "label.warning.setupMockInterviews",
            })}
          />
        }
        bottomSection={
          isGettingInterview || apiStatus === API_STATUS.IDLE ? (
            <div className={commonStyles.errorContainer}>
              <CustomLoader />
            </div>
          ) : errorWhileFetchingInterview ? (
            <div className={commonStyles.errorContainer}>
              <ErrorMessageBox
                onRetry={() => fetchData({})}
                errorText={errorWhileFetchingInterview?.data?.message}
                errorHeading={intl.formatMessage({ id: "label.error" })}
              />
            </div>
          ) : (
            <DataTable
              {...{
                columns,
              }}
              hidePagination={true}
              customContainerStyles={styles.tableContainer}
              originalData={data}
            />
          )
        }
        bottomSectionStyle={classes.bottomSectionStyle}
      />
    </>
  );
};
export default SetupMockInterviewContent;
