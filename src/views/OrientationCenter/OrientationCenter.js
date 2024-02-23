import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Spin, Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";
import CustomButton from "../../components/CustomButton";
import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import useFetch from "../../core/hooks/useFetch";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useUpdateOrientationCentre from "../../services/api-services/OrientationCentre/useUpdateOrientationCentre";
import {
  CORE_ROUTE,
  ORIENTATION_CENTRES,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { ROUND_ID } from "../../constant/constant";
import { SESSION } from "../../routes/routeNames";

import { classes } from "./OrientationCenter.styles";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./OrientationCenter.module.scss";
import "./Override.css";

const OrientationCenter = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();

  const roundId = searchParams.get(ROUND_ID);

  const [userProfileDetails] = useContext(UserProfileContext);
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [formData, setFormData] = useState([]);

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
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${roundId}` +
      ORIENTATION_CENTRES,
  });

  useEffect(() => {
    setFormData(orientationCentres);
  }, [orientationCentres]);

  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );

  const handleInputChange = (field, value, recordId) => {
    setFormData((prevFormData) => {
      return prevFormData.map((item) => {
        if (item.id === recordId) {
          return { ...item, [field]: value };
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
        isEditable: currentGlobalSession?.is_editable,
        disabled: false,
        placeholder: intl.formatMessage({
          id: "label.placeholder.consentFromDate",
        }),
        onChange: (val, record) => {
          handleInputChange("schedule_date", val, record.id);
        },
        disabledDate: (current) => {
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
        onClick: () => {},
        preview: false,
        src: getImage("iconDownload"),
        visible: true,
        customImageStyle: styles.imageStyle,
      },
      customStyles: styles.customIconContainer,
    }),
  ];

  const getApiPayload = (formData) => {
    return {
      data: formData.map((item) => ({
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

    if (isLoading) {
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
    if (!orientationCentres?.length) {
      const noResultText = intl.formatMessage({
        id: "label.orientation_no_result_msg",
      });
      return renderError(noResultText, errorHeading);
    }

    return (
      <DataTable
        columns={columns}
        hidePagination
        currentDataLength={formData?.length}
        customContainerStyles={styles.tableContainer}
        originalData={formData}
        customTableClassName="customTableClassName"
      />
    );
  };

  return (
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
              {intl.formatMessage({ id: "label.orientation_centers_warning" })}
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
            orientationCentres?.length && (
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
  );
};

export default OrientationCenter;
