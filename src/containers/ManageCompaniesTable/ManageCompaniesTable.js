import React, { useContext, useEffect, useState, useMemo } from "react";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";
import { TwoRow } from "../../core/layouts";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import SearchableComponent from "../../components/SearchableComponent";
import getCompaniesColumn from "./ManageCompanyTableConfig";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../core/hooks/useFetch";
import { urlService } from "../../Utils/urlService";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { validateSearchTextLength } from "../../Utils/validations";
import { DEBOUNCE_TIME, PAGINATION_PROPERTIES } from "../../constant/constant";
import {
  APPROVED,
  ADMIN_ROUTE,
  COMPANY_ROUTE,
} from "../../constant/apiEndpoints";
import styles from "./ManageCompiesTable.module.scss";
import { useNavigate } from "react-router-dom";
import { COMPANIES_LIST } from "../../dummyData";

const ManageCompaniesTable = () => {
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
  const navigate = useNavigate();

  const { renderColumn } = useRenderColumn();

  const {
    data: companyListingData,
    error: companyListError,
    fetchData: getCompanyListing,
    isError: isErrorWhileGettingCompanies,
    isLoading: isGettingCompanies,
  } = useFetch({
    // url: ADMIN_ROUTE + "/" + COMPANY_ROUTE + APPROVED,
    url: ADMIN_ROUTE + "/subscriptions",
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    getCompanyListing({
      queryParamsObject: getRequestedParams({
        page: current,
        search: validateSearchTextLength(searchedValue),
        size: +pageSize,
      }),
    });
  }, []);

  const debounceSearch = useMemo(() => {
    return _.debounce(getCompanyListing, DEBOUNCE_TIME);
  }, []);

  const getRequestedParams = ({ page, search, size }) => {
    return {
      perPage: size || pageSize,
      page: page || current,
      name: search || "",
    };
  };

  const goToCompanyDetailsPage = (data) => {
    const subscriptionID = data?.id;
    navigate(`subscription-details/${subscriptionID}`);
  };

  const columns = getCompaniesColumn(
    intl,
    getImage,
    goToCompanyDetailsPage,
    renderColumn
  );

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE, size);
    getCompanyListing({
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

    getCompanyListing({
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
    getCompanyListing({
      queryParamsObject: getRequestedParams({
        search: validateSearchTextLength(searchedValue),
      }),
    });
  };

  useEffect(() => {
    if (COMPANIES_LIST?.meta) {
      const { total } = COMPANIES_LIST?.meta;
      const numberOfPages = Math.ceil(total / pageSize);
      if (current > numberOfPages || current <= 0) {
        setCurrent(1);
        urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        getCompanyListing({
          queryParamsObject: getRequestedParams({
            page: 1,
            search: validateSearchTextLength(searchedValue),
            size: +pageSize,
          }),
        });
      }
    }
  }, [COMPANIES_LIST?.meta?.total]);

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
      {isGettingCompanies && <CustomLoader />}
      {isErrorWhileGettingCompanies && (
        <div className={styles.box}>
          <ErrorMessageBox
            onRetry={handleTryAgain}
            errorText={companyListError?.data?.message || companyListError}
            errorHeading={intl.formatMessage({ id: "label.error" })}
          />
        </div>
      )}
      {COMPANIES_LIST &&
        !isGettingCompanies &&
        !isErrorWhileGettingCompanies && (
          <TwoRow
            className={styles.mainContainer}
            topSection={
              <SearchableComponent
                {...{ searchedValue, handleOnUserSearch }}
                placeholder={intl.formatMessage({
                  id: "label.searchByCompanyUsername",
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
                currentDataLength={COMPANIES_LIST?.meta?.total}
                customContainerStyles={styles.customContainerStyles}
                originalData={COMPANIES_LIST?.records || []}
              />
            }
          />
        )}
    </>
  );
};

export default ManageCompaniesTable;
