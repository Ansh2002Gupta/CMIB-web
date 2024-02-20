import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import dayjs from "dayjs";
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
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  ROUND_ID,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";
import { SESSION } from "../../routes/routeNames";

import { classes } from "./OrientationCenter.styles";
import styles from "./OrientationCenter.module.scss";
import "./Override.css";

const OrientationCenter = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();

  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );
  const roundId = searchParams.get(ROUND_ID);

  const [userProfileDetails] = useContext(UserProfileContext);
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
    otherOptions: { skipApiCallOnMount: true },
  });

  useEffect(() => {
    setFormData(orientationCentres?.records);
  }, [orientationCentres]);

  const resetCentreListingData = (orientationCentres) => {
    if (orientationCentres?.meta?.total) {
      const totalRecords = orientationCentres?.meta?.total;
      const numberOfPages = Math.ceil(totalRecords / pageSize);
      if (current > numberOfPages) {
        getOrientationCentres({
          queryParamsObject: getRequestedQueryParams({
            page: 1,
          }),
        });
        setSearchParams((prev) => {
          prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
          return prev;
        });
        setCurrent(1);
      }
    }
  };

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, current);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, pageSize);
      return prev;
    });
    if (selectedModule?.key) {
      const requestedParams = getRequestedQueryParams({});
      getOrientationCentres({
        queryParamsObject: requestedParams,
        onSuccessCallback: resetCentreListingData,
      });
    }
  }, [selectedModule?.key]);

  const getRequestedQueryParams = ({ page, rowPerPage }) => {
    return {
      perPage: rowPerPage || pageSize,
      page: page || current,
    };
  };

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    const requestedParams = getRequestedQueryParams({ perPage: size, page: 1 });
    getOrientationCentres({ queryParamsObject: requestedParams });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
    const requestedParams = getRequestedQueryParams({
      perPage: pageSize,
      page: newPageNumber,
    });

    getOrientationCentres({ queryParamsObject: requestedParams });
  };

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
        isEditable: (record) => record.is_editable,
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

  useLayoutEffect(() => {
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (!currentPage || isNaN(currentPage) || currentPage <= 0) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
        return prev;
      });
    }

    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], DEFAULT_PAGE_SIZE);
        return prev;
      });
    }
  }, []);

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
    const requestedParams = getRequestedQueryParams({});
    getOrientationCentres({
      queryParamsObject: requestedParams,
    });
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
    <div className={styles.errorContainer}>
      <ErrorMessageBox
        onRetry={onRetryHandler}
        errorText={errorText}
        errorHeading={errorHeading}
      />
    </div>
  );

  const handleCancel = () => {
    navigate(`/${selectedModule?.key}/${SESSION}?tab=2`);
  };

  const renderContent = () => {
    const isLoading =
      isGettingOrientationCentres || isUpdatingOrientationCentre;
    const errorHeading = intl.formatMessage({ id: "label.error" });

    if (isLoading) {
      return (
        <div className={styles.errorContainer}>
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

    if (!orientationCentres?.meta?.total) {
      const noResultText = intl.formatMessage({
        id: "label.orientation_no_result_msg",
      });
      return renderError(noResultText, errorHeading);
    }

    return (
      <DataTable
        columns={columns}
        current={current}
        pageSize={pageSize}
        onChangePageSize={onChangePageSize}
        onChangeCurrentPage={onChangeCurrentPage}
        currentDataLength={orientationCentres?.meta?.total}
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
            orientationCentres?.meta?.total && (
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
