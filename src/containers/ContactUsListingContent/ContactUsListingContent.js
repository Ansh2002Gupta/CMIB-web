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
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { ACCESS_FILTER_DATA } from "../../dummyData";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
  VALID_CONTACT_US_TABS_ID,
} from "../../constant/constant";
import styles from "./ContactUsListingContent.module.scss";

const ACTIVE_TAB = "activeTab";

const ContactUsListingContent = ({
  current,
  currentActiveTab,
  pageSize,
  queryListingProps,
  setCurrent,
  setCurrentActiveTab,
  setPageSize,
  ticketListingProps,
}) => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();

  const [showFilters, setShowFilters] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [currentDataLength, setCurrentDataLength] = useState(0);

  const {
    areQueriesFetchedSuccessfully,
    isFetchingQueries,
    errorWhileFetchingQueries,
    queriesList,
    fetchQueries,
    queriesMetaData,
  } = queryListingProps;

  const {
    areTicketsFetchedSuccesfully,
    isFetchingTickets,
    errorWhileFetchingTickets,
    ticketList,
    fetchTickets,
    ticketsMetaData,
  } = ticketListingProps;

  const isLoading = isFetchingQueries || isFetchingTickets;
  const error = errorWhileFetchingQueries || errorWhileFetchingTickets;
  const listItemData = currentActiveTab === 1 ? ticketList : queriesList;
  const isSuccessfullyFetched =
    areTicketsFetchedSuccesfully || areQueriesFetchedSuccessfully;

  const fetchItems = (currentPageSize, currentPage, str) => {
    currentActiveTab === 1 && fetchTickets(currentPageSize, currentPage, str);
    currentActiveTab === 2 && fetchQueries(currentPageSize, currentPage, str);
  };

  const debounceSearch = useMemo(() => _.debounce(fetchItems, 300), []);

  const handleOnUserSearch = (str) => {
    setSearchedValue(str);
    debounceSearch(pageSize, current, str);
  };

  const getStatusStyles = (status) => {
    if (status === "Closed") {
      return ["statusContainer_success", "statusText_success"];
    }
    if (status === "Pending") {
      return ["statusContainer_failed", "statusText_failed"];
    }
    return ["statusContainer_progress", "statusText_progress"];
  };

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    fetchItems(size, 1, searchedValue);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
    fetchItems(pageSize, newPageNumber, searchedValue);
  };

  const queriesColumns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.queriesId" }),
      dataIndex: "id",
      key: "id",
      renderText: {
        isTextBold: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.studentOrCompany" }),
      dataIndex: "name",
      key: "name",
      sortKey: "name",
      sortTypeText: true,
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.nonRegisteredStudentOrCompany" }),
      dataIndex: "type",
      key: "type",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.mobile" })}
        </p>
      ),
      dataIndex: "mobile",
      key: "mobile",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    },
    renderColumn({
      title: intl.formatMessage({ id: "label.queryType" }),
      dataIndex: "query_type",
      key: "query_type",
      renderText: {
        visible: true,
        textStyles: [styles.centerText, styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.email" }),
      dataIndex: "email",
      key: "email",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdOn" }),
      dataIndex: "created_at",
      key: "created_at",
      renderText: {
        isTypeDate: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
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
        onClick: () => navigate("/query/1"), // TODO: change it once the query details page have been integrated
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
      renderText: {
        isTextBold: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdBy" }),
      dataIndex: "created_by",
      key: "created_by",
      sortKey: "created_by",
      sortTypeText: true,
      renderText: { visible: true, textStyles: [styles.tableCell].join(" ") },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.role" }),
      dataIndex: "role",
      key: "role",
      renderText: { visible: true, textStyles: [styles.tableCell].join(" ") },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.registrationOrMembershipNumber" }),
      dataIndex: "registration_no",
      key: "registration_no",
      renderText: { visible: true, textStyles: [styles.tableCell].join(" ") },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.queryType" }),
      dataIndex: "query_type",
      key: "query_type",
      renderText: {
        visible: true,
        textStyles: [styles.centerText, styles.tableCell].join(" "),
      },
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
            className={[
              styles.statusBox,
              styles[styleClassForContainer],
              styles.tableCell,
            ].join(" ")}
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
      renderText: { visible: true, textStyles: [styles.tableCell].join(" ") },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdOn" }),
      dataIndex: "created_at",
      key: "created_at",
      renderText: {
        isTypeDate: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
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
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (!currentPage || isNaN(current) || current <= 0) {
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
  }, [currentActiveTab]);

  useEffect(() => {
    if (queriesMetaData?.total || ticketsMetaData?.total) {
      currentActiveTab === 1 && setCurrentDataLength(+ticketsMetaData?.total);
      currentActiveTab === 2 && setCurrentDataLength(+queriesMetaData?.total);
    }

    if (queriesMetaData?.total) {
      const totalNumberOfValidPages = Math.ceil(
        queriesMetaData?.total / queriesMetaData?.perPage
      );
      if (current > totalNumberOfValidPages) {
        setSearchParams((prev) => {
          prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
          return prev;
        });
        setCurrent(1);
      }
    }

    if (ticketsMetaData?.total) {
      const totalNumberOfValidPages = Math.ceil(
        ticketsMetaData?.total / ticketsMetaData?.perPage
      );
      if (current > totalNumberOfValidPages) {
        setSearchParams((prev) => {
          prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
          return prev;
        });
        setCurrent(1);
      }
    }
  }, [queriesMetaData, ticketsMetaData, currentActiveTab]);

  useEffect(() => {
    fetchItems(pageSize, current, searchedValue);
  }, []);

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
            onChange={(e) => handleOnUserSearch(e.target.value)}
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
              currentDataLength,
              pageSize,
              current,
              onChangePageSize,
              onChangeCurrentPage,
            }}
            originalData={listItemData || []}
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
              onClick={() => fetchItems(DEFAULT_PAGE_SIZE, 1)}
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
  current: 1,
  currentActiveTab: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  queryListingProps: {},
  setCurrent: () => {},
  setCurrentActiveTab: () => {},
  setPageSize: () => {},
  ticketListingProps: {},
};

ContactUsListingContent.propTypes = {
  current: PropTypes.number,
  currentActiveTab: PropTypes.number,
  pageSize: PropTypes.number,
  queryListingProps: PropTypes.object,
  setCurrent: PropTypes.func,
  setCurrentActiveTab: PropTypes.func,
  setPageSize: PropTypes.func,
  ticketListingProps: PropTypes.object,
};

export default ContactUsListingContent;
