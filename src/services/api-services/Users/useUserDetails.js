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
      const apiOptions = {
        headers: {
          Accept: "application/json",
        },
      };
      const res = await Http.get(url, apiOptions);
      setIsLoading(false);
      if (res?.error) {
        setError(res.message);
        return;
      }
      setUsersData(res?.data);
    } catch (err) {
      setIsLoading(false);
      if (err?.response?.data?.message) {
        setError(err?.response?.data?.message);
        return;
      }
      setError(GENERAL_ERROR_MESSAGE);
    }
  };

  return { getUserData, isLoading, userData, error };
};

export default useUserDetails;
