import { useState, useMemo } from "react";
import _ from "lodash";

import { urlService } from "../../Utils/urlService";
import { DEBOUNCE_TIME, PAGINATION_PROPERTIES } from "../../constant/constant";
import { validateSearchTextLength } from "../../Utils/validations";

const useHandleSearch = ({
  filterArray,
  sortFilter,
  setCurrent,
  getRequestedQueryParams,
  fetchData = () => {},
}) => {
  const [searchedValue, setSearchedValue] = useState(
    urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY) || ""
  );
  const debounceSearch = useMemo(() => {
    return _.debounce(fetchData, DEBOUNCE_TIME);
  }, []);

  const handleSearch = (str) => {
    setCurrent(1);
    setSearchedValue(str);
    if (str?.trim()?.length > 2) {
      debounceSearch({
        queryParamsObject: getRequestedQueryParams({
          page: 1,
          search: validateSearchTextLength(str),
          currentFilterStatus: filterArray,
          sortDirection: sortFilter?.sortDirection,
          sortField: sortFilter?.sortField,
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
        queryParamsObject: getRequestedQueryParams({
          page: 1,
          search: "",
          currentFilterStatus: filterArray,
          sortDirection: sortFilter?.sortDirection,
          sortField: sortFilter?.sortField,
        }),
      });
      urlService.removeParam(PAGINATION_PROPERTIES.SEARCH_QUERY);
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    }
  };

  return { handleSearch, searchedValue, setSearchedValue };
};

export default useHandleSearch;
