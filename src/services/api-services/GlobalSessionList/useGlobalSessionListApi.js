import { useContext } from "react";

import Http from "../../http-service";
import { GlobalSessionContext } from "../../../globalContext/globalSession/globalSessionProvider";
import { getItem } from "../../encrypted-storage-service";
import {
  setGlobalSessionDetails,
  setGlobalSessionList,
  setIsGettingGlobalSessionList,
  setSelectedSession,
} from "../../../globalContext/globalSession/globalSessionActions";
import {
  CORE_ROUTE,
  GLOBAL_SESSION_LIST,
  MAX_RECORDS_COUNT,
} from "../../../constant/apiEndpoints";
import { SESSION_KEY, STATUS_CODES } from "../../../constant/constant";

const useGlobalSessionListApi = () => {
  const [, globalSessionDispatch] = useContext(GlobalSessionContext);

  const getGlobalSessionList = async (selectedModule) => {
    const savedSessionId = getItem(SESSION_KEY);
    try {
      const url =
        CORE_ROUTE +
        `/${selectedModule}` +
        GLOBAL_SESSION_LIST +
        "?perPage=" +
        MAX_RECORDS_COUNT;
      globalSessionDispatch(setIsGettingGlobalSessionList(true));
      const res = await Http.get(url);
      globalSessionDispatch(setIsGettingGlobalSessionList(false));
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        globalSessionDispatch(setGlobalSessionList(res?.data?.records));
        if (savedSessionId) {
          let session = res?.data?.records?.filter(
            (ele) => ele?.id === +savedSessionId
          )?.[0];
          globalSessionDispatch(setGlobalSessionDetails(session?.id || ""));
          globalSessionDispatch(
            setSelectedSession({
              key: session?.id || "",
              label: session?.name || "",
            })
          );
        } else {
          globalSessionDispatch(
            setGlobalSessionDetails(res?.data?.records?.[0]?.id)
          );
          globalSessionDispatch(
            setSelectedSession({
              key: res?.data?.records?.[0]?.id || "",
              label: res?.data?.records?.[0]?.name || "",
            })
          );
        }
        return;
      }
    } catch (err) {}
  };

  return {
    getGlobalSessionList,
  };
};

export default useGlobalSessionListApi;
