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
import { CENTRE_DETAILS } from "../../../routes/routeNames";
import { ADMIN_ROUTE, CENTER_END_POINT } from "../../../constant/apiEndpoints";
import {
  DEBOUNCE_TIME,
  PAGINATION_PROPERTIES,
  SORT_PROPERTIES,
  SORT_VALUES,
} from "../../../constant/constant";
import {
  getValidPageNumber,
  getValidPageSize,
  getValidSortByValue,
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
    sortDirection: getValidSortByValue(
      searchParams.get(SORT_PROPERTIES.SORT_BY)
    ),
    sortKeyName: "name",
  });

  const { showNotification, notificationContextHolder } = useShowNotification();

  const { isLoading: isUpdatingCenterDetails, updateCenterDetails } =
    useUpdateCenterDetailsApi();

  const { data, error, fetchData, isError, isLoading, isSuccess, setData } =
    useFetch({
      url: ADMIN_ROUTE + CENTER_END_POINT,
      otherOptions: {
        skipApiCallOnMount: true,
      },
    });
  const debounceSearch = useMemo(
    () => _.debounce(fetchData, DEBOUNCE_TIME),
    []
  );

  const goToEditCentrePage = (rowData) => {
    navigate(`${CENTRE_DETAILS}/${rowData?.id}`);
  };

  const onHandleCentreStatus = (centerData) => {
    const { id } = centerData;
    const payload = {
      status: !centerData?.status,
    };

    updateCenterDetails(
      id,
      payload,
      () => {
        setData({
          ...data,
          records: data.records.map((record) =>
            record.id === id ? { ...record, status: payload.status } : record
          ),
        });
      },
      (errorMessage) => {
        showNotification({ text: errorMessage, type: "error" });
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
      q: searchedValue,
      sortDirection: sortedOrder.sortDirection,
      sortField: sortedOrder.sortKeyName,
    };
    fetchData({ queryParamsObject: requestedParams });
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
      q: searchedValue,
      sortDirection: sortedOrder.sortDirection,
      sortField: sortedOrder.sortKeyName,
    };
    fetchData({ queryParamsObject: requestedParams });
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
      q: str,
      sortDirection: sortedOrder.sortDirection,
      sortField: sortedOrder.sortKeyName,
    };
    debounceSearch({ queryParamsObject: requestedParams });
  };

  const handleTryAgain = () => {
    const requestedParams = {
      perPage: pageSize,
      page: current,
      q: searchedValue,
      sortDirection: sortedOrder.sortDirection,
      sortField: sortedOrder.sortKeyName,
    };
    fetchData({ queryParamsObject: requestedParams });
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
            fetchData({
              queryParamsObject: {
                perPage: pageSize,
                page: current,
                q: searchedValue,
                sortDirection: toggleSorting(sortedOrder.sortDirection),
                sortField: sortedOrder.sortKeyName,
              },
              onSuccessCallback: () => {
                setSearchParams((prevValue) => {
                  prevValue.set(
                    SORT_PROPERTIES.SORT_BY,
                    toggleSorting(sortedOrder.sortDirection)
                  );
                  return prevValue;
                });
                setSortedOrder((prev) => {
                  return {
                    ...prev,
                    sortDirection: toggleSorting(prev.sortDirection),
                  };
                });
              },
            })
          }
        >
          {intl.formatMessage({ id: "label.centreName" })}
          <div className={styles.sortArrowImageContainer}>
            <Image
              src={getImage("arrowDownDarkGrey")}
              preview={false}
              className={[sortArrowStyles].join(" ")}
            />
          </div>
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
      dataIndex: "centre_code",
      key: "centre_code",
      renderText: { visible: true },
    }),
    {
      ...renderColumn({
        title: intl.formatMessage({ id: "label.bigSmallCentre" }),
        dataIndex: "centre_size",
        key: "centre_size",
        renderText: { visible: true, textStyles: styles.tableCell },
      }),
      width: "100px",
    },
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
        dataKeyName: "status",
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
          q: searchedValue,
          sortDirection: sortedOrder.sortDirection,
          sortField: sortedOrder.sortKeyName,
        };
        fetchData({ queryParamsObject: requestedParams });
      }
    }
  }, [data?.meta?.total]);

  useEffect(() => {
    const validPageSize = getValidPageSize(
      searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    );
    const validPageNumber = getValidPageNumber(
      searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE)
    );
    const validSortByValue = getValidSortByValue(
      searchParams.get(SORT_PROPERTIES.SORT_BY)
    );
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, validPageNumber);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, validPageSize);
      prev.set(SORT_PROPERTIES.SORT_BY, validSortByValue);
      return prev;
    });
    const requestedParams = {
      perPage: validPageSize,
      page: validPageNumber,
      q: searchedValue,
      sortDirection: validSortByValue,
      sortField: sortedOrder.sortKeyName,
    };
    fetchData({ queryParamsObject: requestedParams });
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
            onRetry={handleTryAgain}
            errorText={error?.data?.message || error}
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
