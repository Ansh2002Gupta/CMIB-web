import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import { useIntl } from "react-intl";
import * as _ from "lodash";
import { Alert, Button, Image, Input, Spin, Typography, message } from "antd";

import { ThemeContext } from "core/providers/theme";

import DataTable from "../../components/DataTable";
import SearchFilter from "../../components/SearchFilter";
import useListingUsers from "../../services/api-services/Users/useListingUsers";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useQueryParams from "../../core/hooks/useQueryParams";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useUpdateUserDetailsApi from "../../services/api-services/Users/useUpdateUserDetailsApi";
import { ACCESS_FILTER_DATA } from "../../dummyData";
import {
  PAGE_SIZE,
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

  const { setQueryParams, getQueryParams, removeQueryParams } =
    useQueryParams();

  const [current, setCurrent] = useState(
    +getQueryParams(PAGINATION_PROPERTIES.CURRENT_PAGE) || 1
  );
  const [pageSize, setPageSize] = useState(
    +getQueryParams(PAGINATION_PROPERTIES.ROW_PER_PAGE) || PAGE_SIZE
  );

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

  useEffect(() => {
    const currentPage = +getQueryParams(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +getQueryParams(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (!currentPage || isNaN(current)) {
      setQueryParams(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      setCurrent(1);
    }
    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      setQueryParams(PAGINATION_PROPERTIES.ROW_PER_PAGE, PAGE_SIZE);
      setPageSize(PAGE_SIZE);
    }
  }, []);

  useEffect(() => {
    if (areUsersFetchedSuccessfully) {
      setCurrentDataLength(+metaData?.total);
    }
  }, [areUsersFetchedSuccessfully]);

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
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.email" }),
      dataIndex: "email",
      key: "email",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.mobileNumber" }),
      dataIndex: "mobile_number",
      key: "mobile_number",
      renderText: { isTextBold: true, visible: true },
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
      setQueryParams(PAGINATION_PROPERTIES.CURRENT_PAGE, current);
      setQueryParams(PAGINATION_PROPERTIES.ROW_PER_PAGE, pageSize);
      fetchUsers(pageSize, current, searchedValue);
    }
    doNotCallOnMount.current = true;
  }, [pageSize, current]);

  useEffect(() => {
    debounceSearch(pageSize, current, searchedValue);
  }, [searchedValue]);

  useEffect(() => {
    return () => {
      removeQueryParams();
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
