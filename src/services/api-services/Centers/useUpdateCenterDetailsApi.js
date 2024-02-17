import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { ADMIN_ROUTE, CENTER_END_POINT } from "../../../constant/apiEndpoints";

const useUpdateCenterDetailsApi = () => {
  const intl = useIntl();

  const [updateCenterApiStatus, setUpdateCenterApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [updatedCenterData, setUpdatedCenterData] = useState(null);
  const [errorWhileUpdatingCenter, setErrorWhileUpdatingCenter] = useState("");

  const updateCenterDetails = async (
    centerId,
    currentlySelectedModuleKey,
    payload,
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      setUpdateCenterApiStatus(API_STATUS.LOADING);
      setUpdatedCenterData(null);
      errorWhileUpdatingCenter && setErrorWhileUpdatingCenter("");
      const url =
        ADMIN_ROUTE +
        `/${currentlySelectedModuleKey}` +
        CENTER_END_POINT +
        `/${centerId}`;
      const res = await Http.put(url, payload);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setUpdateCenterApiStatus(API_STATUS.SUCCESS);
        setUpdatedCenterData(res.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setUpdateCenterApiStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingCenter(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setUpdateCenterApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileUpdatingCenter(err.response?.data?.message);
        if (
          err.response?.data?.data &&
          err.response?.data?.data?.errors &&
          Object.entries(err.response?.data?.data?.errors).length > 0
        ) {
          onErrorCallback && onErrorCallback(err.response?.data?.data);
        } else {
          onErrorCallback && onErrorCallback(err.response?.data?.message);
        }
        return;
      }
      setErrorWhileUpdatingCenter(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    }
  };

  const isLoading = updateCenterApiStatus === API_STATUS.LOADING;
  const isSuccess = updateCenterApiStatus === API_STATUS.SUCCESS;
  const isError = updateCenterApiStatus === API_STATUS.ERROR;
  return {
    updatedCenterData,
    errorWhileUpdatingCenter,
    updateCenterApiStatus,
    isError,
    isLoading,
    isSuccess,
    updateCenterDetails,
    setErrorWhileUpdatingCenter,
  };
};

export default useUpdateCenterDetailsApi;
