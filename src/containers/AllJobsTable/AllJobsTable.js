import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";

import Chip from "../../components/Chip/Chip";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomButton from "../../components/CustomButton";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import TableWithSearchAndFilters from "../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../core/hooks/useFetch";
import useMarkQueriesAsAnswerApi from "../../services/api-services/Queries/useMarkQueriesAsAnswerApi";
import { getQueryColumn } from "./AllJobsTableConfig";
import useShowNotification from "../../core/hooks/useShowNotification";
import { urlService } from "../../Utils/urlService";
import {
  ACTIVE_STATUS,
  ADMIN_ROUTE,
  APPROVAL,
  CORE_ROUTE,
  JOBS,
  QUERY_TYPE,
  STATUS,
  SUMMARY,
} from "../../constant/apiEndpoints";
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

  const [
    selectedQueriesToBeMarkedAsAnswered,
    setSelctedQueriesToBeMarkedAsAnswered,
  ] = useState([]);
  const [filterArray, setFilterArray] = useState(
    getValidFilter(urlService.getQueryStringValue(PAGINATION_PROPERTIES.FILTER))
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSelectedFromTick, setIsSelectedFromTick] = useState(false);

  const { showNotification, notificationContextHolder } = useShowNotification();

  const { handleMarkQueriesAsAnswered, isLoading: isMarkingQueryAsAnswered } =
    useMarkQueriesAsAnswerApi();

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

  let queriesSelectedAndMarkedForAnswer = data?.records?.filter((item) => {
    item?.status === 1 &&
      selectedQueriesToBeMarkedAsAnswered.includes(item?.id);
  });

  const allCurrentPageSelectedQueries = data?.records?.filter((item) =>
    selectedQueriesToBeMarkedAsAnswered.includes(item?.id)
  );

  const allQueryAreAlreadyAnswered =
    queriesSelectedAndMarkedForAnswer?.length ===
      allCurrentPageSelectedQueries?.length &&
    allCurrentPageSelectedQueries?.length > 0;

  const getRequestedParams = ({ page, perPage, q, updatedFiltersValue }) => {
    return {
      perPage: perPage || pageSize,
      page: page || current,
      q: q || "",
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
        setIsSelectedFromTick(false);
        onRetry();
        setSelctedQueriesToBeMarkedAsAnswered([]);
      },
      onErrorCallback: (errorString) => {
        setIsConfirmationModalOpen(false);
        setIsSelectedFromTick(false);
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

  const columns = getQueryColumn({
    intl,
    getImage,
    navigate,
    renderColumn,
    queriesColumnProperties: {
      isSelectedFromTick,
      setIsSelectedFromTick,
      selectedItemsList: selectedQueriesToBeMarkedAsAnswered,
      setSelectedItemsList: setSelctedQueriesToBeMarkedAsAnswered,
      toggleSelectedQueriesId,
      handleMarkMutipleQueriesAsAnswered: () =>
        setIsConfirmationModalOpen(true),
    },
    setIsConfirmationModalOpen,
    toggleSelectAllItems,
    areAllItemsSelected,
    areSomeItemsSelected,
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
    setSelctedQueriesToBeMarkedAsAnswered([]);
  };

  const handleOnFilterApply = (updatedFiltersValue) => {
    setCurrent(1);
    let arrayAsString = JSON.stringify(updatedFiltersValue);

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
            label={item?.readable_id || "-"}
            key={index}
          />
        );
      })}
    </div>
  );

  const handleOnModalCancel = () => {
    if (isSelectedFromTick) {
      setSelctedQueriesToBeMarkedAsAnswered([]);
      setIsSelectedFromTick(false);
    }
    setIsConfirmationModalOpen(false);
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

  const renderDownloadBtn = () => {
    return (
      <CustomButton
        btnText={intl.formatMessage({ id: "label.downloadJobList" })}
        IconElement={ArrowDown}
        iconStyles={styles.btnIconStyles}
        customStyle={styles.greyBtnCustomStyles}
      />
    );
  };

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
          arrayContainingSelectedRow={selectedQueriesToBeMarkedAsAnswered}
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
