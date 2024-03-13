import { useContext, useState } from "react";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { getRegisteredCompanyColumn } from "../RegisteredCompanyConfig";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useShowNotification from "../../../core/hooks/useShowNotification";
import { ThemeContext } from "../../../core/providers/theme";
import usePagination from "../../../core/hooks/usePagination";
import useHandleSearch from "../../../core/hooks/useHandleSearch";
import { urlService } from "../../../Utils/urlService";
import { getValidPageNumber, getValidPageSize } from "../../../constant/utils";
import { PAGINATION_PROPERTIES } from "../../../constant/constant";
import { registered_companies } from "../dummydata";

const useRegisteredCompany = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const [sortBy, setSortBy] = useState("");
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [filterArray, setFilterArray] = useState({});
  const [sortFilter, setSortFilter] = useState({});

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
      queryType: JSON.stringify(currentFilterStatus?.["2"]),
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
    fetchData: () => {},
  });

  const handleOnUserSearch = (str) => {
    handleSearch(str);
  };

  const currentActiveTab = "1";

  const filterOptions = [
    {
      id: 1,
      name: "Status",
      isSelected: false,
      options: [],
    },
    {
      id: 2,
      name: "Type",
      isSelected: false,
      options: [],
    },
  ];

  const handleClickAssign = () => {};
  const handleEyeIcon = (data) => {
    const { id } = data;
    navigate(`registered-company-details/${id}`);
  };
  const handleSorting = () => {};

  const columns = getRegisteredCompanyColumn({
    type: currentActiveTab,
    intl,
    getImage,
    handleClickAssign,
    handleEyeIcon,
    navigate,
    renderColumn,
    queriesColumnProperties: {},
    //   fetchData,
    paginationAndSearchProperties: {
      pageSize,
      current,
      searchedValue,
    },
    setSortBy,
    sortBy,
    handleSorting,
    //   userProfileDetails,
  });

  const onChangePageSize = (size) => {
    handleRowsPerPageChange(size);
    // fetchData({ queryParamsObject: requestedParams });
  };

  const onChangeCurrentPage = (page) => {
    handlePagePerChange(page);
    // fetchData({ queryParamsObject: requestedParams });
  };

  const onFilterApply = (filter) => {};

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
    setFilterArray,
    filterOptions,
    handleOnUserSearch,
  };
};

export default useRegisteredCompany;
