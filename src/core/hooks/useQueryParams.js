import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const setQueryParams = (key, value) => {
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  };

  const getQueryParams = (key) => {
    return searchParams.get(key);
  };

  const removeQueryParams = () => {
    setSearchParams(new URLSearchParams());
  };
  return {
    setQueryParams,
    getQueryParams,
    removeQueryParams,
  };
};

export default useQueryParams;
