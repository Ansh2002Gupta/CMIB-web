import { useEffect } from "react";

import { urlService } from "../../Utils/urlService";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";

const usePagination = ({
  shouldSetQueryParamsOnMount,
  pageQueryParamName,
  rowPerPageQueryParamName,
  setCurrent,
  setPageSize,
}) => {
  const pageParam = pageQueryParamName || "page";
  const rowPerPageParam = rowPerPageQueryParamName || "rowsPerPage";

  const handlePagePerChange = (page) => {
    setCurrent && setCurrent(page);
    urlService.setQueryStringValue(pageParam, page);
  };

  const handleRowsPerPageChange = (rowsPerPage) => {
    setPageSize && setPageSize(rowsPerPage);
    urlService.setQueryStringValue(rowPerPageParam, rowsPerPage);
  };

  useEffect(() => {
    if (shouldSetQueryParamsOnMount) {
      const queryParams = {
        [pageParam]: getValidPageNumber(
          +urlService.getQueryStringValue(pageParam)
        ),
        [rowPerPageParam]: getValidPageSize(
          +urlService.getQueryStringValue(rowPerPageParam)
        ),
      };
      urlService.setMultipleQueryStringValues(queryParams);
    }
  }, []);

  return { handlePagePerChange, handleRowsPerPageChange };
};

export default usePagination;
