import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Spin, Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";
import CustomButton from "../../components/CustomButton";
import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import useDownload from "../../core/hooks/useDownload";
import useShowNotification from "../../core/hooks/useShowNotification";
import useFetch from "../../core/hooks/useFetch";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useUpdateOrientationCentre from "../../services/api-services/OrientationCentre/useUpdateOrientationCentre";
import useModuleWiseApiCall from "../../core/hooks/useModuleWiseApiCall";
import {
  CORE_ROUTE,
  DOWNLOAD,
  ORIENTATION_CENTRES,
  ROUNDS,
  UPDATED_API_VERSION,
} from "../../constant/apiEndpoints";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  API_STATUS,
  API_VERSION_QUERY_PARAM,
  NOTIFICATION_TYPES,
  ROUND_ID,
  SESSION_ID_QUERY_PARAM,
} from "../../constant/constant";
import { SESSION } from "../../routes/routeNames";

import { classes } from "./OrientationCenter.styles";
import { urlService } from "../../Utils/urlService";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./OrientationCenter.module.scss";
import "./Override.css";

const OrientationCenter = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const {
    data: downloadData,
    error: errorWhileDownloading,
    isLoading: isDownloading,
    initiateDownload,
  } = useDownload({});

  const roundId = urlService.getQueryStringValue(ROUND_ID);

  const [userProfileDetails] = useContext(UserProfileContext);
  const [globalSessionDetails] = useContext(GlobalSessionContext);

  const sessionId = globalSessionDetails?.globalSessionId;

  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [formData, setFormData] = useState([]);
  const { showNotification, notificationContextHolder } = useShowNotification();

  const {
    handleUpdateOrientationCentre,
    isLoading: isUpdatingOrientationCentre,
    errorWhileUpdatingCentre,
  } = useUpdateOrientationCentre();

  const {
    data: orientationCentres,
    error: errorWhileGettingCentres,
    fetchData: getOrientationCentres,
    isLoading: isGettingOrientationCentres,
    isSuccess: fetchCentersSuccessFlag,
    apiStatus,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${roundId}` +
      ORIENTATION_CENTRES +
      `?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    otherOptions: { skipApiCallOnMount: true },
    apiOptions: { headers: { [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION } },
  });

  const downloadSheet = (id) => {
    initiateDownload({
      url:
        CORE_ROUTE +
        `/${selectedModule?.key}` +
        ROUNDS +
        `/${roundId}` +
        ORIENTATION_CENTRES +
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

  useEffect(() => {
    setFormData(orientationCentres);
  }, [orientationCentres]);

  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );

  useModuleWiseApiCall({
    otherOptions: { isApiCallDependentOnSessionId: true, sessionId },
    initialApiCall: () => {
      if (roundId) {
        getOrientationCentres({});
      } else {
        navigate(`/${selectedModule?.key}/${SESSION}?mode=view&tab=2`);
      }
    },
  });

  const handleInputChange = (field, value, recordId) => {
    setFormData((prevFormData) => {
      return prevFormData.map((item) => {
        if (item.id === recordId) {
          if (
            typeof value === "object" &&
            value?.venue &&
            value?.latitude &&
            value?.longitude
          ) {
            return {
              ...item,
              [field]: value?.venue,
              latitude: value?.latitude,
              longitude: value?.longitude,
            };
          } else {
            return { ...item, [field]: value };
          }
        }
        return item;
      });
    });
  };

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.sNo" }),
      dataIndex: "sNo",
      key: "sNo",
      renderText: {
        visible: true,
        includeDotAfterText: true,
        textStyles: styles.textStyles,
      },
      render: (_, __, index) => {
        return {
          children: <p>{index + 1}.</p>,
        };
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "centre_name",
      key: "centre_name",
      renderText: {
        isTextBold: true,
        visible: true,
        isCapitalize: true,
      },
      customStyles: styles.customNameColumnStyles,
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.total_students_booked" }),
      dataIndex: "total_participants_booked",
      key: "total_participants_booked",
      renderText: { visible: true },
      customStyles: styles.customColumnStyles,
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.schedule_date" }),
      dataIndex: "schedule_date",
      key: "schedule_date",
      renderText: { visible: true, isTypeDate: true },
      renderDateTime: {
        visible: true,
        type: "date",
        isEditable:
          currentGlobalSession?.status !== 0 &&
          currentGlobalSession?.is_editable,
        disabled: false,
        placeholder: intl.formatMessage({
          id: "label.placeholder.candidate_consent_marking_start_date",
        }),
        onChange: (val, record) => {
          handleInputChange("schedule_date", val, record.id);
        },
        getDisabledDate: (current, record) => {
          return current && current < dayjs().add(1, "day").startOf("day");
        },
      },
      customStyles: styles.customColumnStyles,
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.venue" }),
      dataIndex: "venue",
      key: "venue",
      renderAutoPlaceComplete: {
        isEditable: currentGlobalSession?.status === 1,
        visible: true,
        onSelectLocation: (val, record) => {
          handleInputChange("venue", val, record.id);
        },
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.actions" }),
      dataIndex: "download",
      key: "download",
      renderImage: {
        alt: "download",
        imageDisable: isDownloading,
        onClick: (rowData) => {
          downloadSheet(rowData.id);
        },
        preview: false,
        src: getImage("iconDownload"),
        visible: true,
        customImageStyle: styles.imageStyle,
      },
      customStyles: styles.customIconContainer,
      customColumnHeading: styles.customHeadingStyle,
    }),
  ];

  const getApiPayload = (formData) => {
    return {
      data: formData.map((item) => ({
        latitude: item.latitude,
        longitude: item.longitude,
        id: item.id,
        venue: item.venue,
        schedule_date: dayjs(item.schedule_date).format("YYYY-MM-DD"),
      })),
    };
  };

  const handleTryAgain = () => {
    getOrientationCentres();
  };

  const handleSaveChanges = () => {
    const payload = getApiPayload(formData);
    handleUpdateOrientationCentre({
      payload,
      roundId,
      module: selectedModule?.key,
      sessionId,
    });
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

  const handleCancel = () => {
    navigate(`/${selectedModule?.key}/${SESSION}?tab=2&mode=view`);
  };

  const renderContent = () => {
    const isLoading =
      isGettingOrientationCentres || isUpdatingOrientationCentre;
    const errorHeading = intl.formatMessage({ id: "label.error" });
    if (isLoading || apiStatus === API_STATUS.IDLE) {
      return (
        <div className={commonStyles.errorContainer}>
          <Spin size="large" />
        </div>
      );
    }

    if (errorWhileGettingCentres) {
      const errorText = errorWhileGettingCentres?.data?.message;
      return renderError(errorText, errorHeading, handleTryAgain);
    }

    if (errorWhileUpdatingCentre) {
      const errorText = errorWhileUpdatingCentre?.data?.message;
      return renderError(errorText, errorHeading, handleSaveChanges);
    }

    return (
      <DataTable
        columns={columns}
        hidePagination
        showTableBorderBottom
        currentDataLength={formData?.length}
        customContainerStyles={styles.tableContainer}
        originalData={formData}
        customTableClassName="customTableClassName"
      />
    );
  };

  return (
    <>
      {notificationContextHolder}
      <TwoRow
        className={styles.mainContainer}
        topSection={
          <TwoRow
            className={styles.headerContainer}
            topSection={
              <Typography className={styles.headingText}>
                {intl.formatMessage({ id: "label.setup_orientation_centers" })}
              </Typography>
            }
            bottomSection={
              <Typography className={styles.descriptionText}>
                {intl.formatMessage({
                  id: "label.orientation_centers_warning",
                })}
              </Typography>
            }
          />
        }
        bottomSection={
          <TwoRow
            isTopFillSpace
            topSection={renderContent()}
            bottomSection={
              fetchCentersSuccessFlag &&
              !isUpdatingOrientationCentre &&
              !!orientationCentres?.length &&
              !errorWhileUpdatingCentre &&
              !!currentGlobalSession?.status && (
                <TwoColumn
                  className={styles.buttonContainer}
                  leftSection={
                    <CustomButton
                      btnText={intl.formatMessage({
                        id: "label.cancel",
                      })}
                      customStyle={styles.mobileButtonStyles}
                      textStyle={styles.textStyle}
                      onClick={handleCancel}
                    />
                  }
                  rightSection={
                    <CustomButton
                      textStyle={styles.saveButtonTextStyles}
                      customStyle={styles.saveButtonStyle}
                      btnText={intl.formatMessage({
                        id: "session.saveChanges",
                      })}
                      onClick={handleSaveChanges}
                      isBtnDisable={
                        !formData?.every((item) => item.schedule_date)
                      }
                    />
                  }
                />
              )
            }
          />
        }
        bottomSectionStyle={classes.bottomSectionStyle}
        isBottomFillSpace
      />
    </>
  );
};

export default OrientationCenter;
