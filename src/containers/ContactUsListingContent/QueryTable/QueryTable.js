import React, { useContext, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";

import CustomLoader from "../../../components/CustomLoader/CustomLoader";
import ErrorMessageBox from "../../../components/ErrorMessageBox";
import TableWithSearchAndFilters from "../../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useFetch from "../../../core/hooks/useFetch";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import useMarkedQueryAsAnweredApi from "../../../services/api-services/Queries/useMarkedQueryAsAnweredApi";
import useShowNotification from "../../../core/hooks/useShowNotification";
import { getTicketOrQueryColumn } from "../ContactUsListingContentConfig";
import { ADMIN_ROUTE, QUERY_END_POINT } from "../../../constant/apiEndpoints";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
} from "../../../constant/constant";
import styles from "../ContactUsListingContent.module.scss";

const QueryTable = ({
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

  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: ADMIN_ROUTE + QUERY_END_POINT,
    otherOptions: { skipApiCallOnMount: true },
  });
  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }
  const { markedQueryAsAnswered, isLoading: isMarkingQueryAsAnswered } =
    useMarkedQueryAsAnweredApi();
  const debounceSearch = useMemo(() => _.debounce(fetchData, 300), []);

  const { showNotification, notificationContextHolder } = useShowNotification();

  const onSuccessfullUpdateQueryStatus = () => {
    const requestedParams = {
      perPage: pageSize,
      page: currentPage,
      q: searchedValue,
    };
    fetchData(requestedParams);
  };

  const columns = getTicketOrQueryColumn(
    currentActiveTab,
    intl,
    getImage,
    navigate,
    renderColumn,
    markedQueryAsAnswered,
    onSuccessfullUpdateQueryStatus,
    (errorText) => showNotification(errorText, "error")
  );

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
  }, []);

  return (
    <>
      {notificationContextHolder}
      {isMarkingQueryAsAnswered && <CustomLoader />}
      {!isError && !isMarkingQueryAsAnswered && (
        <TableWithSearchAndFilters
          {...{
            current: currentPage,
            pageSize,
            searchedValue,
            handleOnUserSearch,
            columns,
            onChangePageSize,
            onChangeCurrentPage,
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

QueryTable.defaultProps = {
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

QueryTable.propTypes = {
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

export default QueryTable;
