import React, { useContext, useEffect, useState, useMemo } from "react";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";
import { TwoRow } from "../../core/layouts";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import SearchableComponent from "../../components/SearchableComponent";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import getCompaniesColumn from "./ManageCompanyTableConfig";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../core/hooks/useFetch";
import { urlService } from "../../Utils/urlService";
import {
  getValidPageNumber,
  getValidPageSize,
  getValidFilter,
} from "../../constant/utils";
import { validateSearchTextLength } from "../../Utils/validations";
import {
  DEBOUNCE_TIME,
  PAGINATION_PROPERTIES,
  SLIDER_FILTER_KEY,
} from "../../constant/constant";
import {
  ADMIN_ROUTE,
  COMPANY_ROUTE,
  MANAGE,
} from "../../constant/apiEndpoints";
import styles from "./ManageCompiesTable.module.scss";
import { useNavigate } from "react-router-dom";

const ManageCompaniesTable = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const [currentDataLength, setCurrentDataLength] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortFilter, setSortFilter] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filterArray, setFilterArray] = useState(
    getValidFilter(urlService.getQueryStringValue(PAGINATION_PROPERTIES.FILTER))
  );

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

  const filterPropertiesArray = [
    {
      id: SLIDER_FILTER_KEY.JOBS_APPROVE,
      name: intl.formatMessage({ id: "label.jobsApprovedTillDate" }),
      isSelected: false,
      isSlider: true,
    },
    {
      id: SLIDER_FILTER_KEY?.POSTED_OFFERS,
      name: intl.formatMessage({ id: "label.postsOfferedApplicantsTillDate" }),
      isSelected: false,
      isSlider: true,
    },
  ];

  const navigate = useNavigate();

  const { renderColumn } = useRenderColumn();

  const {
    data: companyListingData,
    error: companyListError,
    fetchData: getCompanyListing,
    isError: isErrorWhileGettingCompanies,
    isLoading: isGettingCompanies,
  } = useFetch({
    url: ADMIN_ROUTE + MANAGE + "/" + COMPANY_ROUTE,
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
        sortDirection: sortFilter?.sortDirection,
        sortField: sortFilter?.sortField,
        jobs_approved_till_date: filterArray[SLIDER_FILTER_KEY.JOBS_APPROVE],
        posts_offered_to_candidate_till_date:
          filterArray[SLIDER_FILTER_KEY.POSTED_OFFERS],
      }),
    });
  }, []);

  const onFilterApply = (currentFilterStatus) => {
    setFilterArray(currentFilterStatus);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.FILTER,
      encodeURIComponent(JSON.stringify(currentFilterStatus))
    );
    getCompanyListing({
      queryParamsObject: getRequestedParams({
        search: validateSearchTextLength(searchedValue),
        jobs_approved_till_date:
          currentFilterStatus[SLIDER_FILTER_KEY.JOBS_APPROVE],
        posts_offered_to_candidate_till_date:
          currentFilterStatus[SLIDER_FILTER_KEY.POSTED_OFFERS],
      }),
    });
  };

  const debounceSearch = useMemo(() => {
    return _.debounce(getCompanyListing, DEBOUNCE_TIME);
  }, []);

  const handleSorting = (sortDetails) => {
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    const requestedParams = getRequestedParams({
      page: 1,
      search: searchedValue,
      sortDirection: sortDetails?.sortDirection,
      sortField: sortDetails?.sortDirection ? sortDetails?.sortField : "",
      jobs_approved_till_date: filterArray[SLIDER_FILTER_KEY.JOBS_APPROVE],
      posts_offered_to_candidate_till_date:
        filterArray[SLIDER_FILTER_KEY.POSTED_OFFERS],
    });
    getCompanyListing({ queryParamsObject: requestedParams });
    if (sortDetails.sortDirection) {
      setSortFilter(sortDetails);
      return;
    }
    setSortFilter({ sortDirection: "", sortField: "" });
  };

  const getRequestedParams = ({
    page,
    search,
    size,
    sortDirection,
    sortField,
    jobs_approved_till_date,
    posts_offered_to_candidate_till_date,
  }) => {
    return {
      perPage: size || pageSize,
      page: page || current,
      q: search || "",
      sortOrder: sortDirection,
      sortBy: sortField,
      jobs_approved_till_date: jobs_approved_till_date || [],
      posts_offered_to_candidate_till_date:
        posts_offered_to_candidate_till_date || [],
    };
  };

  const goToCompanyDetailsPage = (data) => {
    const companyId = data?.id;
    navigate(`company-details/${companyId}`);
  };

  const columns = getCompaniesColumn({
    intl,
    getImage,
    goToCompanyDetailsPage,
    handleSorting,
    setSortBy,
    sortBy,
    renderColumn,
  });

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
        sortDirection: sortFilter?.sortDirection,
        sortField: sortFilter?.sortField,
        jobs_approved_till_date: filterArray[SLIDER_FILTER_KEY.JOBS_APPROVE],
        posts_offered_to_candidate_till_date:
          filterArray[SLIDER_FILTER_KEY.POSTED_OFFERS],
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
        sortDirection: sortFilter?.sortDirection,
        sortField: sortFilter?.sortField,
        jobs_approved_till_date: filterArray[SLIDER_FILTER_KEY.JOBS_APPROVE],
        posts_offered_to_candidate_till_date:
          filterArray[SLIDER_FILTER_KEY.POSTED_OFFERS],
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
          sortDirection: sortFilter?.sortDirection,
          sortField: sortFilter?.sortField,
          jobs_approved_till_date: filterArray[SLIDER_FILTER_KEY.JOBS_APPROVE],
          posts_offered_to_candidate_till_date:
            filterArray[SLIDER_FILTER_KEY.POSTED_OFFERS],
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
          jobs_approved_till_date: filterArray[SLIDER_FILTER_KEY.JOBS_APPROVE],
          posts_offered_to_candidate_till_date:
            filterArray[SLIDER_FILTER_KEY.POSTED_OFFERS],
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
        sortDirection: sortFilter?.sortDirection,
        sortField: sortFilter?.sortField,
        jobs_approved_till_date: filterArray[SLIDER_FILTER_KEY.JOBS_APPROVE],
        posts_offered_to_candidate_till_date:
          filterArray[SLIDER_FILTER_KEY.POSTED_OFFERS],
      }),
    });
  };

  useEffect(() => {
    if (companyListingData?.meta) {
      const { total } = companyListingData?.meta;
      const numberOfPages = Math.ceil(total / pageSize);
      if (current > numberOfPages || current <= 0) {
        setCurrent(1);
        urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        getCompanyListing({
          queryParamsObject: getRequestedParams({
            page: 1,
            search: validateSearchTextLength(searchedValue),
            size: +pageSize,
            sortDirection: sortFilter?.sortDirection,
            sortField: sortFilter?.sortField,
            jobs_approved_till_date:
              filterArray[SLIDER_FILTER_KEY.JOBS_APPROVE],
            posts_offered_to_candidate_till_date:
              filterArray[SLIDER_FILTER_KEY.POSTED_OFFERS],
          }),
        });
      }
    }
  }, [companyListingData?.meta?.total]);

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
      {companyListingData &&
        !isGettingCompanies &&
        !isErrorWhileGettingCompanies && (
          <TwoRow
            className={styles.mainContainer}
            topSection={
              <div className={styles.filterContainer}>
                <SearchableComponent
                  customSearchBar={styles.customSearchBar}
                  {...{ searchedValue, handleOnUserSearch }}
                  placeholder={intl.formatMessage({
                    id: "label.searchByCompanyUsername",
                  })}
                />
                <div style={{ flex: 2 }}>
                  <SearchFilter
                    {...{
                      filterPropertiesArray,
                      filterArray,
                      showFilters,
                      onFilterApply,
                      setShowFilters,
                    }}
                  />
                </div>
              </div>
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
                currentDataLength={companyListingData?.meta?.total}
                customContainerStyles={styles.customContainerStyles}
                originalData={companyListingData?.records || []}
              />
            }
          />
        )}
    </>
  );
};

export default ManageCompaniesTable;
