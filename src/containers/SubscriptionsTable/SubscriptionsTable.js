import React, { useContext, useEffect, useState, useMemo } from "react";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";
import { TwoRow } from "../../core/layouts";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import SearchableComponent from "../../components/SearchableComponent";
import getSubscriptionsColumn from "./SubscriptionTableConfig";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../core/hooks/useFetch";
import { urlService } from "../../Utils/urlService";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { validateSearchTextLength } from "../../Utils/validations";
import { DEBOUNCE_TIME, PAGINATION_PROPERTIES } from "../../constant/constant";
import { ADMIN_ROUTE, SUBSCRIPTIONS } from "../../constant/apiEndpoints";
import styles from "./SubscriptionsTable.module.scss";

const SubscriptionsTable = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const [currentDataLength, setCurrentDataLength] = useState(0);
  const [current, setCurrent] = useState(
    getValidPageNumber(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE)
    )
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    )
  );
  const [searchedValue, setSearchedValue] = useState(
    urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY) || ""
  );

  const { renderColumn } = useRenderColumn();

  const {
    data: subscriptionListingData,
    error: subscriptionsListError,
    fetchData: getSubscriptionListing,
    isError: isErrorWhileGettingSubscriptions,
    isLoading: isGettingSubscriptions,
  } = useFetch({
    url: ADMIN_ROUTE + SUBSCRIPTIONS,
  });

  const debounceSearch = useMemo(() => {
    return _.debounce(getSubscriptionListing, DEBOUNCE_TIME);
  }, []);

  const getRequestedParams = ({ page, search, size }) => {
    return {
      perPage: size || pageSize,
      page: page || current,
      name: search || "",
    };
  };

  const goToSubscriptionDetails = () => {};

  const columns = getSubscriptionsColumn(
    intl,
    getImage,
    goToSubscriptionDetails,
    renderColumn
  );

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE, size);
    getSubscriptionListing({
      queryParamsObject: getRequestedParams({
        page: 1,
        search: validateSearchTextLength(searchedValue),
        size: +size,
      }),
    });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE,
      newPageNumber
    );

    getSubscriptionListing({
      queryParamsObject: getRequestedParams({
        page: newPageNumber,
        search: validateSearchTextLength(searchedValue),
      }),
    });
  };

  const handleOnUserSearch = (str) => {
    setCurrent(1);
    if (str?.trim()?.length > 2) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          search: validateSearchTextLength(str),
        }),
      });
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY, str);
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    }

    if (
      !str?.trim() &&
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY)
    ) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          search: "",
        }),
      });
      urlService.removeParam(PAGINATION_PROPERTIES.SEARCH_QUERY);
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    }
    setSearchedValue(str);
  };

  const handleTryAgain = () => {
    getSubscriptionListing({
      queryParamsObject: getRequestedParams({
        search: validateSearchTextLength(searchedValue),
      }),
    });
  };

  useEffect(() => {
    if (subscriptionListingData?.meta) {
      const { total } = subscriptionListingData?.meta;
      const numberOfPages = Math.ceil(total / pageSize);
      if (current > numberOfPages || current <= 0) {
        setCurrent(1);
        urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      }
    }
  }, [subscriptionListingData?.meta?.total]);

  useEffect(() => {
    const validPageSize = getValidPageSize(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    );
    const validPageNumber = getValidPageNumber(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE)
    );
    const defaultQueryParams = {
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: validPageNumber,
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: validPageSize,
    };
    urlService.setMultipleQueryStringValues(defaultQueryParams);
  }, []);

  useEffect(() => {
    return () => {
      setSearchedValue("");
    };
  }, []);

  return (
    <>
      {isGettingSubscriptions && <CustomLoader />}
      {isErrorWhileGettingSubscriptions && (
        <div className={styles.box}>
          <ErrorMessageBox
            onRetry={handleTryAgain}
            errorText={
              subscriptionsListError?.data?.message || subscriptionsListError
            }
            errorHeading={intl.formatMessage({ id: "label.error" })}
          />
        </div>
      )}
      {subscriptionListingData &&
        !isGettingSubscriptions &&
        !isErrorWhileGettingSubscriptions && (
          <TwoRow
            className={styles.mainContainer}
            topSection={
              <SearchableComponent
                {...{ searchedValue, handleOnUserSearch }}
                placeholder={intl.formatMessage({
                  id: "label.searchPackageName",
                })}
              />
            }
            bottomSection={
              <DataTable
                {...{
                  columns,
                  pageSize,
                  current,
                  currentDataLength,
                  onChangePageSize,
                  onChangeCurrentPage,
                }}
                currentDataLength={subscriptionListingData?.meta?.total}
                customContainerStyles={styles.customContainerStyles}
                originalData={subscriptionListingData?.records || []}
              />
            }
          />
        )}
    </>
  );
};

export default SubscriptionsTable;
