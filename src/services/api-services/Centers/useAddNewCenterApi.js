import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { CENTRE_END_POINT, ADMIN_ROUTE } from "../../../constant/apiEndpoints";

const useAddNewCenterApi = () => {
  const intl = useIntl();

  const [addNewCenterApiStatus, setAddNewCenterApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [addNewCenterData, setAddNewCenterData] = useState(null);
  const [errorWhileAddingNewCenter, setErrorWhileAddingNewCenter] =
    useState("");

  const addNewCenter = async (
    currentlySelectedModuleKey,
    payload,
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      setAddNewCenterApiStatus(API_STATUS.LOADING);
      setAddNewCenterData(null);
      errorWhileAddingNewCenter && setErrorWhileAddingNewCenter("");
      const url =
        ADMIN_ROUTE + `/${currentlySelectedModuleKey}` + CENTRE_END_POINT;
      const res = await Http.post(url, payload);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setAddNewCenterApiStatus(API_STATUS.SUCCESS);
        setAddNewCenterData(res.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setAddNewCenterApiStatus(API_STATUS.ERROR);
      setErrorWhileAddingNewCenter(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setAddNewCenterApiStatus(API_STATUS.ERROR);

      if (err.response?.data?.message) {
        setErrorWhileAddingNewCenter(err.response?.data?.message);
        if (
          err.response?.data?.data &&
          err.response?.data?.data?.errors &&
          Object.entries(err.response?.data?.data?.errors).length
        ) {
          onErrorCallback && onErrorCallback(err.response?.data?.data);
        } else {
          onErrorCallback && onErrorCallback(err.response?.data?.message);
        }

        return;
      }
      setErrorWhileAddingNewCenter(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    }
  };

  const isLoading = addNewCenterApiStatus === API_STATUS.LOADING;
  const isSuccess = addNewCenterApiStatus === API_STATUS.SUCCESS;
  const isError = addNewCenterApiStatus === API_STATUS.ERROR;
  return {
    addNewCenterData,
    errorWhileAddingNewCenter,
    addNewCenterApiStatus,
    isError,
    isLoading,
    isSuccess,
    addNewCenter,
    setErrorWhileAddingNewCenter,
  };
};

export default useAddNewCenterApi;
