import React, { useContext, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import * as _ from "lodash";
import { Image, Input, Typography } from "antd";

import CustomButton from "../../../components/CustomButton";
import CustomLoader from "../../../components/CustomLoader";
import DataTable from "../../../components/DataTable";
import ErrorMessageBox from "../../../components/ErrorMessageBox/ErrorMessageBox";
import useFetch from "../../../core/hooks/useFetch";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import { ThemeContext } from "core/providers/theme";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import useResponsive from "../../../core/hooks/useResponsive";
import useShowNotification from "../../../core/hooks/useShowNotification";
import useUpdateCenterDetailsApi from "../../../services/api-services/Centers/useUpdateCenterDetailsApi";
import { urlService } from "../../../Utils/urlService";
import { validateSearchTextLength } from "../../../Utils/validations";
import { CENTRE_DETAILS } from "../../../routes/routeNames";
import { ADMIN_ROUTE, CENTRE_END_POINT } from "../../../constant/apiEndpoints";
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
import { ReactComponent as PlusIcon } from "../../../themes/base/assets/images/plus icon.svg";
import { ADD } from "../../../routes/routeNames";
import styles from "./ConfigureCentreContent.module.scss";

const ConfigureCentreContent = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;

  const [searchedValue, setSearchedValue] = useState(
    urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY) || ""
  );
  const [current, setCurrent] = useState(
    getValidPageNumber(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE)
    )
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    )
  );
  const [sortedOrder, setSortedOrder] = useState({
    sortDirection: getValidSortByValue(
      urlService.getQueryStringValue(SORT_PROPERTIES.SORT_BY)
    ),
    sortKeyName: "name",
  });

  const { showNotification, notificationContextHolder } = useShowNotification();

  const { isLoading: isUpdatingCenterDetails, updateCenterDetails } =
    useUpdateCenterDetailsApi();

  const { data, error, fetchData, isError, isLoading, isSuccess, setData } =
    useFetch({
      url: ADMIN_ROUTE + `/${currentlySelectedModuleKey}` + CENTRE_END_POINT,
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

  const getRequestedParams = ({ page, search, size, validSortByValue }) => {
    return {
      perPage: size || pageSize,
      page: page || current,
      q: search || "",
      sortDirection: validSortByValue || sortedOrder.sortDirection,
      sortField: sortedOrder.sortKeyName,
    };
  };

  const onHandleCentreStatus = (centerData) => {
    const { id } = centerData;
    const payload = {
      centre_size: centerData.centre_size,
      centre_code: centerData.centre_code,
      name: centerData.name,
      status: centerData?.status ? 0 : 1,
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
        showNotification({ text: errorMessage, type: "error" });
      }
    );
  };

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE, size);
    fetchData({
      queryParamsObject: getRequestedParams({
        page: 1,
        search: validateSearchTextLength(searchedValue),
        size: +size,
      }),
    });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE,
      newPageNumber
    );

    fetchData({
      queryParamsObject: getRequestedParams({
        page: newPageNumber,
        search: validateSearchTextLength(searchedValue),
      }),
    });
  };

  const handleOnUserSearch = (str) => {
    setCurrent(1);
    if (str?.trim()?.length > 2) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          search: validateSearchTextLength(str),
        }),
      });
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY, str);
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    }

    if (
      !str?.trim() &&
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY)
    ) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          search: "",
        }),
      });
      urlService.removeParam(PAGINATION_PROPERTIES.SEARCH_QUERY);
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
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
                urlService.setQueryStringValue(
                  SORT_PROPERTIES.SORT_BY,
                  toggleSorting(sortedOrder.sortDirection)
                );
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
      customColumnHeading: styles.columnHeading,
      dataIndex: "name",
      key: "name",
      renderText: {
        isTextBold: true,
        visible: true,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreCode" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "centre_code",
      key: "centre_code",
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
      customColumnHeading: styles.columnHeading,
      dataIndex: "created_at",
      key: "created_at",
      renderText: { isTypeDate: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.status" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "status",
      key: "status",
      renderSwitch: {
        dataKeyName: "status",
        switchToggleHandler: (data) => onHandleCentreStatus(data),
        visible: true,
        checkIsSwitchEditable: (data) => {
          return !!data?.is_editable && !isUpdatingCenterDetails;
        },
      },
    }),
    renderColumn({
      dataIndex: "edit",
      key: "edit",
      renderImage: {
        alt: "edit",
        onClick: (rowData) => {
          goToEditCentrePage(rowData);
        },
        preview: false,
        src: getImage("edit"),
        visible: true,
        customImageStyle: styles.editIcon,
      },
    }),
  ];

  useEffect(() => {
    if (data?.meta) {
      const { total } = data?.meta;
      const numberOfPages = Math.ceil(total / pageSize);
      if (current > numberOfPages || current <= 0) {
        setCurrent(1);
        urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      }
    }
  }, [data?.meta?.total]);

  useEffect(() => {
    const validPageSize = getValidPageSize(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    );
    const validPageNumber = getValidPageNumber(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE)
    );
    const validSortByValue = getValidSortByValue(
      urlService.getQueryStringValue(SORT_PROPERTIES.SORT_BY)
    );
    const defaultQueryParams = {
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: validPageNumber,
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: validPageSize,
      [SORT_PROPERTIES.SORT_BY]: validSortByValue,
    };
    urlService.setMultipleQueryStringValues(defaultQueryParams);
    if (userProfileDetails?.selectedModuleItem?.key) {
      fetchData({
        queryParamsObject: getRequestedParams({
          search: validateSearchTextLength(searchedValue),
          validSortByValue: validSortByValue,
        }),
      });
    }
  }, [userProfileDetails?.selectedModuleItem?.key]);

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
            <CustomButton
              btnText={
                responsive?.isSm
                  ? intl.formatMessage({
                      id: `label.${
                        responsive.isMd ? "addNewCentre" : "newCentre"
                      }`,
                    })
                  : ""
              }
              IconElement={PlusIcon}
              iconStyles={styles.btnIconStyles}
              customStyle={styles.btnCustomStyles}
              onClick={() => {
                navigate(ADD);
              }}
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
