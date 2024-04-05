import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";

import CustomButton from "../../components/CustomButton";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import TableWithSearchAndFilters from "../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../core/hooks/useFetch";
import { getQueryColumn } from "./AllJobsTableConfig";
import useShowNotification from "../../core/hooks/useShowNotification";
import { urlService } from "../../Utils/urlService";
import { ADMIN_ROUTE, JOBS, SUMMARY } from "../../constant/apiEndpoints";
import { ReactComponent as ArrowDown } from "../../themes/base/assets/images/arrow-down.svg";
import {
  DEBOUNCE_TIME,
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
} from "../../constant/constant";
import { active_filter_options, approval_filter_options } from "./constants";
import { getValidFilter } from "../../constant/utils";
import { validateSearchTextLength } from "../../Utils/validations";
import styles from "./AllJobsTable.module.scss";

const AllJobsTable = ({
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
  const { navigateScreen: navigate } = useNavigateScreen();

  const [filterArray, setFilterArray] = useState(
    getValidFilter(urlService.getQueryStringValue(PAGINATION_PROPERTIES.FILTER))
  );

  const { showNotification, notificationContextHolder } = useShowNotification();

  const { data, error, fetchData, isError, isLoading } = useFetch({
    url: ADMIN_ROUTE + JOBS + SUMMARY,
    otherOptions: { skipApiCallOnMount: true },
  });

  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }

  const approvedNotApproved = approval_filter_options;
  const activeInactive = active_filter_options;

  const debounceSearch = useMemo(() => {
    return _.debounce(fetchData, DEBOUNCE_TIME);
  }, []);

  const getRequestedParams = ({ page, perPage, q, updatedFiltersValue }) => {
    return {
      perPage: perPage || pageSize,
      page: page || current,
      search: q || "",
      status: JSON.stringify(updatedFiltersValue?.["1"]),
      approved: JSON.stringify(updatedFiltersValue?.["2"]),
    };
  };

  const onRetry = () => {
    const requestedParams = getRequestedParams({
      updatedFiltersValue: filterArray,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const columns = getQueryColumn({
    intl,
    getImage,
    navigate,
    renderColumn,
  });

  const handleOnUserSearch = (str) => {
    setSearchedValue(str);
    if (str?.trim()?.length > 2) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          q: validateSearchTextLength(str),
        }),
      });
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY, str);
    }
    if (
      !str?.trim() &&
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY)
    ) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          q: "",
        }),
      });
      urlService.removeParam(PAGINATION_PROPERTIES.SEARCH_QUERY);
    }
  };

  const onChangePageSize = (size) => {
    setPageSize(size);
    setCurrent(1);
    const queryParams = {
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: size,
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: 1,
    };
    urlService.setMultipleQueryStringValues(queryParams);
    const requestedParams = getRequestedParams({
      perPage: size,
      page: 1,
      updatedFiltersValue: filterArray,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE,
      newPageNumber
    );
    const requestedParams = getRequestedParams({
      page: newPageNumber,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const handleOnFilterApply = (updatedFiltersValue) => {
    setCurrent(1);
    let arrayAsString = filterArray?.length ? JSON.stringify(filterArray) : "";

    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.FILTER,
      encodeURIComponent(arrayAsString)
    );
    const requestedParams = getRequestedParams({
      updatedFiltersValue,
      page: 1,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const approvedNotApprovedOptions = useMemo(() => {
    return approvedNotApproved?.map((item) => ({
      optionId: item.id,
      str: item.name,
    }));
  }, [approvedNotApproved]);

  const activeInactiveOptions = useMemo(() => {
    return activeInactive?.map((item) => ({
      optionId: item.id,
      str: item.name,
    }));
  }, [activeInactive]);

  const filterOptions = [
    {
      id: 1,
      name: "Active/Inactive",
      isSelected: false,
      options: activeInactiveOptions,
    },
    {
      id: 2,
      name: "Approved/Not Approved",
      isSelected: false,
      options: approvedNotApprovedOptions,
    },
  ];

  const resetQueryListingData = (ticketsResult) => {
    if (ticketsResult?.meta?.total) {
      const totalRecords = ticketsResult?.meta?.total;
      const numberOfPages = Math.ceil(totalRecords / pageSize);
      if (current > numberOfPages) {
        fetchData({
          queryParamsObject: getRequestedParams({
            page: 1,
            search: searchedValue,
            updatedFiltersValue: filterArray,
          }),
        });
        urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        setCurrent(1);
      }
    }
  };

  useEffect(() => {
    let arrayAsString = JSON.stringify(filterArray);
    const defaultQueryParams = {
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: current,
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: pageSize,
      [PAGINATION_PROPERTIES.FILTER]: encodeURIComponent(arrayAsString),
      [PAGINATION_PROPERTIES.SEARCH_QUERY]: searchedValue,
    };
    urlService.setMultipleQueryStringValues(defaultQueryParams);

    const requestedParams = getRequestedParams({
      updatedFiltersValue: filterArray,
      q: searchedValue,
    });
    fetchData({
      queryParamsObject: requestedParams,
      onSuccessCallback: resetQueryListingData,
    });
  }, []);

  const downloadJobsList = (dataToBeDownloaded) => {};

  const renderDownloadBtn = () => {
    return (
      <CustomButton
        btnText={intl.formatMessage({ id: "label.downloadJobList" })}
        IconElement={ArrowDown}
        iconStyles={styles.btnIconStyles}
        customStyle={styles.greyBtnCustomStyles}
        onClick={() => downloadJobsList(data?.records)}
      />
    );
  };

  return (
    <>
      {notificationContextHolder}
      {!isError && (
        <TableWithSearchAndFilters
          {...{
            columns,
            current,
            filterArray,
            filterOptions,
            handleOnUserSearch,
            pageSize,
            searchedValue,
            setFilterArray,
            onChangeCurrentPage,
            onChangePageSize,
            placeholder: intl.formatMessage({
              id: "label.designation_or_job_id",
            }),
          }}
          isLoading={isLoading}
          rightSection={renderDownloadBtn()}
          data={data?.records}
          currentDataLength={data?.meta?.total}
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

AllJobsTable.defaultProps = {
  pageSize: DEFAULT_PAGE_SIZE,
  queryListingProps: {},
  setCurrent: () => {},
  setPageSize: () => {},
  ticketListingProps: {},
  searchedValue: "",
  setSearchedValue: () => {},
};

AllJobsTable.propTypes = {
  current: PropTypes.number,
  pageSize: PropTypes.number,
  queryListingProps: PropTypes.object,
  setCurrent: PropTypes.func,
  setPageSize: PropTypes.func,
  ticketListingProps: PropTypes.object,
  searchedValue: PropTypes.string,
  setSearchedValue: PropTypes.func,
};

export default AllJobsTable;
