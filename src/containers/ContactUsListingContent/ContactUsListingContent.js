import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import * as _ from "lodash";
import { Image, Input, Spin, Typography } from "antd";

import { ThemeContext } from "core/providers/theme";

import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import SearchFilter from "../../components/SearchFilter";
import useQueriesListingApi from "../../services/api-services/Queries/useQueriesListingApi";
import useTicketListingApi from "../../services/api-services/Tickets/useTicketsListingApi";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { ACCESS_FILTER_DATA } from "../../dummyData";
import {
  PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
  VALID_CONTACT_US_TABS_ID,
} from "../../constant/constant";
import styles from "./ContactUsListingContent.module.scss";

const ACTIVE_TAB = "activeTab";

const ContactUsListingContent = ({ currentActiveTab, setCurrentActiveTab }) => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [current, setCurrent] = useState(
    +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE) || 1
  );
  const [pageSize, setPageSize] = useState(
    +searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE) || PAGE_SIZE
  );

  const [showFilters, setShowFilters] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [currentDataLength, setCurrentDataLength] = useState(0);

  const {
    isSuccess: areQueriesFetchedSuccessfully,
    isFetchingQueries,
    errorWhileFetchingQueries,
    queriesList,
    fetchQueries,
    metaData: queriesMetaData,
  } = useQueriesListingApi();

  const {
    isSuccess: areTicketsFetchedSuccesfully,
    isFetchingTickets,
    errorWhileFetchingTickets,
    ticketList,
    fetchTickets,
    metaData: ticketsMetaData,
  } = useTicketListingApi();

  const isLoading = isFetchingQueries || isFetchingTickets;
  const error = errorWhileFetchingQueries || errorWhileFetchingTickets;
  const listItemData = currentActiveTab === 1 ? ticketList : queriesList;
  const isSuccessfullyFetched =
    areTicketsFetchedSuccesfully || areQueriesFetchedSuccessfully;

  const fetchItems = () => {
    currentActiveTab === 1 && fetchTickets(pageSize, current, searchedValue);
    currentActiveTab === 2 && fetchQueries(pageSize, current, searchedValue);
  };

  const debounceSearch = useMemo(() => _.debounce(fetchItems, 300), []);
  let doNotCallOnMount = useRef(false);

  useEffect(() => {
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (!currentPage || isNaN(currentPage)) {
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
        prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], PAGE_SIZE);
        return prev;
      });
      setPageSize(PAGE_SIZE);
    }
  }, []);

  useEffect(() => {
    const currentTab = +searchParams.get(ACTIVE_TAB);
    if (
      !currentTab ||
      isNaN(currentTab) ||
      !VALID_CONTACT_US_TABS_ID.includes(currentTab)
    ) {
      setSearchParams((prev) => {
        prev.set(ACTIVE_TAB, 1);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set(ACTIVE_TAB, currentActiveTab);
        return prev;
      });
      setCurrentActiveTab(currentActiveTab);
    }
    fetchItems();
    setPageSize(PAGE_SIZE);
    setCurrent(1);
  }, [currentActiveTab]);

  useEffect(() => {
    if (queriesMetaData?.total || ticketsMetaData?.total) {
      currentActiveTab === 1 && setCurrentDataLength(+ticketsMetaData?.total);
      currentActiveTab === 2 && setCurrentDataLength(+queriesMetaData?.total);
    }
  }, [queriesMetaData, ticketsMetaData, currentActiveTab]);

  const getStatusStyles = (status) => {
    if (status === "Closed") {
      return ["statusContainer_success", "statusText_success"];
    }
    if (status === "Pending") {
      return ["statusContainer_progress", "statusText_progress"];
    }
    return ["statusContainer_failed", "statusText_failed"];
  };

  const queriesColumns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.queriesId" }),
      dataIndex: "id",
      key: "id",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.studentOrCompany" }),
      dataIndex: "name",
      key: "name",
      sortKey: "name",
      sortTypeText: true,
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.nonRegisteredStudentOrCompany" }),
      dataIndex: "type",
      key: "type",
      renderText: { isTextBold: true, visible: true },
    }),
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.mobile" })}
        </p>
      ),
      dataIndex: "mobile",
      key: "mobile",
      renderText: { isTextBold: true, visible: true },
    },
    renderColumn({
      title: intl.formatMessage({ id: "label.queryType" }),
      dataIndex: "query_type",
      key: "query_type",
      renderText: { isTypeDate: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.email" }),
      dataIndex: "email",
      key: "email",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdOn" }),
      dataIndex: "created_at",
      key: "created_at",
      renderText: { isTypeDate: true, visible: true },
      sortDirection: ["ascend"],
      sortKey: "created_at",
      sortTypeDate: true,
      defaultSortOrder: "ascend",
    }),
    renderColumn({
      dataIndex: "see",
      key: "see",
      renderImage: {
        alt: "eye",
        preview: false,
        src: getImage("eye"),
        visible: true,
      },
    }),
    renderColumn({
      dataIndex: "check",
      key: "check",
      renderImage: {
        alt: "check",
        preview: false,
        src: getImage("rightIcon"),
        visible: true,
      },
    }),
  ];

  const ticketColumns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.ticketId" }),
      dataIndex: "id",
      key: "id",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdBy" }),
      dataIndex: "created_by",
      key: "created_by",
      sortKey: "created_by",
      sortTypeText: true,
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.role" }),
      dataIndex: "role",
      key: "role",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.registrationOrMembershipNumber" }),
      dataIndex: "registration_no",
      key: "registration_no",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.queryType" }),
      dataIndex: "query_type",
      key: "query_type",
      renderText: { isTypeDate: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.status" }),
      dataIndex: "status",
      key: "status",
      render: (data, rowData) => {
        const { status } = rowData;
        const styleClassForContainer = getStatusStyles(status)[0];
        const styleClassForText = getStatusStyles(status)[1];
        return (
          <div
            className={[styles.statusBox, styles[styleClassForContainer]].join(
              " "
            )}
          >
            <Typography className={styles[styleClassForText]}>
              {status}
            </Typography>
          </div>
        );
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.assignedTo" }),
      dataIndex: "assigned_to",
      key: "assigned_to",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdOn" }),
      dataIndex: "created_at",
      key: "created_at",
      renderText: { isTypeDate: true, visible: true },
      sortDirection: ["ascend"],
      sortKey: "created_at",
      sortTypeDate: true,
      defaultSortOrder: "ascend",
    }),
    renderColumn({
      dataIndex: "see",
      key: "see",
      renderImage: {
        alt: "eye",
        preview: false,
        src: getImage("messageText"),
        visible: true,
      },
    }),
  ];

  const columns = currentActiveTab === 1 ? ticketColumns : queriesColumns;

  useEffect(() => {
    if (doNotCallOnMount.current) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], current);
        prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], pageSize);
        return prev;
      });
      fetchItems();
    }
    doNotCallOnMount.current = true;
  }, [pageSize, current]);

  useEffect(() => {
    debounceSearch(pageSize, current, searchedValue);
  }, [searchedValue]);

  useEffect(() => {
    return () => {
      setShowFilters(false);
      setSearchedValue("");
      setCurrentDataLength(0);
    };
  }, []);

  return (
    <>
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
        {isSuccessfullyFetched && !isLoading && !error && (
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
            originalData={listItemData}
          />
        )}
        {isLoading && !error && (
          <div className={styles.loaderContainer}>
            <Spin size="large" />
          </div>
        )}
        {error && (
          <div className={styles.errorContainer}>
            <ErrorMessageBox
              onClick={fetchItems}
              errorText={error}
              errorHeading={intl.formatMessage({
                id: "label.error",
              })}
            />
          </div>
        )}
      </div>
    </>
  );
};

ContactUsListingContent.defaultProps = {
  currentActiveTab: 1,
  setCurrentActiveTab: () => {},
};

ContactUsListingContent.propTypes = {
  currentActiveTab: PropTypes.number,
  setCurrentActiveTab: PropTypes.func,
};

export default ContactUsListingContent;
