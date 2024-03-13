import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

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

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePagePerChange = (page) => {
    setCurrent && setCurrent(page);
    setSearchParams((prev) => {
      prev.set(pageParam, page);
      return prev;
    });
  };

  const handleRowsPerPageChange = (rowsPerPage) => {
    setPageSize && setPageSize(rowsPerPage);
    setSearchParams((prev) => {
      prev.set(rowPerPageParam, rowsPerPage);
      return prev;
    });
  };

  useEffect(() => {
    if (shouldSetQueryParamsOnMount) {
      setSearchParams((prev) => {
        prev.set(pageParam, getValidPageNumber(+searchParams.get(pageParam)));
        return prev;
      });
      setSearchParams((prev) => {
        prev.set(
          rowPerPageParam,
          getValidPageSize(+searchParams.get(rowPerPageParam))
        );
        return prev;
      });
    }
  }, []);

  return { handlePagePerChange, handleRowsPerPageChange };
};

export default usePagination;
