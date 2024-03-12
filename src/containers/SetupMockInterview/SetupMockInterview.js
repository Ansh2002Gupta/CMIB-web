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
import useFetch from "../../core/hooks/useFetch";
import useDownload from "../../core/hooks/useDownload";
import useShowNotification from "../../core/hooks/useShowNotification";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { updateInterviewNotification } from "../../globalContext/notification/notificationActions";
import getSetupMockColumn from "./SetupMockInterviewConfig";
import { urlService } from "../../Utils/urlService";

import {
  ROUND_ID,
  NOTIFICATION_TYPES,
  STATUS_CODES,
} from "../../constant/constant";
import {
  CORE_ROUTE,
  DOWNLOAD,
  MOCK_INTERVIEWS,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { SESSION } from "../../routes/routeNames";
import { classes } from "./SetupMockInterview.styles";
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
  const {
    data,
    error: errorWhileFetchingInterview,
    isLoading: isGettingInterview,
    fetchData,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      MOCK_INTERVIEWS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: downloadData,
    error: errorWhileDownloadingInterview,
    isLoading: isDownloadingInterview,
    initiateDownload,
  } = useDownload({});

  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const { showNotification, notificationContextHolder } = useShowNotification();
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );
  const isEdit =
    currentGlobalSession?.is_editable && currentGlobalSession?.status;

  const goToConfigureInterview = (rowData, isEdit) => {
    const centreId = rowData?.id;
    navigate(`interviewDetails/${centreId}?roundId=${roundId}`, false);
  };

  const downloadInterviewDatesCSV = (id) => {
    initiateDownload({
      url:
        CORE_ROUTE +
        `/${currentlySelectedModuleKey}` +
        ROUNDS +
        `/${id}` +
        MOCK_INTERVIEWS +
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
    downloadInterviewDatesCSV,
    isDownloadingInterview,
    intl,
    isEdit,
    getImage,
    goToConfigureInterview,
    renderColumn
  );

  useEffect(() => {
    if (userProfileDetails?.selectedModuleItem?.key) {
      if (roundId) {
        fetchData({});
        return;
      }
      navigate(`/${currentlySelectedModuleKey}/${SESSION}`);
    }
  }, [userProfileDetails?.selectedModuleItem?.key]);

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
          isGettingInterview ? (
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
