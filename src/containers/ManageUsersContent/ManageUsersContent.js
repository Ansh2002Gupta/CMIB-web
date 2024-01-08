import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
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
import useUpdateUserDetailsApi from "../../services/api-services/Users/useUpdateUserDetailsApi";
import { ACCESS_FILTER_DATA } from "../../dummyData";
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

  let validPageSize = +searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE);
  let validCurrentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
  if (isNaN(validPageSize) || !VALID_ROW_PER_OPTIONS.includes(validPageSize)) {
    validPageSize = DEFAULT_PAGE_SIZE;
  }
  if (isNaN(validCurrentPage) || validCurrentPage < 0) {
    validCurrentPage = 1;
  }

  const [current, setCurrent] = useState(validCurrentPage);
  const [pageSize, setPageSize] = useState(validPageSize);

  const [showFilters, setShowFilters] = useState(false);
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
  let doNotCallOnMount = useRef(false);

  useLayoutEffect(() => {
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (
      !currentPage ||
      isNaN(current) ||
      current > metaData?.total ||
      current < 0
    ) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
        return prev;
      });
      setCurrent(1);
    }

    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], DEFAULT_PAGE_SIZE);
        return prev;
      });
      setPageSize(DEFAULT_PAGE_SIZE);
    }
  }, [areUsersFetchedSuccessfully]);

  useEffect(() => {
    if (metaData?.total) {
      setCurrentDataLength(+metaData?.total);
    }
  }, [metaData]);

  const goToUserDetailsPage = (userId, mode) => {
    navigate(`details/${userId}?mode=${mode ? "edit" : "view"}`);
  };

  const onHandleUserStatus = (userId, currentStatus) => {
    updateUserDetails(userId, {
      status: currentStatus ? 0 : 1,
    });
    debounceSearch(pageSize, current, searchedValue);
  };

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.userName2" }),
      dataIndex: "name",
      key: "name",
      sortTypeText: true,
      sortKey: "name",
      renderText: { isTextBold: true, visible: true, isCapitalize: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.email" }),
      dataIndex: "email",
      key: "email",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.mobileNumber" }),
      dataIndex: "mobile_number",
      key: "mobile_number",
      renderText: { visible: true },
    }),
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.access" })}
        </p>
      ),
      dataIndex: "role",
      key: "role",
      render: (textArray, rowData) => {
        const { id } = rowData;
        const str = textArray?.map((item) => item.name)?.join(", ");
        return (
          <p className={styles.textEllipsis} key={id}>
            {str ? str : "--"}
          </p>
        );
      },
    },
    renderColumn({
      title: intl.formatMessage({ id: "label.dateCreatedOn" }),
      dataIndex: "created_at",
      key: "created_at",
      sortTypeText: true,
      sortKey: "created_at",
      renderText: { isTypeDate: true, visible: true },
      sortTypeDate: true,
      sortDirection: ["ascend"],
      defaultSortOrder: "ascend",
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.status" }),
      dataIndex: "status",
      key: "status",
      renderSwitch: {
        switchToggleHandler: (data) =>
          onHandleUserStatus(data?.id, data?.status),
        visible: true,
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
    return () => {
      setShowFilters(false);
      setSearchedValue("");
      setCurrentDataLength(0);
    };
  }, []);

  useEffect(() => {
    if (doNotCallOnMount.current) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], current);
        prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], pageSize);
        return prev;
      });
      fetchUsers(pageSize, current, searchedValue);
    }
    doNotCallOnMount.current = true;
  }, [pageSize, current]);

  useEffect(() => {
    debounceSearch(pageSize, current, searchedValue);
  }, [searchedValue]);

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
            onChange={(e) => setSearchedValue(e.target.value)}
          />
          <SearchFilter
            filterPropertiesArray={ACCESS_FILTER_DATA}
            {...{ showFilters, setShowFilters }}
          />
        </div>
        {areUsersFetchedSuccessfully && (
          <DataTable
            {...{
              columns,
              searchedValue,
              currentDataLength,
              setCurrentDataLength,
              pageSize,
              current,
              setCurrent,
              setPageSize,
            }}
            originalData={usersList || []}
            paginationApi={fetchUsers}
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
