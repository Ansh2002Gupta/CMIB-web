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

  const fetchUsers = async (pageSize, currentPage) => {
    setIsFetchingUsers(true);
    setErrorWhileFetchingUsers("");
    setUsersFetchingAPIStatus(API_STATUS.LOADING);
    try {
      const url =
        ADMIN_ROUTE +
        FETCHING_USERS_END_POINT +
        "?perPage=" +
        pageSize +
        "&" +
        "current=" +
        currentPage;
      const res = await Http.get(url);
      if (res.error) {
        setUsersFetchingAPIStatus(API_STATUS.ERROR);
        setErrorWhileFetchingUsers(res?.message);
        return;
      }
      setIsFetchingUsers(false);
      setUsersFetchingAPIStatus(API_STATUS.SUCCESS);
      setUsersList(res?.data?.records);
    } catch (err) {
      setUsersFetchingAPIStatus(API_STATUS.ERROR);
      setIsFetchingUsers(false);
      if (err?.message) {
        setErrorWhileFetchingUsers(err?.message);
      }
    }
  };

  const isSuccess = usersFetchingAPIStatus === "success";
  const isError = usersFetchingAPIStatus === "error";

  return {
    isSuccess,
    isError,
    isFetchingUsers,
    errorWhileFetchingUsers,
    usersList,
    setUsersList,
    usersFetchingAPIStatus,
    fetchUsers,
  };
};

export default useListingUsers;
