import useFetch from "../../../core/hooks/useFetch";
import {
  ADMIN_ROUTE,
  QUERY_TYPES_END_POINT,
} from "../../../constant/apiEndpoints";

const useQueriesTypesApi = () => {
  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: ADMIN_ROUTE + QUERY_TYPES_END_POINT,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  return {
    data,
    getQueriesTypes: fetchData,
    isError,
    isLoading,
    isSuccess,
    error,
  };
};

export default useQueriesTypesApi;
