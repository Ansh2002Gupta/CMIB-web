import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [serachParams, setSearchParams] = useSearchParams();

  const setQueryParams = (key, value) => {
    let newSearchParams = new URLSearchParams(serachParams);
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  };

  const getQueryParams = (key) => {
    return serachParams.get(key);
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
