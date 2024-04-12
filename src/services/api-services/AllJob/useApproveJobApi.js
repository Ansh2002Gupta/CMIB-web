import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { ADMIN_ROUTE, JOB, APPROVE, JOBS } from "../../../constant/apiEndpoints";

const useApproveJobApi = () => {
  const intl = useIntl();

  const [approveJobApiStatus, setApproveJobApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [approveJobData, setApproveJobData] = useState(null);
  const [errorWhileApprovingJob, setErrorWhileApprovingJob] =
    useState("");

  const approveJob = async (
    jobId,
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
        setApproveJobApiStatus(API_STATUS.LOADING);
        setApproveJobData(null);
      errorWhileApprovingJob && setErrorWhileApprovingJob("");
      const url =
        ADMIN_ROUTE + JOBS + `/${jobId}` + APPROVE;
      const res = await Http.patch(url);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApproveJobApiStatus(API_STATUS.SUCCESS);
        setApproveJobData(res.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setApproveJobApiStatus(API_STATUS.ERROR);
      setErrorWhileApprovingJob(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
        setApproveJobData(API_STATUS.ERROR);

      if (err.response?.data?.message) {
        setErrorWhileApprovingJob(err.response?.data?.message);
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
      setErrorWhileApprovingJob(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    }
  };

  const isLoading = approveJobApiStatus === API_STATUS.LOADING;
  const isSuccess = approveJobApiStatus === API_STATUS.SUCCESS;
  const isError = approveJobApiStatus === API_STATUS.ERROR;
  return {
    approveJobData,
    errorWhileApprovingJob,
    approveJobApiStatus,
    isError,
    isLoading,
    isSuccess,
    approveJob,
    setErrorWhileApprovingJob,
  };
};

export default useApproveJobApi;
