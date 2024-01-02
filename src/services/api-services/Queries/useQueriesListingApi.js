import { useState } from "react";
import { API_STATUS } from "../../../constant/constant";
import Http from "../../http-service";
import {
  ADMIN_ROUTE,
  FETCHING_USERS_END_POINT,
} from "../../../constant/apiEndpoints";

const useQueriesListingApi = () => {
  const [isFetchingQueries, setIsFetchingQueries] = useState(false);
  const [errorWhileFetchingQueries, setErrorWhileFetchingQueries] = useState("");
  const [queriesList, setQueriesList] = useState(null);
  const [queriesFetchingAPIStatus, setQueriesFetchingAPIStatus] = useState(
    API_STATUS.IDLE
  );
  const [metaData, setMetaData] = useState(null);

  const fetchQueries = async (pageSize, currentPage, searchQuery, onSuccessCallback) => {
    setIsFetchingQueries(true);
    setErrorWhileFetchingQueries("");
    setQueriesFetchingAPIStatus(API_STATUS.LOADING);
    try {
      let url =
        ADMIN_ROUTE +
        FETCHING_USERS_END_POINT +
        "?perPage=" +
        pageSize +
        "&" +
        "page=" +
        currentPage;
      if (searchQuery) {
        url = url + `&q=${searchQuery}`;
      }
      const res = await Http.get(url);
      if (res.error) {
        setQueriesFetchingAPIStatus(API_STATUS.ERROR);
        setErrorWhileFetchingQueries(res?.message);
        return;
      }
      setIsFetchingQueries(false);
      const { meta } = res?.data;
      setQueriesList(res?.data?.records);
      setMetaData(meta);
      setQueriesFetchingAPIStatus(API_STATUS.SUCCESS);
      onSuccessCallback && onSuccessCallback();
    } catch (err) {
      setQueriesFetchingAPIStatus(API_STATUS.ERROR);
      setIsFetchingQueries(false);
      if (err?.message) {
        setErrorWhileFetchingQueries(err?.message);
      }
    }
  };

  const isSuccess = queriesFetchingAPIStatus === API_STATUS.SUCCESS;
  const isError = queriesFetchingAPIStatus === API_STATUS.ERROR;

  return {
    isSuccess,
    isError,
    isFetchingQueries,
    errorWhileFetchingQueries,
    usersList: queriesList,
    setUsersList: setQueriesList,
    usersFetchingAPIStatus: queriesFetchingAPIStatus,
    fetchUsers: fetchQueries,
    metaData,
  };
};

export default useQueriesListingApi;
