import { useContext } from "react";

import Http from "../../http-service";
import { STATUS_CODES } from "../../../constant/constant";
import { GlobalSessionContext } from "../../../globalContext/globalSession/globalSessionProvider";
import {
  setGlobalSessionDetails,
  setGlobalSessionList,
} from "../../../globalContext/globalSession/globalSessionActions";
import {
  CORE_ROUTE,
  GLOBAL_SESSION_LIST,
} from "../../../constant/apiEndpoints";

const useGlobalSessionListApi = () => {
  const [, globalSessionDispatch] = useContext(GlobalSessionContext);
  const getGlobalSessionList = async (selectedModule) => {
    try {
      const url =
        CORE_ROUTE +
        `/${selectedModule}` +
        GLOBAL_SESSION_LIST +
        "?perPage=1000";
      const res = await Http.get(url);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        globalSessionDispatch(setGlobalSessionList(res?.data?.records));
        globalSessionDispatch(
          setGlobalSessionDetails(res?.data?.records?.[0]?.id)
        );
        return;
      }
    } catch (err) {}
  };

  return {
    getGlobalSessionList,
  };
};

export default useGlobalSessionListApi;
