import { useState } from "react";

import Http from "../../http-service";
import { GENERAL_ERROR_MESSAGE } from "../../../constant/errorMessage";
import {
  ADMIN_ROUTE,
  GET_USER_END_POINT,
} from "../../../constant/apiEndpoints";

const useUserDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUsersData] = useState(null);

  const getUserData = async (userId) => {
    setError("");
    setIsLoading(true);
    try {
      const url = ADMIN_ROUTE + GET_USER_END_POINT + "/" + userId;
      const res = await Http.get(url);
      if (res?.error) {
        setError(res.message);
        return;
      }
      setIsLoading(false);
      setUsersData(res?.data);
    } catch (err) {
      setIsLoading(false);
      if (err?.message) {
        setError(err?.message);
        return;
      }
      setError(GENERAL_ERROR_MESSAGE);
    }
  };

  return { getUserData, isLoading, userData, error };
};

export default useUserDetails;
