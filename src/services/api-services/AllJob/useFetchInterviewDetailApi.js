import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { ADMIN_ROUTE, JOB, APPROVE, JOBS, APPLICANTS, INTERVIEW } from "../../../constant/apiEndpoints";

const useFetchInterviewDetailApi = () => {
  const intl = useIntl();

  const [interviewDetailApiStatus, setInterviewDetailApi] = useState(
    API_STATUS.IDLE
  );
  const [interviewDetailData, setInterviewDetailData] = useState(null);
  const [errorWhileFetchingInterviewDetail, setErrorWhileFetchingInterviewDetail] =
    useState("");

  const fetchInterviewDetail = async (
    interviewId,
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
        setInterviewDetailApi(API_STATUS.LOADING);
        setInterviewDetailData(null);
        errorWhileFetchingInterviewDetail && setErrorWhileFetchingInterviewDetail("");
      const url =
        ADMIN_ROUTE + APPLICANTS + INTERVIEW + `/${interviewId}`;
      const res = await Http.get(url);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setInterviewDetailApi(API_STATUS.SUCCESS);
        setInterviewDetailData(res.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setInterviewDetailApi(API_STATUS.ERROR);
      setErrorWhileFetchingInterviewDetail(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
        setInterviewDetailData(API_STATUS.ERROR);

      if (err.response?.data?.message) {
        setErrorWhileFetchingInterviewDetail(err.response?.data?.message);
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
      setErrorWhileFetchingInterviewDetail(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    }
  };

  const isLoading = interviewDetailApiStatus === API_STATUS.LOADING;
  const isSuccess = interviewDetailApiStatus === API_STATUS.SUCCESS;
  const isError = interviewDetailApiStatus === API_STATUS.ERROR;
  return {
    interviewDetailData,
    errorWhileFetchingInterviewDetail,
    interviewDetailApiStatus,
    isError,
    isLoading,
    isSuccess,
    fetchInterviewDetail,
    setErrorWhileFetchingInterviewDetail,
  };
};

export default useFetchInterviewDetailApi;
