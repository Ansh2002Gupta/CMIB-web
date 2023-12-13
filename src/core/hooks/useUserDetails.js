import { useState } from "react";

import Http from "../../services/http-service";
import { GENERAL_ERROR_MESSAGE } from "../../Constants/errorMessage";

const useUserDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUsersData] = useState();
  const getUserData = async (userId) => {
    setError("");
    setIsLoading(true);
    try {
      const res = await Http.get(`admin/users/${userId}`);
      if (res?.error) {
        // setError(res.data. );
        return;
      }
      setUsersData(res?.data);
    } catch (err) {
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
        return;
      }
      setError(GENERAL_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };
  return { getUserData, isLoading, userData, error };
};

export default useUserDetails;
