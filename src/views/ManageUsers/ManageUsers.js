import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import moment from "moment/moment";
import { Button, Image, Input, Switch, Typography } from "antd";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ContentHeader from "../../containers/ContentHeader";
import DataTable from "../../components/DataTable";
import GreenButton from "../../components/GreenButton/GreenButton";
import SearchFilter from "../../components/SearchFilter";
import useOutSideClick from "../../core/hooks/useOutSideClick";
import useResponsive from "../../core/hooks/useResponsive";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import edit from "../../themes/base/assets/images/edit.svg";
import eyeIcon from "../../themes/base/assets/images/eye.svg";
import filter from "../../themes/base/assets/images/filter.svg";
import plusIcon from "../../themes/base/assets/images/plus icon.svg";
import searchIcon from "../../themes/base/assets/images/search icon.svg";
import { DATA_SOURCE, ACCESS_FILTER_DATA } from "../../dummyData";
import styles from "./ManageUsers.module.scss";

const ManageUsers = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const elementNotConsideredInOutSideClick = useRef();
  const [showFilters, setShowFilters] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [currentTableData, setCurrentTableData] = useState(DATA_SOURCE);
  const [currentDataLength, setCurrentDataLength] = useState(
    DATA_SOURCE.length
  );
  const { wrapperRef } = useOutSideClick({
    onOutSideClick: () => {
      setShowFilters(false);
    },
    elementNotToBeConsidered: elementNotConsideredInOutSideClick,
  });
  const handleOnEdit = (userId) => {
    navigate(`/view-user-details?userId=${userId}&edit=true`);
  };
  const handleOnSeeUserDetails = (userId) => {
    navigate(`/view-user-details?userId=${userId}&edit=false`);
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
        return (
          <Image
            className={styles.eyeIcon}
            src={eyeIcon}
            preview={false}
            onClick={() => handleOnSeeUserDetails(rowData?.id)}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      render: (_, rowData) => {
        return (
          <Image
            className={styles.editIcon}
            src={edit}
            preview={false}
            onClick={() => handleOnEdit(rowData?.id)}
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
              <GreenButton
                btnText={intl.formatMessage({
                  id: `label.${responsive.isMd ? "addNewUsers" : "newUsers"}`,
                })}
                iconUrl={plusIcon}
                iconStyles={styles.btnIconStyles}
                customStyle={styles.btnCustomStyles}
              />
            }
          />
        </div>
      }
      bottomSection={
        <div className={styles.filterAndTableContainer}>
          <div className={styles.searchBarContainer}>
            <Input
              prefix={
                <Image
                  preview={false}
                  src={searchIcon}
                  className={styles.searchIcon}
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
            <Button
              ref={elementNotConsideredInOutSideClick}
              className={styles.filterBtn}
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <Image src={filter} preview={false} />
              <Typography className={styles.filterBtnText}>
                {intl.formatMessage({ id: "label.filter" })}
              </Typography>
            </Button>
            <div ref={wrapperRef}>
              <SearchFilter
                filterPropertiesArray={ACCESS_FILTER_DATA}
                {...{ showFilters, setShowFilters }}
              />
            </div>
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

export default ManageUsers;
