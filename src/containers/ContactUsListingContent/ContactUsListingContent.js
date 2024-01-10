import React, { useContext, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";
import { Image, Input, Spin } from "antd";

import { ThemeContext } from "core/providers/theme";

import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import SearchFilter from "../../components/SearchFilter";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { getTicketOrQueryColumn } from "./ContactUsListingContentConfig";
import { ACCESS_FILTER_DATA } from "../../dummyData";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
  VALID_CONTACT_US_TABS_ID,
  ACTIVE_TAB,
} from "../../constant/constant";
import styles from "./ContactUsListingContent.module.scss";

const ContactUsListingContent = ({
  current,
  currentActiveTab,
  pageSize,
  queryListingProps,
  setCurrent,
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
  const columns = getTicketOrQueryColumn(
    currentActiveTab,
    intl,
    getImage,
    navigate,
    renderColumn
  );

  const fetchItems = (currentPageSize, currentPage, str) => {
    currentActiveTab === 1 && fetchTickets(currentPageSize, currentPage, str);
    currentActiveTab === 2 && fetchQueries(currentPageSize, currentPage, str);
  };

  const debounceSearch = useMemo(() => _.debounce(fetchItems, 300), []);

  const handleOnUserSearch = (str) => {
    setSearchedValue(str);
    debounceSearch(pageSize, current, str);
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
            customContainerStyles={styles.tableContainer}
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
  setPageSize: () => {},
  ticketListingProps: {},
};

ContactUsListingContent.propTypes = {
  current: PropTypes.number,
  currentActiveTab: PropTypes.number,
  pageSize: PropTypes.number,
  queryListingProps: PropTypes.object,
  setCurrent: PropTypes.func,
  setPageSize: PropTypes.func,
  ticketListingProps: PropTypes.object,
};

export default ContactUsListingContent;
