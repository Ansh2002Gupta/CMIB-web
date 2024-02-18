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
import { getTicketOrQueryColumn } from "./QueriesTableConfig";
import {
  convertPermissionFilter,
  getSortQueryParamsValue,
  getValidFilter,
} from "../../constant/utils";
import { ADMIN_ROUTE, QUERIES_END_POINT } from "../../constant/apiEndpoints";
import {
  DEFAULT_PAGE_SIZE,
  NUMBER_OF_CHIPS_TO_SHOW,
  PAGINATION_PROPERTIES,
  SORTING_QUERY_PARAMS,
} from "../../constant/constant";
import styles from "./QueryTable.module.scss";

const QueryTable = ({
  current,
  pageSize,
  setCurrent,
  setPageSize,
  searchedValue,
  setSearchedValue,
}) => {
  // third party hooks
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();

  // useState hooks
  const [sortByCreatedAt, setSortByCreatedAt] = useState({
    ...getSortQueryParamsValue({
      direction: searchParams?.get(SORTING_QUERY_PARAMS?.SORTED_DIRECTION),
      keyName: searchParams?.get(SORTING_QUERY_PARAMS?.SORTED_KEY),
      stateKeyName: "created_at",
    }),
  });
  const [sortByName, setSortByName] = useState({
    ...getSortQueryParamsValue({
      direction: searchParams?.get(SORTING_QUERY_PARAMS?.SORTED_DIRECTION),
      keyName: searchParams?.get(SORTING_QUERY_PARAMS?.SORTED_KEY),
      stateKeyName: "name",
    }),
  });
  const [
    selectedQueriesToBeMarkedAsAnswered,
    setSelctedQueriesToBeMarkedAsAnswered,
  ] = useState([]);
  const [filterArray, setFilterArray] = useState(
    getValidFilter(searchParams.get(PAGINATION_PROPERTIES.FILTER))
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSingleSelect, setIsSingleSelect] = useState(false);

  // custom hooks
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
  const debounceSearch = useMemo(() => _.debounce(fetchData, 300), []);

  // funtions related to sorting
  const getSortProperties = () => {
    if (sortByCreatedAt?.isDisable) {
      return {
        sortField: "name",
        sortDirection: sortByName?.direction,
      };
    }
    return {
      sortField: "created_at",
      sortDirection: sortByCreatedAt?.direction,
    };
  };

  // functions
  // Query selections/toggle related functions
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

  const getRequestedParams = ({ page, perPage, q, queryType }) => {
    return {
      perPage: perPage || pageSize,
      page: page || current,
      q: q || searchedValue,
      queryType: queryType || filterArray["1"],
    };
  };

  const onRetry = () => {
    fetchData({
      queryParamsObject: {
        ...getRequestedParams({}),
        ...getSortProperties(),
      },
    });
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

  const columns = getTicketOrQueryColumn({
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
    fetchData,
    paginationAndSearchProperties: {
      pageSize,
      current,
      searchedValue,
      filterArray,
    },
    setSortByName,
    setSortByCreatedAt,
    getSortProperties,
    sortByCreatedAt,
    sortByName,
    setSearchParams,
    setIsConfirmationModalOpen,
    toggleSelectAllItems,
    areAllItemsSelected,
    areSomeItemsSelected,
  });

  // Pagination, search and filter related functions
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
    debounceSearch({
      queryParamsObject: {
        ...getRequestedParams({ q: str }),
        ...getSortProperties(),
      },
    });
  };

  const onChangePageSize = (size) => {
    setPageSize(size);
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    fetchData({
      queryParamsObject: {
        ...getRequestedParams({ perPage: size, page: 1 }),
        ...getSortProperties(),
      },
    });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
    fetchData({
      queryParamsObject: {
        ...getRequestedParams({ page: newPageNumber }),
        ...getSortProperties(),
      },
    });
  };

  const handleOnFilterApply = (updatedFiltersValue) => {
    let arrayAsString = JSON.stringify(updatedFiltersValue);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.FILTER, encodeURIComponent(arrayAsString));
      return prev;
    });

    setFilterArray(() => {
      const newFilterArray = updatedFiltersValue;

      fetchData({
        queryParamsObject: {
          ...getRequestedParams({ queryType: newFilterArray["1"] || [] }),
          ...getSortProperties(),
        },
      });

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
        if (index <= NUMBER_OF_CHIPS_TO_SHOW) {
          return (
            <Chip
              bgColor={styles.chipBg}
              textColor={styles.chipText}
              label={item?.readable_id}
            />
          );
        } else if (index === NUMBER_OF_CHIPS_TO_SHOW + 1) {
          const totalLeft = queriesSelectedAndMarkedForAnswer?.length - 15;
          return (
            <Chip
              bgColor={styles.chipBg}
              textColor={styles.chipText}
              label={`+${totalLeft}`}
            />
          );
        }
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
        fetchData({
          queryParamsObject: {
            ...getRequestedParams({ page: 1 }),
            ...getSortProperties(),
          },
        });
      }
    }
  }, [data?.meta?.total]);

  useEffect(() => {
    let arrayAsString = JSON.stringify(filterArray);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, current);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, pageSize);
      prev.set(
        SORTING_QUERY_PARAMS.SORTED_DIRECTION,
        getSortProperties()?.sortDirection
      );
      prev.set(SORTING_QUERY_PARAMS.SORTED_KEY, getSortProperties()?.sortField);
      prev.set(PAGINATION_PROPERTIES.FILTER, encodeURIComponent(arrayAsString));
      searchedValue &&
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, searchedValue);
      return prev;
    });

    fetchData({
      queryParamsObject: {
        ...getRequestedParams({}),
        ...getSortProperties(),
      },
    });
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
          }}
          arrayContainingSelectedRow={selectedQueriesToBeMarkedAsAnswered}
          isLoading={isLoading}
          data={data?.records}
          currentDataLength={data?.meta?.total}
          filterPropertiesArray={convertPermissionFilter(
            queryTypesData || [],
            "Query-Types",
            "queries_count"
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
  current: 1,
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
