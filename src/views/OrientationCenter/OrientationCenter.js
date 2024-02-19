import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Spin, Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";
import CustomButton from "../../components/CustomButton";
import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import useFetch from "../../core/hooks/useFetch";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
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

import { classes } from "./OrientationCenter.styles";
import styles from "./OrientationCenter.module.scss";
import "./Override.css";

const OrientationCenter = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );
  const roundID = searchParams.get(ROUND_ID);

  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;

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
      `/${roundID}` +
      ORIENTATION_CENTRES,
    otherOptions: { skipApiCallOnMount: true },
  });

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
      isRequiredField: true,
      renderText: { visible: true, isTypeDate: true },
      renderDateTime: {
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "label.placeholder.consentFromDate",
        }),
      },
      customStyles: styles.customColumnStyles,
      onChange: () => {},
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.venue" }),
      dataIndex: "venue",
      key: "venue",
      renderAutoPlaceComplete: { visible: true },
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

  const handleTryAgain = () => {
    const requestedParams = getRequestedQueryParams({});
    getOrientationCentres({
      queryParamsObject: requestedParams,
    });
  };

  const renderContent = () => {
    if (!isGettingOrientationCentres && errorWhileGettingCentres) {
      return (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            onRetry={handleTryAgain}
            errorText={errorWhileGettingCentres?.data?.message}
            errorHeading={intl.formatMessage({
              id: "label.error",
            })}
          />
        </div>
      );
    }
    if (isGettingOrientationCentres) {
      return (
        <div className={styles.errorContainer}>
          <Spin size="large" />
        </div>
      );
    }
    return (
      <DataTable
        {...{
          columns,
          current,
          pageSize,
          onChangePageSize,
          onChangeCurrentPage,
        }}
        currentDataLength={orientationCentres?.meta?.total}
        customContainerStyles={styles.tableContainer}
        originalData={orientationCentres?.records}
        customTableClassName={"customTableClassName"}
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
            fetchCentersSuccessFlag && (
              <TwoColumn
                className={styles.buttonContainer}
                leftSection={
                  <CustomButton
                    btnText={intl.formatMessage({
                      id: "label.cancel",
                    })}
                    customStyle={styles.mobileButtonStyles}
                    textStyle={styles.textStyle}
                    onClick={() => {}}
                  />
                }
                rightSection={
                  <CustomButton
                    textStyle={styles.saveButtonTextStyles}
                    customStyle={styles.saveButtonStyle}
                    btnText={intl.formatMessage({
                      id: "session.saveChanges",
                    })}
                    onClick={() => {}}
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
