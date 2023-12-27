import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import moment from "moment/moment";
import {
  Alert,
  Button,
  Image,
  Input,
  message,
  Spin,
  Switch,
  Typography,
} from "antd";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";
import { ThemeContext } from "core/providers/theme";

import ContentHeader from "../../containers/ContentHeader";
import CustomButton from "../../components/CustomButton/CustomButton";
import DataTable from "../../components/DataTable";
import SearchFilter from "../../components/SearchFilter";
import useListingUsers from "../../services/api-services/Users/useListingUsers";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";
import useUpdateUserDetailsApi from "../../services/api-services/Users/useUpdateUserDetailsApi";
import { ACCESS_FILTER_DATA } from "../../dummyData";
import { VIEW_USER_DETAILS } from "../../routes/routeNames";
import styles from "./ManageUsers.module.scss";

const ManageUsers = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);
  const [messageApi, contextHolder] = message.useMessage();

  const [showFilters, setShowFilters] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");

  const {
    isSuccess: areUsersFetchedSuccessfully,
    isFetchingUsers,
    errorWhileFetchingUsers,
    usersList,
    fetchUsers,
  } = useListingUsers();

  const {
    errorWhileUpdatingUserData,
    updateUserDetails,
    isLoading: isUpdatingUserData,
    isSuccess: isUserStatusUpdatedSuccesfully,
    setErrorWhileUpdatingUserData,
  } = useUpdateUserDetailsApi();
  const [currentDataLength, setCurrentDataLength] = useState(usersList?.length);

  useEffect(() => {
    fetchUsers(10, 1);
  }, []);

  const goToUserDetailsPage = (userId, editable, userName) => {
    navigate(VIEW_USER_DETAILS);
  };

  const onHandleUserStatus = (userId, currentStatus) => {
    updateUserDetails(userId, {
      status: !currentStatus,
    });
  };

  const columns = [
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.userName2" })}
        </p>
      ),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.UserName.localeCompare(b.UserName),
      render: (text) => (
        <p className={[styles.boldText, styles.textEllipsis].join(" ")}>
          {text}
        </p>
      ),
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.email" })}
        </p>
      ),
      dataIndex: "email",
      key: "email",
      render: (text) => <p className={styles.textEllipsis}>{text}</p>,
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.mobileNumber" })}
        </p>
      ),
      dataIndex: "mobile_number",
      key: "mobile_number",
      render: (text) => <p className={styles.textEllipsis}>{text}</p>,
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.access" })}
        </p>
      ),
      dataIndex: "role",
      key: "role",
      render: (textArray) => (
        <p className={styles.textEllipsis}>
          {textArray?.map((item) => item.name)?.join(", ")}
        </p>
      ),
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.dateCreatedOn" })}
        </p>
      ),
      dataIndex: "created_at",
      key: "created_at",
      render: (data) => moment(data).format("DD/MM/YYYY"),
      sorter: (a, b) => moment(a.createdOn).unix() - moment(b.createdOn).unix(),
      sortDirection: ["ascend"],
      defaultSortOrder: "ascend",
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.status" })}
        </p>
      ),
      dataIndex: "status",
      key: "status",
      render: (_, data) => {
        const { status } = data;
        return (
          <div className={styles.userStatusContainer}>
            <Switch
              checked={status}
              onClick={() => onHandleUserStatus(data.id, status)}
              className={status ? styles.switchBgColor : ""}
            />
            <p>
              {status
                ? intl.formatMessage({ id: "label.active" })
                : intl.formatMessage({ id: "label.inactive" })}
            </p>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "see",
      key: "see",
      render: (_, rowData) => {
        const { id, UserName } = rowData;
        return (
          <Image
            src={getImage("eye")}
            className={styles.eyeIcon}
            onClick={() => goToUserDetailsPage(id, false, UserName)}
            preview={false}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      render: (_, rowData) => {
        const { id, UserName } = rowData;
        return (
          <Image
            src={getImage("edit")}
            preview={false}
            className={styles.editIcon}
            onClick={() => goToUserDetailsPage(id, true, UserName)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (errorWhileUpdatingUserData) {
      messageApi.open({
        type: "error",
        content: intl.formatMessage({ id: "label.enableToUpdateUserStatus" }),
        style: {
          marginTop: "20vh",
        },
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

  return (
    <TwoRow
      isBottomFillSpace
      topSection={
        <div className={styles.headerContainer}>
          <ContentHeader
            headerText={intl.formatMessage({ id: "label.users" })}
            customStyles={styles.headerResponsiveStyle}
            rightSection={
              <CustomButton
                btnText={intl.formatMessage({
                  id: `label.${responsive.isMd ? "addNewUsers" : "newUsers"}`,
                })}
                iconUrl={getImage("plusIcon")}
                iconStyles={styles.btnIconStyles}
                customStyle={styles.btnCustomStyles}
                onClick={goToUserDetailsPage}
              />
            }
          />
        </div>
      }
      className={styles.baseLayout}
      bottomSection={
        <>
          {contextHolder}
          {areUsersFetchedSuccessfully && (
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
              <DataTable
                {...{
                  columns,
                  searchedValue,
                  currentDataLength,
                  setCurrentDataLength,
                }}
                originalData={usersList || []}
                columnsToBeSearchFrom={["UserName", "email"]}
              />
            </div>
          )}
          {(isFetchingUsers || isUpdatingUserData) &&
            !errorWhileFetchingUsers &&
            !errorWhileUpdatingUserData && (
              <div className={styles.loaderContainer}>
                <Spin size="large" />
              </div>
            )}
          {errorWhileFetchingUsers && (
            <div>
              <Alert
                type="error"
                message="Error"
                description={
                  <div>
                    <Typography>{errorWhileFetchingUsers}</Typography>
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
        </>
      }
    />
  );
};

export default ManageUsers;
