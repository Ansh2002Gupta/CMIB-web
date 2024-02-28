import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import {
  CORE_ROUTE,
  INTERVIEW_DATES,
  MOCK_INTERVIEWS,
} from "../../../constant/apiEndpoints";

const updateConfigureInterview = () => {
  const intl = useIntl();
  const [
    updatingConfigureInterviewStatus,
    setUpdatingConfigureInterviewStatus,
  ] = useState(API_STATUS.IDLE);
  const [configureInterviewData, setConfigureInterviewData] = useState(null);
  const [errorWhileUpdatingInterview, setErrorWhileUpdatingInterview] =
    useState("");

  const handleUpdateConfigureInterview = async ({
    centreId,
    module,
    onErrorCallback,
    onSuccessCallback,
    payload,
  }) => {
    try {
      setUpdatingConfigureInterviewStatus(API_STATUS.LOADING);
      setConfigureInterviewData(null);
      errorWhileUpdatingInterview && setErrorWhileUpdatingInterview("");
      const url = `${CORE_ROUTE}/${module}${MOCK_INTERVIEWS}/${centreId}${INTERVIEW_DATES}`;
      const res = await Http.patch(url, payload);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setUpdatingConfigureInterviewStatus(API_STATUS.SUCCESS);
        setConfigureInterviewData(res?.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setUpdatingConfigureInterviewStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingInterview(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" });
      setUpdatingConfigureInterviewStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingInterview(errorMessage);
      onErrorCallback && onErrorCallback(errorMessage);
    }
  };

  const isLoading = updatingConfigureInterviewStatus === API_STATUS.LOADING;
  const isSuccess = updatingConfigureInterviewStatus === API_STATUS.SUCCESS;
  const isError = updatingConfigureInterviewStatus === API_STATUS.ERROR;

  return {
    configureInterviewData,
    errorWhileUpdatingInterview,
    handleUpdateConfigureInterview,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileUpdatingInterview,
    updatingConfigureInterviewStatus,
  };
};

export default updateConfigureInterview;
