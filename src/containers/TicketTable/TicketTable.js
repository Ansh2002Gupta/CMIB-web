import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";

import AddTicketAssignee from "../AddTicketAssignee";
import CommonModal from "../../components/CommonModal";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import TableWithSearchAndFilters from "../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useFetch from "../../core/hooks/useFetch";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useShowNotification from "../../core/hooks/useShowNotification";
import { getTicketOrQueryColumn } from "./TicketTableConfig";
import { validateSearchTextLength } from "../../Utils/validations";
import {
  DEBOUNCE_TIME,
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
} from "../../constant/constant";
import {
  CORE_ROUTE,
  QUERY_TYPE,
  STATUS,
  TICKET_LIST,
} from "../../constant/apiEndpoints";
import styles from "./TicketTable.module.scss";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicketData, setCurentTicketData] = useState();
  const [sortBy, setSortBy] = useState("");
  const { showNotification, notificationContextHolder } = useShowNotification();

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
    return _.debounce(fetchData, DEBOUNCE_TIME);
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

  const handleClickAssign = (data) => {
    setIsModalOpen(true);
    setCurentTicketData(data);
  };

  const getRequestedQueryParams = ({
    currentFilterStatus,
    page,
    search,
    rowPerPage,
    sortDirection,
  }) => {
    return {
      perPage: rowPerPage || pageSize,
      page: page || current,
      q: search?.trim() || "",
      sortDirection,
      sortField: "created_by",
      status: JSON.stringify(currentFilterStatus?.["1"]),
      queryType: JSON.stringify(currentFilterStatus?.["2"]),
    };
  };

  const handleOnUserSearch = (str) => {
    setCurrent(1);
    setSearchedValue(str);
    if (str?.trim()?.length > 2) {
      debounceSearch({
        queryParamsObject: getRequestedQueryParams({
          page: 1,
          search: validateSearchTextLength(str),
        }),
      });
      setSearchParams((prev) => {
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, str);
        prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        return prev;
      });
    }
    if (!str?.trim() && searchParams.get(PAGINATION_PROPERTIES.SEARCH_QUERY)) {
      debounceSearch({
        queryParamsObject: getRequestedQueryParams({
          page: 1,
          search: "",
        }),
      });
      setSearchParams((prev) => {
        prev.delete(PAGINATION_PROPERTIES.SEARCH_QUERY);
        prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        return prev;
      });
    }
  };

  const handleSorting = (sortDirection) => {
    const requestedParams = getRequestedQueryParams({ page: 1, sortDirection });
    fetchData({ queryParamsObject: requestedParams });
  };

  const columns = getTicketOrQueryColumn({
    type: currentActiveTab,
    intl,
    getImage,
    handleClickAssign,
    navigate,
    renderColumn,
    queriesColumnProperties: {},
    fetchData,
    paginationAndSearchProperties: {
      pageSize,
      current,
      searchedValue,
    },
    setSortBy,
    sortBy,
    handleSorting,
  });

  const onChangePageSize = (size) => {
    setPageSize(size);
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    const requestedParams = getRequestedQueryParams({
      rowPerPage: size,
      page: 1,
    });
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

  const resetTicketListingData = (ticketsResult) => {
    if (ticketsResult?.meta?.total) {
      const totalRecords = ticketsResult?.meta?.total;
      const numberOfPages = Math.ceil(totalRecords / pageSize);
      if (current > numberOfPages) {
        fetchData({
          queryParamsObject: getRequestedQueryParams({
            page: 1,
          }),
        });
        setSearchParams((prev) => {
          prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
          return prev;
        });
        setCurrent(1);
      }
    }
  };

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, current);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, pageSize);
      searchedValue &&
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, searchedValue);
      return prev;
    });

    const requestedParams = getRequestedQueryParams({});

    fetchData({
      queryParamsObject: requestedParams,
      onSuccessCallback: resetTicketListingData,
    });
  }, []);

  const handleOnReTry = () => {
    const requestedParams = getRequestedQueryParams({
      rowPerPage: DEFAULT_PAGE_SIZE,
      page: 1,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const handleAssignee = () => {
    const requestedParams = getRequestedQueryParams({});
    fetchData({
      queryParamsObject: requestedParams,
      onSuccessCallback: resetTicketListingData,
    });
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
      {notificationContextHolder}
      <CommonModal isOpen={isModalOpen} width={450}>
        <AddTicketAssignee
          {...{
            currentTicketData,
            handleAssignee,
            setIsModalOpen,
            showNotification,
          }}
        />
      </CommonModal>
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
            placeholder: intl.formatMessage({
              id: "label.search_by_name_or_registration_no",
            }),
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
