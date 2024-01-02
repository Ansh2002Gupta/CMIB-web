import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import moment from "moment/moment";
import { ThemeContext } from "core/providers/theme";
import { Input, Switch, Image } from "antd";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ContentHeader from "../../containers/ContentHeader";
import DataTable from "../../components/DataTable";
import CustomButton from "../../components/CustomButton/CustomButton";
import SearchFilter from "../../components/SearchFilter";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";
import { DATA_SOURCE, ACCESS_FILTER_DATA } from "../../dummyData";
import styles from "./QueriesListing.module.scss";

const QueriesListing = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);

  const [showFilters, setShowFilters] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [currentTableData, setCurrentTableData] = useState(DATA_SOURCE);
  const [currentDataLength, setCurrentDataLength] = useState(
    DATA_SOURCE.length
  );

  const goToUserDetailsPage = (userId, editable) => {
    navigate(`/view-user-details?userId=${userId}&edit=${editable}`);
  };

  const onHandleUserStatus = (userId) => {
    // TODO: do an api call for updating real data into the database.
    const updatedData = currentTableData.map((item) => {
      if (userId === item.id) {
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });
    setCurrentTableData(updatedData);
  };

  const columns = [
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.userName2" })}
        </p>
      ),
      dataIndex: "UserName",
      key: "UserName",
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
      dataIndex: "mobile",
      key: "mobile",
      render: (text) => <p className={styles.textEllipsis}>{text}</p>,
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.access" })}
        </p>
      ),
      dataIndex: "access",
      key: "access",
      render: (text) => <p className={styles.textEllipsis}>{text}</p>,
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.dateCreatedOn" })}
        </p>
      ),
      dataIndex: "createdOn",
      key: "createdOn",
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
              onClick={() => onHandleUserStatus(data.id)}
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
        const { id } = rowData;
        return (
          <Image
            src={getImage("eye")}
            className={styles.eyeIcon}
            onClick={() => goToUserDetailsPage(id, false)}
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
        const { id } = rowData;
        return (
          <Image
            src={getImage("edit")}
            preview={false}
            className={styles.editIcon}
            onClick={() => goToUserDetailsPage(id, true)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    return () => {
      setShowFilters(false);
      setSearchedValue("");
      setCurrentTableData(DATA_SOURCE);
      setCurrentDataLength(DATA_SOURCE.length);
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
              />
            }
          />
        </div>
      }
      className={styles.baseLayout}
      bottomSection={
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
              currentTableData,
              setCurrentTableData,
              currentDataLength,
              setCurrentDataLength,
            }}
            originalData={DATA_SOURCE}
            columnsToBeSearchFrom={["UserName", "email"]}
          />
        </div>
      }
    />
  );
};

export default QueriesListing;
