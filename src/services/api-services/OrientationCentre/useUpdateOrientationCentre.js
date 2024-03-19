import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import {
  CORE_ROUTE,
  ORIENTATION_CENTRES,
  ROUNDS,
  UPDATED_API_VERSION,
} from "../../../constant/apiEndpoints";

const useUpdateOrientationCentre = () => {
  const intl = useIntl();
  const [updatingOrientationCentreStatus, setUpdatingOrientationCentreStatus] =
    useState(API_STATUS.IDLE);
  const [orientationUpdateResult, setOrientationUpdateResult] = useState(null);
  const [errorWhileUpdatingCentre, setErrorWhileUpdatingCentre] = useState("");

  const handleUpdateOrientationCentre = async ({
    module,
    onErrorCallback,
    onSuccessCallback,
    payload,
    roundId,
    sessionID,
  }) => {
    try {
      setUpdatingOrientationCentreStatus(API_STATUS.LOADING);
      setOrientationUpdateResult(null);
      errorWhileUpdatingCentre && setErrorWhileUpdatingCentre("");
      const url = `${CORE_ROUTE}/${module}${ROUNDS}/${roundId}${ORIENTATION_CENTRES}?session-id=${sessionID}`;
      const res = await Http.patch(url, payload, {
        headers: { "api-version": UPDATED_API_VERSION },
      });
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setUpdatingOrientationCentreStatus(API_STATUS.SUCCESS);
        setOrientationUpdateResult(res?.data);
        onSuccessCallback && onSuccessCallback();
        return;
      }
      setUpdatingOrientationCentreStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingCentre(
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
      setUpdatingOrientationCentreStatus(API_STATUS.ERROR);
      setErrorWhileUpdatingCentre(errorMessage);
      onErrorCallback && onErrorCallback(errorMessage);
    }
  };

  const isLoading = updatingOrientationCentreStatus === API_STATUS.LOADING;
  const isSuccess = updatingOrientationCentreStatus === API_STATUS.SUCCESS;
  const isError = updatingOrientationCentreStatus === API_STATUS.ERROR;

  return {
    orientationUpdateResult,
    errorWhileUpdatingCentre,
    handleUpdateOrientationCentre,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileUpdatingCentre,
    updatingOrientationCentreStatus,
  };
};

export default useUpdateOrientationCentre;
