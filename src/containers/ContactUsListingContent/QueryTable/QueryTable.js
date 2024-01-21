import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";

import ErrorMessageBox from "../../../components/ErrorMessageBox";
import TableWithSearchAndFilters from "../../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../../core/hooks/useFetch";
import useGetAllQueryTypesApi from "../../../services/api-services/Query/useGetAllQueryTypesApi";
import { getTicketOrQueryColumn } from "../ContactUsListingContentConfig";
import { toggleSortDirection } from "../../../constant/utils";
import { ADMIN_ROUTE, QUERY_END_POINT } from "../../../constant/apiEndpoints";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
} from "../../../constant/constant";
import styles from "../ContactUsListingContent.module.scss";

const QueryTable = ({
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

  const [sortDirection, setSortDirection] = useState({
    direction: "asc",
    key: "name",
  });
  const [currentFilterStatus, setCurrentFilterStatus] = useState([]);

  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: ADMIN_ROUTE + QUERY_END_POINT,
    otherOptions: { skipApiCallOnMount: true },
  });

  const {
    isError: isErrorGettingQueryTypes,
    isSuccess: isSuccessFullgetQueryTypes,
    error: errorWhileGettingQueryTypes,
    isLoading: isLoadingWhileGettingQueryTypes,
    data: queryTypesData,
    getAllQueryTypes,
  } = useGetAllQueryTypesApi();

  const filtersData = isErrorGettingQueryTypes
    ? null
    : [
        {
          id: 1,
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

  const columns = getTicketOrQueryColumn(
    currentActiveTab,
    intl,
    getImage,
    navigate,
    renderColumn,
    sortDirection.direction,
    (direction) =>
      fetchData(
        {
          perPage: pageSize,
          page: current,
          q: searchedValue,
          sort: sortDirection.key,
          order: direction,
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
      page: current,
      q: str,
    };
    debounceSearch(requestedParams);
  };

  const onChangePageSize = (size) => {
    setPageSize(size);
    setCurrent(1);
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
    setCurrent(newPageNumber);
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

  const handleOnReTry = () => {
    const requestedParams = {
      perPage: DEFAULT_PAGE_SIZE,
      page: 1,
      q: searchedValue,
    };
    fetchData(requestedParams);
  };

  useEffect(() => {
    if (data?.meta) {
      const { total } = data?.meta;
      const numberOfPages = Math.ceil(total / pageSize);
      if (current > numberOfPages) {
        setCurrent(1);
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
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, current);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, pageSize);
      searchedValue &&
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, searchedValue);
      return prev;
    });

    const requestedParams = {
      perPage: pageSize,
      page: current,
      q: searchedValue,
    };
    fetchData(requestedParams);
    getAllQueryTypes();
  }, []);

  return (
    <>
      {!isError && (
        <TableWithSearchAndFilters
          {...{
            current,
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
          data={data?.records}
          currentDataLength={data?.meta?.total}
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

QueryTable.defaultProps = {
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

QueryTable.propTypes = {
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

export default QueryTable;
