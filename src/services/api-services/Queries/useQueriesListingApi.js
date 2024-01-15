import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { ADMIN_ROUTE, QUERY_END_POINT } from "../../../constant/apiEndpoints";
import { API_STATUS } from "../../../constant/constant";

const useQueriesListingApi = () => {
  const intl = useIntl();

  const [isFetchingQueries, setIsFetchingQueries] = useState(false);
  const [errorWhileFetchingQueries, setErrorWhileFetchingQueries] =
    useState("");
  const [queriesList, setQueriesList] = useState(null);
  const [queriesFetchingAPIStatus, setQueriesFetchingAPIStatus] = useState(
    API_STATUS.IDLE
  );
  const [metaData, setMetaData] = useState(null);

  const fetchQueries = async (
    pageSize,
    currentPage,
    searchQuery,
    onSuccessCallback
  ) => {
    setIsFetchingQueries(true);
    setErrorWhileFetchingQueries("");
    setQueriesFetchingAPIStatus(API_STATUS.LOADING);
    try {
      let url =
        ADMIN_ROUTE +
        QUERY_END_POINT +
        "?perPage=" +
        pageSize +
        "&" +
        "page=" +
        currentPage;
      if (searchQuery) {
        url = url + `&q=${searchQuery}`;
      }
      const apiOptions = {
        headers: {
          Accept: "application/json",
        },
      };
      const res = await Http.get(url, apiOptions);
      setIsFetchingQueries(false);
      if (res.error) {
        setQueriesFetchingAPIStatus(API_STATUS.ERROR);
        setErrorWhileFetchingQueries(res?.message);
        return;
      }
      const { meta } = res?.data;
      setQueriesList(res?.data?.records);
      setMetaData(meta);
      setQueriesFetchingAPIStatus(API_STATUS.SUCCESS);
      onSuccessCallback && onSuccessCallback();
    } catch (err) {
      setQueriesFetchingAPIStatus(API_STATUS.ERROR);
      setIsFetchingQueries(false);
      if (err?.response?.data?.message) {
        setErrorWhileFetchingQueries(err?.response?.data?.message);
      }
      setErrorWhileFetchingQueries(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
    }
  };

  const isSuccess = queriesFetchingAPIStatus === API_STATUS.SUCCESS;
  const isError = queriesFetchingAPIStatus === API_STATUS.ERROR;

  return {
    isSuccess,
    isError,
    isFetchingQueries,
    errorWhileFetchingQueries,
    queriesList,
    setQueriesList,
    queriesFetchingAPIStatus,
    fetchQueries,
    metaData,
  };
};

export default useQueriesListingApi;
