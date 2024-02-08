import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";

import Chip from "../../../components/Chip/Chip";
import CustomModal from "../../../components/CustomModal/CustomModal";
import ErrorMessageBox from "../../../components/ErrorMessageBox";
import TableWithSearchAndFilters from "../../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useQueriesTypesApi from "../../../services/api-services/Queries/useQueriesTypesApi";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../../core/hooks/useFetch";
import useMarkQueriesAsAnswerApi from "../../../services/api-services/Queries/useMarkQueriesAsAnswerApi";
import { getTicketOrQueryColumn } from "../ContactUsListingContentConfig";
import {
  convertPermissionFilter,
  getValidFilter,
  getValidSortByValue,
} from "../../../constant/utils";
import { ADMIN_ROUTE, QUERIES_END_POINT } from "../../../constant/apiEndpoints";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  SORTING_QUERY_PARAMS,
  SORT_PROPERTIES,
  SORT_VALUES,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();

  const [sortedOrder, setSortedOrder] = useState({
    sortDirection: getValidSortByValue(
      searchParams.get(SORT_PROPERTIES.SORT_BY)
    ),
    sortKeyName: "created_at",
  });
  const [
    selctedQueriesToBeMarkedAsAnswered,
    setSelctedQueriesToBeMarkedAsAnswered,
  ] = useState([]);
  const [filterArray, setFilterArray] = useState(
    getValidFilter(searchParams.get(PAGINATION_PROPERTIES.FILTER))
  );

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const {
    data: queryTypesData,
    getQueriesTypes,
    isLoading: isGettingQueryTypes,
    error: errorWhileGettingQueryTypes,
  } = useQueriesTypesApi();

  // TODO: need to inetgrate this API
  const {
    markingQueryAsAnswerData,
    errorWhileMarkingQueryAsAnswered,
    apiStatus,
    handleMarkQueriesAsAnswered,
    isLoading: isMarkingQueryAsAnswered,
    // isSuccess,
    setErrorWhileMarkingQueryAsAnswered,
  } = useMarkQueriesAsAnswerApi();

  let sortArrowStyles = "";
  if (sortedOrder?.sortDirection === SORT_VALUES.ASCENDING) {
    sortArrowStyles = styles.upside;
  } else if (sortedOrder?.sortDirection === SORT_VALUES.DESCENDING) {
    sortArrowStyles = styles.downside;
  }

  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: ADMIN_ROUTE + QUERIES_END_POINT,
    otherOptions: { skipApiCallOnMount: true },
  });
  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }
  const debounceSearch = useMemo(() => _.debounce(fetchData, 300), []);

  const checkAreAllQueryOfCurrentPageSelected = () => {
    // selctedQueriesToBeMarkedAsAnswered?.length === data?.records?.length
    const currentPageSelectedQueries = data?.records?.filter((query) => {
      return selctedQueriesToBeMarkedAsAnswered?.includes(query?.id);
    });

    return currentPageSelectedQueries?.length === data?.records?.length;
  };

  const areAllItemsSelected = checkAreAllQueryOfCurrentPageSelected();

  const toggleSelectAllItems = () => {
    const currentPageIdsArray = data?.records?.map((query) => query?.id);
    if (areAllItemsSelected) {
      const updatedData = selctedQueriesToBeMarkedAsAnswered?.filter(
        (queryId) => !currentPageIdsArray?.includes(queryId)
      );
      console.log({currentPageIdsArray, updatedData, selctedQueriesToBeMarkedAsAnswered});
      setSelctedQueriesToBeMarkedAsAnswered(updatedData);
      return;
    }
    setSelctedQueriesToBeMarkedAsAnswered(prev => [...prev, ...currentPageIdsArray]);
  };

  const toggleSelectedQueriesId = (queryId) => {
    if (selctedQueriesToBeMarkedAsAnswered?.includes(queryId)) {
      const updatedData = selctedQueriesToBeMarkedAsAnswered?.filter(
        (val) => val !== queryId
      );
      setSelctedQueriesToBeMarkedAsAnswered(updatedData);
      return;
    }
    setSelctedQueriesToBeMarkedAsAnswered((prev) => [...prev, queryId]);
  };

  const columns = getTicketOrQueryColumn({
    type: currentActiveTab,
    intl,
    getImage,
    navigate,
    renderColumn,
    queriesColumnProperties: {
      sortArrowStyles,
      selectedItemsList: selctedQueriesToBeMarkedAsAnswered,
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
    },
    sortedOrder,
    setSortedOrder,
    setSearchParams,
    setIsConfirmationModalOpen,
    toggleSelectAllItems,
    areAllItemsSelected,
  });

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
    debounceSearch({ queryParamsObject: requestedParams });
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
    fetchData({ queryParamsObject: requestedParams });
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
    fetchData({ queryParamsObject: requestedParams });
  };

  const handleOnFilterApply = (updatedFiltersValue) => {
    let arrayAsString = JSON.stringify(updatedFiltersValue);
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.FILTER, encodeURIComponent(arrayAsString));
      return prev;
    });
    const requestedParams = {
      perPage: pageSize,
      page: current,
      q: searchedValue,
      "query-type": updatedFiltersValue,
    };
    fetchData({ queryParamsObject: requestedParams });
  };

  const handleOnReTry = () => {
    const requestedParams = {
      perPage: DEFAULT_PAGE_SIZE,
      page: 1,
      q: searchedValue,
    };
    fetchData({ queryParamsObject: requestedParams });
  };

  let queriesSelectedAndMarkedForAnswer = data?.records?.filter(
    (item) =>
      item?.status?.toLowerCase() === "answered" &&
      selctedQueriesToBeMarkedAsAnswered.includes(item?.id)
  );

  const allQueryAreAlreadyAnswered =
    queriesSelectedAndMarkedForAnswer?.length ===
      selctedQueriesToBeMarkedAsAnswered?.length &&
    selctedQueriesToBeMarkedAsAnswered?.length > 0;

  const getModalHeading = () => {
    if (allQueryAreAlreadyAnswered) {
      return "allSelectedQueriesAreAlreadyMarked";
    }
    if (queriesSelectedAndMarkedForAnswer?.length) {
      return "someQueriesAreMarkedAsAnsweredContinueMaringOthers";
    }

    return "markQueriesAsAnswered";
  };

  let actionBtnText = allQueryAreAlreadyAnswered
    ? intl.formatMessage({ id: "label.okay" })
    : intl.formatMessage({ id: "label.markAsAnswered" });

  let currentModalHeading = getModalHeading();

  const cancelBtnText = allQueryAreAlreadyAnswered ? "" : "cancel";
  let currentModalSubHeadin = allQueryAreAlreadyAnswered
    ? "followingQueriesAreMarkedAnAnswered"
    : "areYouSureYouWantToMarkQueries";
  let modalIcon =
    queriesSelectedAndMarkedForAnswer?.length === 0
      ? getImage("CircleCheck")
      : "";

  let currentModalChildren = (
    <div className={styles.chipContainer}>
      {queriesSelectedAndMarkedForAnswer?.map((item) => {
        return (
          <Chip
            bgColor={styles.chipBg}
            textColor={styles.chipText}
            label={item?.readable_id}
          />
        );
      })}
    </div>
  );

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
        fetchData({ queryParamsObject: requestedParams });
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
        sortedOrder.sortDirection
      );
      prev.set(PAGINATION_PROPERTIES.FILTER, encodeURIComponent(arrayAsString));
      prev.set(SORTING_QUERY_PARAMS.SORTED_KEY, sortedOrder.sortKeyName);
      searchedValue &&
        prev.set(PAGINATION_PROPERTIES.SEARCH_QUERY, searchedValue);
      return prev;
    });

    const requestedParams = {
      perPage: pageSize,
      page: current,
      q: searchedValue,
    };
    fetchData({ queryParamsObject: requestedParams });
    getQueriesTypes({});
  }, []);

  return (
    <>
      {
        <CustomModal
          btnText={actionBtnText}
          headingText={intl.formatMessage({
            id: `label.${currentModalHeading}`,
          })}
          imgElement={modalIcon}
          isOpen={isConfirmationModalOpen}
          onBtnClick={() => setIsConfirmationModalOpen(false)}
          onCancel={() => setIsConfirmationModalOpen(false)}
          subHeadingText={intl.formatMessage({
            id: `label.${currentModalSubHeadin}`,
          })}
          cancelBtnText={cancelBtnText}
          content={currentModalChildren}
        />
      }
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
            filterArray,
            setFilterArray,
          }}
          isLoading={isSuccess && !isLoading}
          data={data?.records}
          currentDataLength={data?.meta?.total}
          filterPropertiesArray={convertPermissionFilter(
            queryTypesData || [],
            "Query-Types"
          )}
          onFilterApply={handleOnFilterApply}
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
