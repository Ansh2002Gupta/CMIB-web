import { useContext, useState } from "react";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { getRegisteredCompanyColumn } from "../RegisteredCompanyConfig";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import { ThemeContext } from "../../../core/providers/theme";
import usePagination from "../../../core/hooks/usePagination";
import useHandleSearch from "../../../core/hooks/useHandleSearch";
import { urlService } from "../../../Utils/urlService";
import {
  getErrorMessage,
  getValidPageNumber,
  getValidPageSize,
} from "../../../constant/utils";
import {
  GENERIC_GET_API_FAILED_ERROR_MESSAGE,
  PAGINATION_PROPERTIES,
  TYPE,
} from "../../../constant/constant";
import useFetch from "../../../core/hooks/useFetch";
import {
  ADMIN_ROUTE,
  CORE_ROUTE,
  REGISTERED_COMPANIES,
  STATUS as APPROVAL_STATUS,
} from "../../../constant/apiEndpoints";

const useRegisteredCompany = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const [sortBy, setSortBy] = useState("");
  const [filterArray, setFilterArray] = useState({});
  const [sortFilter, setSortFilter] = useState({});

  const {
    data: registered_companies,
    fetchData: fetchCompaniesListing,
    error: errorCompaniesListing,
    isError: isErrorCompaniesListing,
    isLoading: isCompanyListingLoading,
  } = useFetch({
    url: ADMIN_ROUTE + REGISTERED_COMPANIES,
  });

  const {
    data: status,
    fetchData: fetchStatusData,
    error: errorStatus,
    isError: isErrorStatus,
    isLoading: isStatusLoading,
  } = useFetch({
    url: CORE_ROUTE + APPROVAL_STATUS + `?type=${TYPE}`,
  });

  const isLoading = isCompanyListingLoading || isStatusLoading;
  const isError = isErrorCompaniesListing || isErrorStatus;
  const errorListing = getErrorMessage(errorCompaniesListing);
  const errorApprovalStatus = getErrorMessage(errorStatus);

  const getErrorDetails = () => {
    if (isErrorCompaniesListing && isErrorStatus) {
      let errorMessage = "";
      if (
        errorListing === GENERIC_GET_API_FAILED_ERROR_MESSAGE &&
        errorApprovalStatus === GENERIC_GET_API_FAILED_ERROR_MESSAGE
      ) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorListing} , ${errorApprovalStatus}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          fetchStatusData();
          fetchCompaniesListing({});
        },
      };
    }
    if (isErrorCompaniesListing)
      return {
        errorMessage: errorListing,
        onRetry: () => fetchCompaniesListing({}),
      };
    if (isErrorStatus)
      return {
        errorMessage: errorApprovalStatus,
        onRetry: () => fetchStatusData(),
      };
    return {
      errorMessage: "",
      onRetry: () => {},
    };
  };

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

  const getRequestedQueryParams = ({
    currentFilterStatus,
    page,
    search,
    rowPerPage,
    sortDirection,
    sortField,
  }) => {
    return {
      perPage: rowPerPage || pageSize,
      page: page || current,
      q: search?.trim() || "",
      sortDirection,
      sortField,
      status: JSON.stringify(currentFilterStatus?.["1"]),
    };
  };

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrent,
    setPageSize,
  });

  const { handleSearch, searchedValue } = useHandleSearch({
    filterArray,
    sortFilter,
    setCurrent,
    getRequestedQueryParams,
    fetchData: fetchCompaniesListing,
  });

  const handleOnUserSearch = (str) => {
    handleSearch(str);
  };

  const statusOptions = status?.map((status) => ({
    optionId: status.id,
    str: status.name,
  }));

  const filterOptions = [
    {
      id: 1,
      name: intl.formatMessage({ id: "label.approval_status" }),
      isSelected: false,
      options: statusOptions,
    },
  ];

  const handleEyeIcon = (data) => {
    const { id } = data;
    navigate(`registered-company-details/${id}`);
  };
  const handleSorting = (sortDetails) => {
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    const requestedParams = getRequestedQueryParams({
      currentFilterStatus: filterArray,
      page: 1,
      search: searchedValue,
      sortDirection: sortDetails?.sortDirection,
      sortField: sortDetails?.sortDirection ? sortDetails?.sortField : "",
    });
    fetchCompaniesListing({ queryParamsObject: requestedParams });
    if (sortDetails.sortDirection) {
      setSortFilter(sortDetails);
      return;
    }
    setSortFilter({ sortDirection: "", sortField: "" });
  };

  const columns = getRegisteredCompanyColumn({
    getImage,
    handleEyeIcon,
    renderColumn,
    intl,
    setSortBy,
    sortBy,
    handleSorting,
  });

  const onChangePageSize = (size) => {
    handleRowsPerPageChange(size);
    setCurrent(1);
    const requestedParams = getRequestedQueryParams({
      rowPerPage: size,
      page: 1,
      search: searchedValue,
      currentFilterStatus: filterArray,
      sortDirection: sortFilter?.sortDirection,
      sortField: sortFilter?.sortField,
    });
    fetchCompaniesListing({ queryParamsObject: requestedParams });
  };

  const onChangeCurrentPage = (page) => {
    handlePagePerChange(page);
    const requestedParams = getRequestedQueryParams({
      rowPerPage: pageSize,
      page: page,
      search: searchedValue,
      currentFilterStatus: filterArray,
      sortDirection: sortFilter?.sortDirection,
      sortField: sortFilter?.sortField,
    });
    fetchCompaniesListing({ queryParamsObject: requestedParams });
  };

  const onFilterApply = (currentFilterStatus) => {
    const requestedParams = getRequestedQueryParams({
      currentFilterStatus,
      search: searchedValue,
      page: 1,
      sortDirection: sortFilter?.sortDirection,
      sortField: sortFilter?.sortField,
    });
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    fetchCompaniesListing({ queryParamsObject: requestedParams });
  };

  return {
    current,
    pageSize,
    searchedValue,
    registered_companies,
    onChangePageSize,
    onChangeCurrentPage,
    columns,
    onFilterApply,
    filterArray,
    isLoading,
    isError,
    setFilterArray,
    filterOptions,
    handleOnUserSearch,
    getErrorDetails,
  };
};

export default useRegisteredCompany;
