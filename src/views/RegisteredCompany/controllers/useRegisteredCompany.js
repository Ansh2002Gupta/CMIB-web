import React, { useContext, useMemo, useState } from "react";
import { getRegisteredCompanyColumn } from "../RegisteredCompanyConfig";
import { useIntl } from "react-intl";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import { ThemeContext } from "../../../core/providers/theme";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useShowNotification from "../../../core/hooks/useShowNotification";
import { getValidPageNumber, getValidPageSize } from "../../../constant/utils";
import { urlService } from "../../../Utils/urlService";
import {
  DEBOUNCE_TIME,
  PAGINATION_PROPERTIES,
} from "../../../constant/constant";
import { registered_companies } from "../dummydata";
import { validateSearchTextLength } from "../../../Utils/validations";
import * as _ from "lodash";
import usePagination from "../../../core/hooks/usePagination";
import useHandleSearch from "../../../core/hooks/useHandleSearch";

const useRegisteredCompany = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicketData, setCurrentTicketData] = useState({});
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
  const handleTicketIcon = () => {};
  const handleSorting = () => {};

  const columns = getRegisteredCompanyColumn({
    type: currentActiveTab,
    intl,
    getImage,
    handleClickAssign,
    handleTicketIcon,
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

  return {
    current,
    pageSize,
    searchedValue,
    registered_companies,
    onChangePageSize,
    onChangeCurrentPage,
    columns,
    filterOptions,
    handleOnUserSearch,
  };
};

export default useRegisteredCompany;
