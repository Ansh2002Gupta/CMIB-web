import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { ThemeContext } from "core/providers/theme";
import { Spin, Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import useFetch from "../../core/hooks/useFetch";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  ADMIN_ROUTE,
  CENTRE_END_POINT,
  ROUNDS,
} from "../../constant/apiEndpoints";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";

import { classes } from "./SetupCenter.styles";
import styles from "./SetupCenter.module.scss";

const SetupCenter = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const [searchParams, setSearchParams] = useSearchParams();
  const isEditable = true;

  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  const {
    data: setupCentres,
    error: errorWhileGettingCentres,
    fetchData: getSetupCentres,
    isLoading: isGettingSetupCentres,
  } = useFetch({
    url:
      ADMIN_ROUTE +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/1` + // TODO: Need to udpate the id with round_id of session detail
      CENTRE_END_POINT,
    otherOptions: { skipApiCallOnMount: true },
  });

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, current);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, pageSize);
      return prev;
    });

    const requestedParams = getRequestedQueryParams({});

    getSetupCentres({ queryParamsObject: requestedParams });
  }, []);

  const getRequestedQueryParams = ({ page, rowPerPage }) => {
    return {
      perPage: rowPerPage || pageSize,
      page: page || current,
    };
  };

  const goToEditCentrePage = (rowData, isEdit) => {
    const centreId = rowData?.id;
    navigate(`details/${centreId}?mode=${isEdit ? "edit" : "view"}`);
  };

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    const requestedParams = getRequestedQueryParams({
      rowPerPage: size,
      page: 1,
    });
    getSetupCentres({ queryParamsObject: requestedParams });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
    const requestedParams = getRequestedQueryParams({
      page: newPageNumber,
    });
    getSetupCentres({ queryParamsObject: requestedParams });
  };

  const handleOnReTry = () => {
    const requestedParams = getRequestedQueryParams({
      rowPerPage: DEFAULT_PAGE_SIZE,
      page: 1,
    });

    getSetupCentres({ queryParamsObject: requestedParams });
  };

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.sNo" }),
      dataIndex: "id",
      key: "id",
      renderText: {
        visible: true,
        includeDotAfterText: true,
        textStyles: styles.textStyles,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "name",
      key: "name",
      renderText: { isTextBold: true, visible: true, isCapitalize: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreId" }),
      dataIndex: "centre_code",
      key: "centre_code",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.bigSmallCentre" }),
      dataIndex: "centre_size",
      key: "centre_size",
      renderText: { visible: true, isIntl: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.actions" }),
      dataIndex: "edit",
      key: "edit",
      renderImage: {
        alt: "edit",
        onClick: (rowData) => goToEditCentrePage(rowData, isEditable),
        preview: false,
        src: getImage(isEditable ? "edit" : "eye"),
        visible: true,
      },
    }),
  ];

  const renderContent = () => {
    if (!isGettingSetupCentres && errorWhileGettingCentres) {
      return (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            onRetry={handleOnReTry}
            errorText={errorWhileGettingCentres?.data?.message}
            errorHeading={intl.formatMessage({
              id: "label.error",
            })}
          />
        </div>
      );
    }
    if (isGettingSetupCentres) {
      return (
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      );
    }
    return (
      <DataTable
        columns={columns}
        current={current}
        pageSize={pageSize}
        onChangePageSize={onChangePageSize}
        onChangeCurrentPage={onChangeCurrentPage}
        currentDataLength={setupCentres?.meta?.total}
        customContainerStyles={styles.tableContainer}
        originalData={setupCentres?.records || []}
      />
    );
  };

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

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.headerContainer}
          topSection={
            <Typography className={styles.headingText}>
              {intl.formatMessage({ id: "setupCentres.heading" })}
            </Typography>
          }
          bottomSection={
            <Typography className={styles.descriptionText}>
              {intl.formatMessage({ id: "setupCentres.warning" })}
            </Typography>
          }
        />
      }
      bottomSection={renderContent()}
      bottomSectionStyle={classes.bottomSectionStyle}
      isBottomFillSpace
    />
  );
};

export default SetupCenter;
