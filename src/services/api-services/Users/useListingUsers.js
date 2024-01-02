import { useState } from "react";
import { API_STATUS } from "../../../constant/constant";
import Http from "../../http-service";
import {
  ADMIN_ROUTE,
  FETCHING_USERS_END_POINT,
} from "../../../constant/apiEndpoints";

const useListingUsers = () => {
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [errorWhileFetchingUsers, setErrorWhileFetchingUsers] = useState("");
  const [usersList, setUsersList] = useState(null);
  const [usersFetchingAPIStatus, setUsersFetchingAPIStatus] = useState(
    API_STATUS.IDLE
  );
  const [metaData, setMetaData] = useState(null);

  const fetchUsers = async (pageSize, currentPage, searchQuery, onSuccessCallback) => {
    setIsFetchingUsers(true);
    setErrorWhileFetchingUsers("");
    setUsersFetchingAPIStatus(API_STATUS.LOADING);
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
        setUsersFetchingAPIStatus(API_STATUS.ERROR);
        setErrorWhileFetchingUsers(res?.message);
        return;
      }
      setIsFetchingUsers(false);
      const { meta } = res?.data;
      setUsersList(res?.data?.records);
      setMetaData(meta);
      setUsersFetchingAPIStatus(API_STATUS.SUCCESS);
      onSuccessCallback && onSuccessCallback();
    } catch (err) {
      setUsersFetchingAPIStatus(API_STATUS.ERROR);
      setIsFetchingUsers(false);
      if (err?.message) {
        setErrorWhileFetchingUsers(err?.message);
      }
    }
  };

  const isSuccess = usersFetchingAPIStatus === API_STATUS.SUCCESS;
  const isError = usersFetchingAPIStatus === API_STATUS.ERROR;

  return {
    isSuccess,
    isError,
    isFetchingUsers,
    errorWhileFetchingUsers,
    usersList,
    setUsersList,
    usersFetchingAPIStatus,
    fetchUsers,
    metaData,
  };
};

export default useListingUsers;
