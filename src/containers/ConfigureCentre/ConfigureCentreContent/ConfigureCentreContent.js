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
import {
  CENTER_END_POINT,
  PLACEMENT_ROUTE,
} from "../../../constant/apiEndpoints";
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
import { validateSearchTextLength } from "../../../Utils/validations";
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
    sortKeyName: "center_name",
  });

  const { showNotification, notificationContextHolder } = useShowNotification();

  const { isLoading: isUpdatingCenterDetails, updateCenterDetails } =
    useUpdateCenterDetailsApi();

  const { data, error, fetchData, isError, isLoading, isSuccess, setData } =
    useFetch({
      url: ADMIN_ROUTE + `/${currentlySelectedModuleKey}` + CENTER_END_POINT,
      otherOptions: {
        skipApiCallOnMount: true,
      },
    });
  const debounceSearch = useMemo(() => {
    return _.debounce(fetchData, DEBOUNCE_TIME);
  }, [currentlySelectedModuleKey]);

  const goToEditCentrePage = (rowData) => {
    navigate(`${CENTRE_DETAILS}/${rowData?.id}`);
  };

  const onHandleCentreStatus = (centerData) => {
    const { id } = centerData;
    const payload = {
      centre_size: centerData.centre_size,
      centre_code: centerData.centre_code,
      name: centerData.name,
      status: !centerData?.status,
    };

    updateCenterDetails(
      id,
      currentlySelectedModuleKey,
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
    fetchData({
      queryParamsObject: getRequestedParams({
        page: 1,
        search: validateSearchTextLength(searchedValue),
      }),
    });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, newPageNumber);
      return prev;
    });

    fetchData({
      queryParamsObject: getRequestedParams({
        page: newPageNumber,
        search: validateSearchTextLength(searchedValue),
      }),
    });
  };

  const handleOnUserSearch = (str) => {
    setSearchedValue(str);
    setCurrent(1);
    if (str?.trim()?.length > 2) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          search: validateSearchTextLength(str),
        }),
      });
      setSearchParams((prev) => {
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, str);
        prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        return prev;
      });
    }

    if (!str?.trim() && searchParams.get(PAGINATION_PROPERTIES.SEARCH_QUERY)) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          search: "",
        }),
      });
      setSearchParams((prev) => {
        prev.delete(PAGINATION_PROPERTIES.SEARCH_QUERY);
        prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        return prev;
      });
    }
    setSearchedValue(str);
  };

  const handleTryAgain = () => {
    fetchData({
      queryParamsObject: getRequestedParams({
        search: validateSearchTextLength(searchedValue),
      }),
    });
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
          className={[styles.columnHeading, styles.sortColumn]}
          onClick={() => {
            fetchData({
              queryParamsObject: getRequestedParams({
                search: validateSearchTextLength(searchedValue),
                validSortByValue: toggleSorting(sortedOrder.sortDirection),
              }),
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
            });
          }}
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
      dataIndex: "center_code",
      key: "center_code",
      renderText: { visible: true },
    }),
    {
      ...renderColumn({
        title: intl.formatMessage({ id: "label.bigSmallCentre" }),
        customColumnHeading: styles.columnHeading,
        dataIndex: "centre_size",
        key: "centre_size",
        renderText: {
          visible: true,
          textStyles: styles.tableCell,
          isIntl: true,
        },
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
        dataKeyName: "centreId",
        switchToggleHandler: (data) => onHandleCentreStatus(data),
        visible: true,
        checkIsSwitchEditable: (data) => {
          return !isUpdatingCenterDetails;
        },
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
    if (userProfileDetails?.selectedModuleItem?.key) {
      fetchData({
        queryParamsObject: getRequestedParams({
          search: validateSearchTextLength(searchedValue),
          validSortByValue: validSortByValue,
        }),
      });
    }
  }, [userProfileDetails]);

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
              value={searchedValue?.trim()}
              onChange={(e) => handleOnUserSearch(e.target.value)}
            />
          </div>
          {isSuccess && (
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
          {isLoading && <CustomLoader />}
        </div>
      )}
    </>
  );
};

export default ConfigureCentreContent;
