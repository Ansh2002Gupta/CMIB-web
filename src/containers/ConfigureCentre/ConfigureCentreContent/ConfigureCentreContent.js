import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Image, Input, Typography } from "antd";
import * as _ from "lodash";

import CustomLoader from "../../../components/CustomLoader";
import DataTable from "../../../components/DataTable";
import ErrorMessageBox from "../../../components/ErrorMessageBox/ErrorMessageBox";
import useFetch from "../../../core/hooks/useFetch";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import useShowNotification from "../../../core/hooks/useShowNotification";
import useUpdateCenterDetailsApi from "../../../services/api-services/Centers/useUpdateCenterDetailsApi";
import {
  CENTER_END_POINT,
  PLACEMENT_ROUTE,
} from "../../../constant/apiEndpoints";
import { PAGINATION_PROPERTIES, SORT_VALUES } from "../../../constant/constant";
import {
  getValidPageNumber,
  getValidPageSize,
  toggleSorting,
} from "../../../constant/utils";
import styles from "./ConfigureCentreContent.module.scss";

const ConfigureCentreContent = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchedValue, setSearchedValue] = useState(
    searchParams.get(PAGINATION_PROPERTIES.SEARCH_QUERY) || ""
  );

  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );
  const [sortedOrder, setSortedOrder] = useState({
    sortDirection: SORT_VALUES.ASCENDING,
    sortKeyName: "center_name",
  });

  const { showNotification, notificationContextHolder } = useShowNotification();

  const { isLoading: isUpdatingCenterDetails, updateCenterDetails } =
    useUpdateCenterDetailsApi();

  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: PLACEMENT_ROUTE + CENTER_END_POINT,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const debounceSearch = useMemo(() => _.debounce(fetchData, 500), []);
  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }

  const goToEditCentrePage = (rowData) => {
    navigate(
      `/view-centre-details?centreId=${rowData?.centreId}&mode=${
        true ? "edit" : "view"
      }`
    );
  };

  const onHandleCentreStatus = (data) => {
    const { id } = data;
    const payload = {
      status: !data?.status,
    };

    updateCenterDetails(
      id,
      payload,
      () => {
        const requestedParams = {
          perPage: pageSize,
          page: current,
          keyword: searchedValue,
          sort: sortedOrder.sortDirection,
          order: sortedOrder.sortKeyName,
        };
        fetchData(requestedParams);
      },
      (errorMessage) => {
        showNotification(errorMessage, "error");
      }
    );
  };

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, size);
      return prev;
    });
    const requestedParams = {
      perPage: size,
      page: 1,
      keyword: searchedValue,
      sort: sortedOrder.sortDirection,
      order: sortedOrder.sortKeyName,
    };
    fetchData(requestedParams);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, newPageNumber);
      return prev;
    });
    const requestedParams = {
      perPage: pageSize,
      page: newPageNumber,
      keyword: searchedValue,
      sort: sortedOrder.sortDirection,
      order: sortedOrder.sortKeyName,
    };
    fetchData(requestedParams);
  };

  const handleOnUserSearch = (str) => {
    setSearchedValue(str);
    setCurrent(1);
    str &&
      setSearchParams((prev) => {
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, str);
        prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        return prev;
      });

    !str &&
      setSearchParams((prev) => {
        prev.delete(PAGINATION_PROPERTIES.SEARCH_QUERY);
        return prev;
      });
    const requestedParams = {
      perPage: pageSize,
      page: 1,
      keyword: str,
      sort: sortedOrder.sortDirection,
      order: sortedOrder.sortKeyName,
    };
    debounceSearch(requestedParams);
  };

  const handleTryAgain = () => {
    const requestedParams = {
      perPage: pageSize,
      page: current,
      keyword: searchedValue,
      sort: sortedOrder.sortDirection,
      order: sortedOrder.sortKeyName,
    };
    fetchData(requestedParams);
  };

  let sortArrowStyles = "";
  if (sortedOrder.sortDirection === SORT_VALUES.ASCENDING) {
    sortArrowStyles = styles.upside;
  } else if (sortedOrder.sortDirection === SORT_VALUES.DESCENDING) {
    sortArrowStyles = styles.downside;
  }

  const columns = [
    renderColumn({
      title: (
        <Typography
          className={styles.columnHeading}
          onClick={() =>
            fetchData(
              {
                perPage: pageSize,
                page: current,
                keyword: searchedValue,
                sort: toggleSorting(sortedOrder.sortDirection),
                order: sortedOrder.sortKeyName,
              },
              () =>
                setSortedOrder((prev) => {
                  return {
                    ...prev,
                    sortDirection: toggleSorting(prev.sortDirection),
                  };
                })
            )
          }
        >
          {intl.formatMessage({ id: "label.centreName" })}
          <Image
            src={getImage("arrowDownDarkGrey")}
            preview={false}
            className={[sortArrowStyles].join(" ")}
          />
        </Typography>
      ),
      dataIndex: "name",
      key: "name",
      renderText: {
        isTextBold: true,
        visible: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreId" }),
      dataIndex: "center_code",
      key: "center_code",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.bigSmallCentre" }),
      dataIndex: "center_type",
      key: "center_type",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.dateCreated" }),
      dataIndex: "created_at",
      key: "created_at",
      renderText: { isTypeDate: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.status" }),
      dataIndex: "status",
      key: "status",
      renderSwitch: {
        dataKeyName: "centreId",
        switchToggleHandler: (data) => onHandleCentreStatus(data),
        visible: true,
      },
    }),
    renderColumn({
      dataIndex: "edit",
      key: "edit",
      renderImage: {
        alt: "edit",
        onClick: (rowData) => goToEditCentrePage(rowData),
        preview: false,
        src: getImage("edit"),
        visible: true,
      },
    }),
  ];

  useEffect(() => {
    if (data?.meta) {
      const { total } = data?.meta;
      const numberOfPages = Math.ceil(total / pageSize);
      if (current > numberOfPages || current <= 0) {
        setCurrent(1);
        setSearchParams((prev) => {
          prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
          return prev;
        });
        const requestedParams = {
          perPage: pageSize,
          page: 1,
          keyword: searchedValue,
          sort: sortedOrder.sortDirection,
          order: sortedOrder.sortKeyName,
        };
        fetchData(requestedParams);
      }
    }
  }, [data?.meta]);

  useEffect(() => {
    const validPageSize = getValidPageSize(
      searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    );
    const validPageNumber = getValidPageNumber(
      searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE)
    );
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, validPageNumber);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, validPageSize);
      return prev;
    });
    const requestedParams = {
      perPage: validPageSize,
      page: validPageNumber,
      keyword: searchedValue,
      sort: sortedOrder.sortDirection,
      order: sortedOrder.sortKeyName,
    };
    fetchData(requestedParams);
  }, []);

  useEffect(() => {
    return () => {
      setSearchedValue("");
    };
  }, []);

  return (
    <>
      {notificationContextHolder}
      {isError && (
        <div className={styles.box}>
          <ErrorMessageBox
            onClick={handleTryAgain}
            errorText={errorString}
            errorHeading={intl.formatMessage({ id: "label.error" })}
          />
        </div>
      )}
      {!isError && (
        <div className={styles.tableContainer}>
          <div className={styles.searchBarContainer}>
            <Input
              prefix={
                <Image
                  src={getImage("searchIcon")}
                  className={styles.searchIcon}
                  preview={false}
                />
              }
              placeholder={intl.formatMessage({
                id: "label.searchByCentreNameOrId",
              })}
              allowClear
              className={styles.searchBar}
              value={searchedValue}
              onChange={(e) => handleOnUserSearch(e.target.value)}
            />
          </div>
          {isSuccess && !isUpdatingCenterDetails && (
            <DataTable
              {...{
                columns,
                searchedValue,
                current,
                pageSize,
                onChangePageSize,
                onChangeCurrentPage,
              }}
              currentDataLength={data?.meta?.total}
              originalData={data?.records}
            />
          )}
          {(isLoading || isUpdatingCenterDetails) && <CustomLoader />}
        </div>
      )}
    </>
  );
};

export default ConfigureCentreContent;
