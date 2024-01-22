import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";

import ErrorMessageBox from "../../../components/ErrorMessageBox";
import TableWithSearchAndFilters from "../../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useFetch from "../../../core/hooks/useFetch";
import useGetAllQueryTypesApi from "../../../services/api-services/Query/useGetAllQueryTypesApi";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import { getTicketOrQueryColumn } from "../ContactUsListingContentConfig";
import { toggleSortDirection } from "../../../constant/utils";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
} from "../../../constant/constant";
import { ADMIN_ROUTE, TICKET_LIST } from "../../../constant/apiEndpoints";
import { TICKET_DATA_LIST } from "../../../dummyData";
import styles from "../ContactUsListingContent.module.scss";

const TicketTable = ({
  currentPage,
  currentActiveTab,
  pageSize,
  setCurrentPage,
  setPageSize,
  searchedValue,
  setSearchedValue,
}) => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [, setSearchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();

  const [currentFilterStatus, setCurrentFilterStatus] = useState([]);

  const [sortDirection, setSortDirection] = useState({
    direction: "asc",
    key: "name",
  });

  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: ADMIN_ROUTE + TICKET_LIST,
    otherOptions: { skipApiCallOnMount: true },
  });

  const columns = getTicketOrQueryColumn(
    currentActiveTab,
    intl,
    getImage,
    navigate,
    renderColumn,
    sortDirection.direction,
    () =>
      fetchData(
        {
          perPage: pageSize,
          page: current,
          q: searchedValue,
          sort: sortDirection.key,
          order: toggleSortDirection(sortDirection.direction),
        },
        () => {
          setSortDirection((prev) => {
            return {
              ...prev,
              direction: toggleSortDirection(sortDirection.direction),
            };
          });
        }
      )
  );
  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }
  const debounceSearch = useMemo(() => _.debounce(fetchData, 300), []);

  const {
    isError: isErrorGettingQueryTypes,
    isSuccess: isSuccessFullgetQueryTypes,
    error: errorWhileGettingQueryTypes,
    isLoading: isLoadingWhileGettingQueryTypes,
    data: queryTypesData,
    getAllQueryTypes,
  } = useGetAllQueryTypesApi();

  const filtersData = [
    {
      id: 1,
      name: intl.formatMessage({ id: "label.status" }),
      options: [], // TODO: need to get this from API
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "label.queryTypes" }),
      options: queryTypesData,
    },
  ];

  const handleOnFilterApply = () => {
    // TODO: change the name of the key required to sending the filters value to the backend
    const requestedParams = {
      perPage: pageSize,
      page: current,
      q: searchedValue,
      queryType: currentFilterStatus,
    };
    fetchData(requestedParams);
  };

  const handleOnUserSearch = (str) => {
    setSearchedValue(str);
    str &&
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.SEARCH_QUERY], str);
        return prev;
      });
    !str &&
      setSearchParams((prev) => {
        prev.delete([PAGINATION_PROPERTIES.SEARCH_QUERY]);
        return prev;
      });
    const requestedParams = {
      perPage: pageSize,
      page: currentPage,
      q: str,
    };
    debounceSearch(requestedParams);
  };

  const onChangePageSize = (size) => {
    setPageSize(size);
    setCurrentPage(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    const requestedParams = {
      perPage: size,
      page: 1,
      q: searchedValue,
    };
    fetchData(requestedParams);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrentPage(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
    const requestedParams = {
      perPage: pageSize,
      page: newPageNumber,
      q: searchedValue,
    };
    fetchData(requestedParams);
  };

  useEffect(() => {
    if (data?.meta) {
      // const { total } = data?.meta; :TODO: un-comment once backend start providing records
      const total = 14;
      const numberOfPages = Math.ceil(total / pageSize);
      if (currentPage > numberOfPages) {
        setCurrentPage(1);
        setSearchParams((prev) => {
          prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
          return prev;
        });

        const requestedParams = {
          perPage: pageSize,
          page: 1,
          q: searchedValue,
        };
        fetchData(requestedParams);
      }
    }
  }, [data?.meta?.total]);

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, currentPage);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, pageSize);
      searchedValue &&
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, searchedValue);
      return prev;
    });

    const requestedParams = {
      perPage: pageSize,
      page: currentPage,
      q: searchedValue,
    };
    fetchData(requestedParams);
    getAllQueryTypes();
  }, []);

  const handleOnReTry = () => {
    const requestedParams = {
      perPage: DEFAULT_PAGE_SIZE,
      page: 1,
      q: searchedValue,
    };
    fetchData(requestedParams);
  };

  useEffect(() => {
    return () => {
      setSearchedValue("");
      setSearchParams((prev) => {
        prev.delete([PAGINATION_PROPERTIES.SEARCH_QUERY]);
        return prev;
      });
    };
  }, []);

  // TODO: remove this once API start providing data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  return (
    <>
      {!isError && (
        <TableWithSearchAndFilters
          {...{
            current: currentPage,
            pageSize,
            searchedValue,
            handleOnUserSearch,
            columns,
            onChangePageSize,
            onChangeCurrentPage,
            filtersData,
            currentFilterStatus,
            setCurrentFilterStatus,
          }}
          isLoading={isSuccess && !isLoading}
          // TODO: please remove the dummy data once the data start coming from API
          data={TICKET_DATA_LIST.slice(startIndex, endIndex)}
          currentDataLength={TICKET_DATA_LIST.length}
          optionsIdKey={"id"}
          optionsNameKey={"name"}
          onSearch={handleOnFilterApply}
        />
      )}
      {isError && (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            onRetry={handleOnReTry}
            errorText={errorString}
            errorHeading={intl.formatMessage({
              id: "label.error",
            })}
          />
        </div>
      )}
    </>
  );
};

TicketTable.defaultProps = {
  currentPage: 1,
  currentActiveTab: "1",
  pageSize: DEFAULT_PAGE_SIZE,
  queryListingProps: {},
  setCurrentPage: () => {},
  setPageSize: () => {},
  ticketListingProps: {},
  searchedValue: "",
  setSearchedValue: () => {},
};

TicketTable.propTypes = {
  currentPage: PropTypes.number,
  currentActiveTab: PropTypes.string,
  pageSize: PropTypes.number,
  queryListingProps: PropTypes.object,
  setCurrentPage: PropTypes.func,
  setPageSize: PropTypes.func,
  ticketListingProps: PropTypes.object,
  searchedValue: PropTypes.string,
  setSearchedValue: PropTypes.func,
};

export default TicketTable;
