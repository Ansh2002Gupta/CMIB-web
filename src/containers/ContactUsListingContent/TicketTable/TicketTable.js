import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";

import ErrorMessageBox from "../../../components/ErrorMessageBox";
import TableWithSearchAndFilters from "../../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useFetch from "../../../core/hooks/useFetch";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import { getTicketOrQueryColumn } from "../ContactUsListingContentConfig";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
} from "../../../constant/constant";
import {
  CORE_ROUTE,
  QUERY_TYPE,
  STATUS,
  TICKET_LIST,
} from "../../../constant/apiEndpoints";
import styles from "../ContactUsListingContent.module.scss";

const TicketTable = ({
  current,
  currentActiveTab,
  pageSize,
  setCurrent,
  setPageSize,
  searchedValue,
  setSearchedValue,
}) => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [, setSearchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [sortBy, setSortBy] = useState("");

  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: CORE_ROUTE + TICKET_LIST,
    otherOptions: { skipApiCallOnMount: true },
  });
  const { data: queryTypes } = useFetch({
    url: CORE_ROUTE + QUERY_TYPE,
  });
  const { data: status } = useFetch({
    url: CORE_ROUTE + STATUS,
  });

  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }
  const debounceSearch = useMemo(() => {
    return _.debounce((requestedParams) => {
      fetchData({ queryParamsObject: requestedParams });
    }, 300);
  }, []);

  const queryTypeOptions = useMemo(() => {
    return queryTypes?.map((queryType) => ({
      optionId: queryType.id,
      str: queryType.name,
    }));
  }, [queryTypes]);

  const statusOptions = useMemo(() => {
    return status?.map((status) => ({
      optionId: status.id,
      str: status.name,
    }));
  }, [status]);

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
    const requestedParams = getRequestedQueryParams({ str });
    debounceSearch(requestedParams);
  };

  const getRequestedQueryParams = ({
    currentFilterStatus,
    page,
    rowPerPage,
    str,
    sortDirection,
  }) => {
    return {
      perPage: rowPerPage || pageSize,
      page: page || current,
      q: str || searchedValue,
      sortField: "created_by",
      sortDirection,
      status: JSON.stringify(currentFilterStatus?.["1"]),
      queryType: JSON.stringify(currentFilterStatus?.["2"]),
    };
  };
  const handleSorting = (sortDirection) => {
    const requestedParams = getRequestedQueryParams({ page: 1, sortDirection });
    fetchData({ queryParamsObject: requestedParams });
  };

  const columns = getTicketOrQueryColumn(
    currentActiveTab,
    intl,
    getImage,
    navigate,
    renderColumn,
    setSortBy,
    sortBy,
    handleSorting
  );

  const onChangePageSize = (size) => {
    setPageSize(size);
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    const requestedParams = getRequestedQueryParams({ perPage: size, page: 1 });
    fetchData({ queryParamsObject: requestedParams });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
    const requestedParams = getRequestedQueryParams({
      page: newPageNumber,
    });

    fetchData({ queryParamsObject: requestedParams });
  };

  // TODO: Need to refactor
  // useEffect(() => {
  //   if (data?.meta) {
  //     const { total } = data?.meta;
  //     const numberOfPages = Math.ceil(total / pageSize);
  //     if (current > numberOfPages) {
  //       setCurrent(1);
  //       setSearchParams((prev) => {
  //         prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
  //       });

  //       const requestedParams = {
  //         perPage: pageSize,
  //         page: 1,
  //         q: searchedValue,
  //       };
  //       fetchData({ queryParamsObject: requestedParams });
  //     }
  //   }
  // }, [data?.meta?.total]);

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, current);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, pageSize);
      searchedValue &&
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, searchedValue);
      return prev;
    });

    const requestedParams = getRequestedQueryParams({});

    fetchData({ queryParamsObject: requestedParams });
  }, []);

  const handleOnReTry = () => {
    const requestedParams = getRequestedQueryParams({
      perPage: DEFAULT_PAGE_SIZE,
      page: 1,
    });
    fetchData({ queryParamsObject: requestedParams });
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

  const filterOptions = [
    {
      id: 1,
      name: "Status",
      isSelected: false,
      options: statusOptions,
    },
    {
      id: 2,
      name: "Query Type",
      isSelected: false,
      options: queryTypeOptions,
    },
  ];

  const onFilterApply = (currentFilterStatus) => {
    const requestedParams = getRequestedQueryParams({ currentFilterStatus });
    fetchData({ queryParamsObject: requestedParams });
  };

  return (
    <>
      {!isError && (
        <TableWithSearchAndFilters
          {...{
            current,
            pageSize,
            searchedValue,
            filterOptions,
            handleOnUserSearch,
            columns,
            onChangePageSize,
            onChangeCurrentPage,
            onFilterApply,
          }}
          isLoading={isSuccess && !isLoading}
          data={data?.records}
          currentDataLength={data?.meta?.total}
        />
      )}
      {isError && (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            onClick={handleOnReTry}
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
  current: 1,
  currentActiveTab: "1",
  pageSize: DEFAULT_PAGE_SIZE,
  queryListingProps: {},
  setCurrent: () => {},
  setPageSize: () => {},
  ticketListingProps: {},
  searchedValue: "",
  setSearchedValue: () => {},
};

TicketTable.propTypes = {
  current: PropTypes.number,
  currentActiveTab: PropTypes.string,
  pageSize: PropTypes.number,
  queryListingProps: PropTypes.object,
  setCurrent: PropTypes.func,
  setPageSize: PropTypes.func,
  ticketListingProps: PropTypes.object,
  searchedValue: PropTypes.string,
  setSearchedValue: PropTypes.func,
};

export default TicketTable;
