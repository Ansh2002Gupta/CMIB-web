import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import * as _ from "lodash";
import { Alert, Button, Image, Input, Spin, Typography, message } from "antd";

import { ThemeContext } from "core/providers/theme";

import DataTable from "../../components/DataTable";
import SearchFilter from "../../components/SearchFilter";
import useListingUsers from "../../services/api-services/Users/useListingUsers";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../core/hooks/useFetch";
import useUpdateUserDetailsApi from "../../services/api-services/Users/useUpdateUserDetailsApi";
import { convertPermissionFilter } from "../../constant/utils";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, error, isLoading, isSuccess } = useFetch({
    url: ADMIN_ROUTE + ROLES_PERMISSION,
  });

  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );
  const [showFilters, setShowFilters] = useState(false);
  const [filterArray, setFilterArray] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [currentDataLength, setCurrentDataLength] = useState(0);

  const {
    isSuccess: areUsersFetchedSuccessfully,
    isFetchingUsers,
    errorWhileFetchingUsers,
    usersList,
    fetchUsers,
    metaData,
  } = useListingUsers();

  const {
    errorWhileUpdatingUserData,
    updateUserDetails,
    isLoading: isUpdatingUserData,
  } = useUpdateUserDetailsApi();

  const debounceSearch = useMemo(() => _.debounce(fetchUsers, 300), []);

  const goToUserDetailsPage = (userId, mode) => {
    navigate(`details/${userId}?mode=${mode ? "edit" : "view"}`);
  };

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    fetchUsers(size, 1, searchedValue, filterArray);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
    fetchUsers(pageSize, newPageNumber, searchedValue, filterArray);
  };

  const handleOnUserSearch = (event) => {
    setSearchedValue(event.target.value);
    if (event.target.value.length > 2) {
      debounceSearch(pageSize, current, event.target.value, filterArray);
    } else {
      debounceSearch(pageSize, current, "", filterArray);
    }
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    event.target.value &&
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.SEARCH_QUERY], event.target.value);
        return prev;
      });
    !event.target.value &&
      setSearchParams((prev) => {
        prev.delete([PAGINATION_PROPERTIES.SEARCH_QUERY]);
        return prev;
      });
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
      renderText: { visible: true, textStyles: styles.tableCell },
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
        textStyles: styles.tableCell,
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
        textStyles: styles.tableCell,
      },
    }),
    renderColumn({
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

  useEffect(() => {
    if (+metaData?.total >= 0) {
      setCurrentDataLength(+metaData?.total);
    }
    const totalNumberOfValidPages = Math.ceil(
      metaData?.total / metaData?.perPage
    );
    if (current > totalNumberOfValidPages) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
        return prev;
      });
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
      searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE),
      searchedValue,
      filterArray
    );
  }, [filterArray]);

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
            <Alert
              type="error"
              message="Error"
              className={styles.alertBox}
              description={
                <div className={styles.errorTextContainer}>
                  <Typography className={styles.errorText}>
                    {errorWhileFetchingUsers}
                  </Typography>
                  <Button onClick={() => fetchUsers(10, 1)}>
                    {intl.formatMessage({
                      id: "label.tryAgain",
                    })}
                  </Button>
                </div>
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ManageUsersContent;
