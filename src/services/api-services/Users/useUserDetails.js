import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { ADMIN_ROUTE, USERS_END_POINT } from "../../../constant/apiEndpoints";

const useUserDetails = () => {
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUsersData] = useState(null);

  const getUserData = async ({
    userId,
    onSuccessCallBack,
    onErrorCallBack,
  }) => {
    setError("");
    setIsLoading(true);
    try {
      const url = ADMIN_ROUTE + USERS_END_POINT + "/" + userId;
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
      onSuccessCallBack(res?.data);
    } catch (err) {
      setIsLoading(false);
      if (err?.response?.data?.message) {
        setError(err?.response?.data?.message);
        onErrorCallBack(err?.response?.data?.message);
        return;
      }
      setError(
        intl.formatMessage({
          id: "label.generalGetApiFailedErrorMessage",
        })
      );
    }
  };

  return { getUserData, isLoading, userData, error };
};

export default useUserDetails;
