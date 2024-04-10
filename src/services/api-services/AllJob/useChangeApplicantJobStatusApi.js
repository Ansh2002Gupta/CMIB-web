import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { ADMIN_ROUTE, JOB, APPROVE, JOBS, STATUS, APPLICANTS } from "../../../constant/apiEndpoints";

const useChangeJobStatusApi = () => {
  const intl = useIntl();

  const [changeStatusJobApiStatus, setchangeJobStatusApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [changeJobStatusData, setChangeJobStatusData] = useState(null);
  const [errorWhileChangeJobStatus, setErrorWhileChangeJobStatus] =
    useState("");

  const changeJobStatus = async (
    applicantId,
    payload,
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      setchangeJobStatusApiStatus(API_STATUS.LOADING);
      setChangeJobStatusData(null);
      errorWhileChangeJobStatus && setErrorWhileChangeJobStatus("");
      const url =
        ADMIN_ROUTE + JOB + APPLICANTS + `/${applicantId}` + STATUS;
      const res = await Http.patch(url, payload);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setchangeJobStatusApiStatus(API_STATUS.SUCCESS);
        setChangeJobStatusData(res.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setchangeJobStatusApiStatus(API_STATUS.ERROR);
      setErrorWhileChangeJobStatus(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setChangeJobStatusData(API_STATUS.ERROR);

      if (err.response?.data?.message) {
        setErrorWhileChangeJobStatus(err.response?.data?.message);
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
      setErrorWhileChangeJobStatus(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    }
  };

  const isLoading = changeStatusJobApiStatus === API_STATUS.LOADING;
  const isSuccess = changeStatusJobApiStatus === API_STATUS.SUCCESS;
  const isError = changeStatusJobApiStatus === API_STATUS.ERROR;
  return {
    changeJobStatusData,
    errorWhileChangeJobStatus,
    changeStatusJobApiStatus,
    isError,
    isLoading,
    isSuccess,
    changeJobStatus,
    setErrorWhileChangeJobStatus,
  };
};

export default useChangeJobStatusApi;
