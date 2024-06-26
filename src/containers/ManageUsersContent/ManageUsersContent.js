import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { useIntl } from "react-intl";
import * as _ from "lodash";
import { Image, Input, Spin, message } from "antd";

import { ThemeContext } from "core/providers/theme";

import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import SearchFilter from "../../components/SearchFilter";
import useListingUsers from "../../services/api-services/Users/useListingUsers";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../core/hooks/useFetch";
import useUpdateUserDetailsApi from "../../services/api-services/Users/useUpdateUserDetailsApi";
import { convertPermissionFilter } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import {
  getValidPageNumber,
  getValidPageSize,
  getValidFilter,
} from "../../constant/utils";
import { ADMIN_ROUTE, ROLES_PERMISSION } from "../../constant/apiEndpoints";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";
import { classes } from "./ManageUsersContent.styles";
import styles from "./ManageUsersContent.module.scss";

const ManageUsersContent = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);
  const [messageApi, contextHolder] = message.useMessage();
  const { data } = useFetch({
    url: ADMIN_ROUTE + ROLES_PERMISSION,
  });

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
  const [showFilters, setShowFilters] = useState(false);

  const [filterArray, setFilterArray] = useState(
    getValidFilter(urlService.getQueryStringValue(PAGINATION_PROPERTIES.FILTER))
  );
  const [searchedValue, setSearchedValue] = useState(
    urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY) || ""
  );
  const [currentDataLength, setCurrentDataLength] = useState(0);

  const {
    isSuccess: areUsersFetchedSuccessfully,
    isFetchingUsers,
    errorWhileFetchingUsers,
    usersList,
    fetchUsers,
    metaData,
  } = useListingUsers();

  const { errorWhileUpdatingUserData, isLoading: isUpdatingUserData } =
    useUpdateUserDetailsApi();

  const debounceSearch = useMemo(() => _.debounce(fetchUsers, 300), []);

  const goToUserDetailsPage = (userId, mode) => {
    navigate(`details/${userId}?mode=${mode ? "edit" : "view"}`);
  };

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    const queryParams = {
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: size,
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: 1,
    };
    urlService.setMultipleQueryStringValues(queryParams);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE,
      newPageNumber
    );
  };

  const handleOnUserSearch = (event) => {
    setSearchedValue(event.target.value);
    (event.target.value.length > 2 ||
      searchedValue.length > event.target.value.length) &&
      debounceSearch(
        pageSize,
        current,
        event.target.value.length > 2
          ? encodeURIComponent(event.target.value)
          : "",
        filterArray["1"]
      );
    searchedValue.length > 2 && setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    event.target.value &&
      urlService.setQueryStringValue(
        PAGINATION_PROPERTIES.SEARCH_QUERY,
        event.target.value
      );
    !event.target.value &&
      urlService.removeParam(PAGINATION_PROPERTIES.SEARCH_QUERY);
  };

  const ChipWithOverflow = ({ textArray, maxChips }) => {
    if (textArray && textArray.length > 0) {
      const visibleChips = textArray.slice(0, maxChips);
      const hiddenCount = textArray.length - maxChips;

      return (
        <div className={styles.chipsContainer}>
          {visibleChips.map((chip, index) => (
            <p className={styles.textEllipsisChip} key={index}>
              {chip}
            </p>
          ))}
          {hiddenCount > 0 && (
            <p className={styles.textEllipsisChip}>+{hiddenCount}</p>
          )}
        </div>
      );
    }
    return <p className={styles.textEllipsis}>{"--"}</p>;
  };
  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.userName2" }),
      dataIndex: "name",
      key: "name",
      renderText: {
        isTextBold: true,
        visible: true,
        isCapitalize: true,
        textStyles: styles.tableCell,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.email" }),
      dataIndex: "email",
      key: "email",
      renderText: { visible: true, textStyles: styles.tableCell },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.mobileNumber" }),
      dataIndex: "mobile_number",
      key: "mobile_number",
      renderText: { visible: true, textStyles: styles.tableCell, mobile: true },
    }),
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.access" })}
        </p>
      ),
      dataIndex: "roles",
      key: "roles",
      render: (textArray, rowData) => {
        return (
          <ChipWithOverflow
            textArray={textArray ? Object.values(textArray) : null}
            maxChips={1}
          />
        );
      },
    },
    renderColumn({
      title: intl.formatMessage({ id: "label.status" }),
      dataIndex: "status",
      key: "status",
      renderSwitch: {
        visible: true,
        switchStyle: styles.tableCell,
        isActionable: false,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.dateCreatedOn" }),
      dataIndex: "created_at",
      key: "created_at",
      renderText: {
        isTypeDate: true,
        visible: true,
        textStyles: styles.tableCellDate,
      },
    }),
    renderColumn({
      title: " ",
      dataIndex: "see",
      key: "see",
      renderImage: {
        alt: "eye",
        onClick: (rowData) => goToUserDetailsPage(rowData?.id, false),
        preview: false,
        src: getImage("eye"),
        visible: true,
      },
    }),
    renderColumn({
      title: " ",
      dataIndex: "edit",
      key: "edit",
      renderImage: {
        alt: "edit",
        onClick: (rowData) => goToUserDetailsPage(rowData?.id, true),
        preview: false,
        src: getImage("edit"),
        visible: true,
      },
    }),
  ];

  useLayoutEffect(() => {
    const currentPage = +urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE
    );
    const currentPagePerRow = +urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (!currentPage || isNaN(currentPage) || currentPage <= 0) {
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    }

    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      urlService.setQueryStringValue(
        PAGINATION_PROPERTIES.ROW_PER_PAGE,
        DEFAULT_PAGE_SIZE
      );
    }
  }, []);

  useEffect(() => {
    if (+metaData?.total >= 0) {
      setCurrentDataLength(+metaData?.total);
    }
    const totalNumberOfValidPages = Math.ceil(
      metaData?.total / metaData?.perPage
    );
    if (current > totalNumberOfValidPages) {
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      setCurrent(1);
    }
  }, [metaData?.total, metaData?.perPage]);

  useEffect(() => {
    if (errorWhileUpdatingUserData) {
      messageApi.open({
        type: "error",
        content: intl.formatMessage({ id: "label.enableToUpdateUserStatus" }),
        style: classes.message,
      });
    }
  }, [errorWhileUpdatingUserData]);

  useEffect(() => {
    fetchUsers(
      pageSize,
      current,
      searchedValue.length > 2 ? encodeURIComponent(searchedValue) : "",
      filterArray["1"]
    );
    let arrayAsString = JSON.stringify(filterArray);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.FILTER,
      encodeURIComponent(arrayAsString)
    );
  }, [current, filterArray, pageSize]);

  useEffect(() => {
    return () => {
      setShowFilters(false);
      setSearchedValue("");
      setCurrentDataLength(0);
      setPageSize(DEFAULT_PAGE_SIZE);
      setCurrent(1);
    };
  }, []);

  return (
    <>
      {contextHolder}
      <div className={styles.filterAndTableContainer}>
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
              id: "label.searchByUserNameAndEmail",
            })}
            allowClear
            className={styles.searchBar}
            value={searchedValue}
            onChange={handleOnUserSearch}
          />
          <SearchFilter
            filterPropertiesArray={convertPermissionFilter(data?.roles)}
            {...{
              filterArray,
              showFilters,
              setFilterArray,
              setShowFilters,
            }}
          />
        </div>
        {areUsersFetchedSuccessfully && (
          <DataTable
            {...{
              columns,
              currentDataLength,
              pageSize,
              current,
              onChangePageSize,
              onChangeCurrentPage,
            }}
            customContainerStyles={styles.customContainerStyles}
            originalData={usersList || []}
          />
        )}
        {(isFetchingUsers || isUpdatingUserData) &&
          !errorWhileFetchingUsers &&
          !errorWhileUpdatingUserData && (
            <div className={styles.loaderContainer}>
              <Spin size="large" />
            </div>
          )}
        {errorWhileFetchingUsers && (
          <div className={styles.errorContainer}>
            <ErrorMessageBox
              onRetry={() => fetchUsers(10, 1)}
              errorText={errorWhileFetchingUsers}
              errorHeading={intl.formatMessage({ id: "label.error" })}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ManageUsersContent;
