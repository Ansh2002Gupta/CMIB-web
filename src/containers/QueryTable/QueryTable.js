import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";

import Chip from "../../components/Chip/Chip";
import CustomModal from "../../components/CustomModal/CustomModal";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import TableWithSearchAndFilters from "../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useQueriesTypesApi from "../../services/api-services/Queries/useQueriesTypesApi";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../core/hooks/useFetch";
import useMarkQueriesAsAnswerApi from "../../services/api-services/Queries/useMarkQueriesAsAnswerApi";
import useShowNotification from "../../core/hooks/useShowNotification";
import { getQueryColumn } from "./QueriesTableConfig";
import { ADMIN_ROUTE, QUERIES_END_POINT } from "../../constant/apiEndpoints";
import {
  DEBOUNCE_TIME,
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  SORTING_QUERY_PARAMS,
} from "../../constant/constant";
import { convertPermissionFilter, getValidFilter } from "../../constant/utils";
import { validateSearchTextLength } from "../../Utils/validations";
import styles from "./QueryTable.module.scss";

const QueryTable = ({
  current,
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

  const [sortDirection, setSortDirection] = useState(
    searchParams?.get(SORTING_QUERY_PARAMS?.SORTED_DIRECTION)
  );
  const [sortBy, setSortBy] = useState(
    searchParams?.get(SORTING_QUERY_PARAMS?.SORTED_KEY)
  );

  const [
    selectedQueriesToBeMarkedAsAnswered,
    setSelctedQueriesToBeMarkedAsAnswered,
  ] = useState([]);
  const [filterArray, setFilterArray] = useState(
    getValidFilter(searchParams.get(PAGINATION_PROPERTIES.FILTER))
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSingleSelect, setIsSingleSelect] = useState(false);

  const { showNotification, notificationContextHolder } = useShowNotification();

  const { data: queryTypesData, getQueriesTypes } = useQueriesTypesApi();

  const { handleMarkQueriesAsAnswered, isLoading: isMarkingQueryAsAnswered } =
    useMarkQueriesAsAnswerApi();

  const { data, error, fetchData, isError, isLoading } = useFetch({
    url: ADMIN_ROUTE + QUERIES_END_POINT,
    otherOptions: { skipApiCallOnMount: true },
  });
  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }

  const debounceSearch = useMemo(() => {
    return _.debounce(fetchData, DEBOUNCE_TIME);
  }, []);

  let queriesSelectedAndMarkedForAnswer = data?.records?.filter(
    (item) =>
      item?.status?.toLowerCase() === "answered" &&
      selectedQueriesToBeMarkedAsAnswered.includes(item?.id)
  );

  const allCurrentPageSelectedQueries = data?.records?.filter((item) =>
    selectedQueriesToBeMarkedAsAnswered.includes(item?.id)
  );

  const allQueryAreAlreadyAnswered =
    queriesSelectedAndMarkedForAnswer?.length ===
      allCurrentPageSelectedQueries?.length &&
    allCurrentPageSelectedQueries?.length > 0;

  const getRequestedParams = ({
    page,
    perPage,
    q,
    queryType,
    sortField,
    sortOrder,
  }) => {
    return {
      perPage: perPage || pageSize,
      page: page || current,
      q: q || "",
      queryType: queryType || filterArray["1"],
      sortDirection: sortOrder,
      sortField: sortField,
    };
  };

  const onRetry = () => {
    const requestedParams = getRequestedParams({
      sortOrder: sortDirection,
      sortField: sortBy,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const handleMarkQuery = () => {
    if (allQueryAreAlreadyAnswered) {
      setIsConfirmationModalOpen(false);
      return;
    }
    handleMarkQueriesAsAnswered({
      payload: {
        query_id: selectedQueriesToBeMarkedAsAnswered,
      },
      onSuccessCallback: () => {
        setIsConfirmationModalOpen(false);
        onRetry();
        setSelctedQueriesToBeMarkedAsAnswered([]);
      },
      onErrorCallback: (errorString) => {
        setIsConfirmationModalOpen(false);
        showNotification(errorString, "error");
      },
    });
  };

  const checkAreAllQueryOfCurrentPageSelected = (checkFor) => {
    const currentPageSelectedQueries = data?.records?.filter((query) => {
      return selectedQueriesToBeMarkedAsAnswered?.includes(query?.id);
    });

    if (checkFor === "all") {
      return (
        currentPageSelectedQueries?.length === data?.records?.length &&
        data?.records?.length !== 0
      );
    }

    if (checkFor === "some") {
      return (
        currentPageSelectedQueries?.length !== 0 &&
        currentPageSelectedQueries?.length !== data?.records?.length
      );
    }
  };

  const areAllItemsSelected = checkAreAllQueryOfCurrentPageSelected("all");
  const areSomeItemsSelected = checkAreAllQueryOfCurrentPageSelected("some");

  const toggleSelectAllItems = () => {
    const currentPageIdsArray = data?.records?.map((query) => query?.id);
    if (areAllItemsSelected) {
      const updatedData = selectedQueriesToBeMarkedAsAnswered?.filter(
        (queryId) => !currentPageIdsArray?.includes(queryId)
      );
      setSelctedQueriesToBeMarkedAsAnswered(updatedData);
      return;
    }
    setSelctedQueriesToBeMarkedAsAnswered((prev) => [
      ...prev,
      ...currentPageIdsArray,
    ]);
  };

  const toggleSelectedQueriesId = (queryId) => {
    if (selectedQueriesToBeMarkedAsAnswered?.includes(queryId)) {
      const updatedData = selectedQueriesToBeMarkedAsAnswered?.filter(
        (val) => val !== queryId
      );
      setSelctedQueriesToBeMarkedAsAnswered(updatedData);
      return;
    }
    setSelctedQueriesToBeMarkedAsAnswered((prev) => [...prev, queryId]);
  };

  const handleSorting = ({ sortField, sortDirection }) => {
    const newSortDirection = sortField === sortBy ? sortDirection : "asc";

    const requestedParams = getRequestedParams({
      page: 1,
      sortOrder: newSortDirection,
      sortField: newSortDirection ? sortField : "",
      q: searchedValue,
    });

    setSortBy(newSortDirection ? sortField : "");
    setSortDirection(newSortDirection);

    setSearchParams((prev) => {
      newSortDirection &&
        prev.set(SORTING_QUERY_PARAMS.SORTED_DIRECTION, newSortDirection);
      !newSortDirection && prev.delete(SORTING_QUERY_PARAMS.SORTED_DIRECTION);
      sortField && prev.set(SORTING_QUERY_PARAMS.SORTED_KEY, sortField);
      !newSortDirection && prev.delete(SORTING_QUERY_PARAMS.SORTED_KEY);
      return prev;
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const columns = getQueryColumn({
    intl,
    getImage,
    navigate,
    renderColumn,
    queriesColumnProperties: {
      setIsSingleSelect,
      selectedItemsList: selectedQueriesToBeMarkedAsAnswered,
      setSelectedItemsList: setSelctedQueriesToBeMarkedAsAnswered,
      toggleSelectedQueriesId,
      handleMarkMutipleQueriesAsAnswered: () =>
        setIsConfirmationModalOpen(true),
    },
    handleSorting,
    sortBy: sortDirection,
    setSortBy: setSortDirection,
    sortField: sortBy,
    setSearchParams,
    setIsConfirmationModalOpen,
    toggleSelectAllItems,
    areAllItemsSelected,
    areSomeItemsSelected,
  });

  // Pagination, search and filter related functions
  const handleOnUserSearch = (str) => {
    setSearchedValue(str);
    if (str?.trim()?.length > 2) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          q: validateSearchTextLength(str),
        }),
      });
      setSearchParams((prev) => {
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, str);
        return prev;
      });
    }
    if (!str?.trim() && searchParams.get(PAGINATION_PROPERTIES.SEARCH_QUERY)) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          q: "",
        }),
      });
      setSearchParams((prev) => {
        prev.delete(PAGINATION_PROPERTIES.SEARCH_QUERY);
        return prev;
      });
    }
  };

  const onChangePageSize = (size) => {
    setPageSize(size);
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    const requestedParams = getRequestedParams({
      perPage: size,
      page: 1,
      sortOrder: sortDirection,
      sortField: sortBy,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
    const requestedParams = getRequestedParams({
      page: newPageNumber,
      sortOrder: sortDirection,
      sortField: sortBy,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
    setSelctedQueriesToBeMarkedAsAnswered([]);
  };

  const handleOnFilterApply = (updatedFiltersValue) => {
    let arrayAsString = JSON.stringify(updatedFiltersValue);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.FILTER, encodeURIComponent(arrayAsString));
      return prev;
    });

    setFilterArray(() => {
      const newFilterArray = updatedFiltersValue;
      const requestedParams = getRequestedParams({
        queryType: newFilterArray["1"] || [],
        sortOrder: sortDirection,
        sortField: sortBy,
        q: searchedValue,
      });
      fetchData({ queryParamsObject: requestedParams });

      return newFilterArray;
    });
  };

  // MODAL PROPERTIES
  const getModalProperties = () => {
    if (allQueryAreAlreadyAnswered) {
      return {
        currentModalHeading: "allSelectedQueriesAreAlreadyMarked",
        actionBtnText: "okay",
        currentModalSubHeading: "followingQueriesAreMarkedAnAnswered",
        cancelBtnText: "",
      };
    }
    if (queriesSelectedAndMarkedForAnswer?.length) {
      return {
        currentModalHeading:
          "someQueriesAreMarkedAsAnsweredContinueMaringOthers",
        actionBtnText: "okay",
        currentModalSubHeading: "followingQueriesAreMarkedAnAnswered",
        cancelBtnText: "cancel",
      };
    }

    return {
      currentModalHeading: "markQueriesAsAnswered",
      actionBtnText: "markAsAnswered",
      currentModalSubHeading: "areYouSureYouWantToMarkQueries",
      cancelBtnText: "cancel",
    };
  };

  let currentModalHeading = getModalProperties()?.currentModalHeading;
  let actionBtnText = getModalProperties()?.actionBtnText;
  let currentModalSubHeading = getModalProperties()?.currentModalSubHeading;
  let cancelBtnText = getModalProperties()?.cancelBtnText
    ? intl.formatMessage({ id: `label.cancel` })
    : "";
  let modalIcon =
    queriesSelectedAndMarkedForAnswer?.length === 0
      ? getImage("CircleCheck")
      : "";
  let currentModalChildren = (
    <div className={styles.chipContainer}>
      {queriesSelectedAndMarkedForAnswer?.map((item, index) => {
        return (
          <Chip
            bgStyles={styles.chipBg}
            textStyles={styles.chipText}
            label={item?.readable_id}
            key={index}
          />
        );
      })}
    </div>
  );

  const handleOnModalCancel = () => {
    if (isSingleSelect) {
      setSelctedQueriesToBeMarkedAsAnswered([]);
      setIsSingleSelect(false);
    }
    setIsConfirmationModalOpen(false);
  };

  // useEffects hooks
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
        const requestedParams = getRequestedParams({
          page: 1,
          sortOrder: sortDirection,
          sortField: sortBy,
          q: searchedValue,
        });
        fetchData({ queryParamsObject: requestedParams });
      }
    }
  }, [data?.meta?.total]);

  useEffect(() => {
    let arrayAsString = JSON.stringify(filterArray);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, current);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, pageSize);
      sortDirection &&
        prev.set(SORTING_QUERY_PARAMS.SORTED_DIRECTION, sortDirection);
      sortBy && prev.set(SORTING_QUERY_PARAMS.SORTED_KEY, sortBy);
      prev.set(PAGINATION_PROPERTIES.FILTER, encodeURIComponent(arrayAsString));
      searchedValue &&
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, searchedValue);
      return prev;
    });
    const requestedParams = getRequestedParams({
      sortOrder: sortDirection,
      sortField: sortBy,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
    getQueriesTypes({});
  }, []);

  return (
    <>
      {notificationContextHolder}
      {
        <CustomModal
          btnText={intl.formatMessage({ id: `label.${actionBtnText}` })}
          headingText={intl.formatMessage({
            id: `label.${currentModalHeading}`,
          })}
          imgElement={modalIcon}
          isOpen={isConfirmationModalOpen}
          onBtnClick={handleMarkQuery}
          onCancel={handleOnModalCancel}
          subHeadingText={intl.formatMessage({
            id: `label.${currentModalSubHeading}`,
          })}
          cancelBtnText={cancelBtnText}
          content={currentModalChildren}
        />
      }
      {!isError && (
        <TableWithSearchAndFilters
          {...{
            columns,
            current,
            filterArray,
            handleOnUserSearch,
            pageSize,
            searchedValue,
            setFilterArray,
            onChangeCurrentPage,
            onChangePageSize,
            placeholder: intl.formatMessage({
              id: "label.query_search_placeholder",
            }),
          }}
          arrayContainingSelectedRow={selectedQueriesToBeMarkedAsAnswered}
          isLoading={isLoading}
          data={data?.records}
          currentDataLength={data?.meta?.total}
          filterPropertiesArray={convertPermissionFilter(
            queryTypesData || [],
            "Query Type"
          )}
          onFilterApply={handleOnFilterApply}
        />
      )}
      {isError && (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            {...{ onRetry }}
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
  pageSize: PropTypes.number,
  queryListingProps: PropTypes.object,
  setCurrent: PropTypes.func,
  setPageSize: PropTypes.func,
  ticketListingProps: PropTypes.object,
  searchedValue: PropTypes.string,
  setSearchedValue: PropTypes.func,
};

export default QueryTable;
