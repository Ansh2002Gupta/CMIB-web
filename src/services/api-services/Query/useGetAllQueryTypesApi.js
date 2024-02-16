import useFetch from "../../../core/hooks/useFetch";
import {
  ADMIN_ROUTE,
  GET_ALL_QUERY_TYPES,
} from "../../../constant/apiEndpoints";

const useGetAllQueryTypesApi = () => {
  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: ADMIN_ROUTE + GET_ALL_QUERY_TYPES,
    otherOptions: { skipApiCallOnMount: true },
  });

  return {
    isError,
    isSuccess,
    error,
    isLoading,
    data,
    getAllQueryTypes: fetchData,
  };
};

export default useGetAllQueryTypesApi;
