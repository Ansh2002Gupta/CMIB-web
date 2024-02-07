import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { CORE_ROUTE, FILES_END_POINT } from "../../../constant/apiEndpoints";

const useDeleteImageApi = () => {
  const intl = useIntl();
  const [imageDeleteApiStatus, setImageDeleteApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [imageDeleteData, setImageDeleteData] = useState(null);
  const [errorWhileDeletingImage, setErrorWhileDeletingImage] = useState("");

  const handleDeleteImage = async ({
    onSuccessCallback,
    fileName,
    onErrorCallback,
  }) => {
    try {
      setImageDeleteApiStatus(API_STATUS.LOADING);
      setImageDeleteData(null);
      errorWhileDeletingImage && setErrorWhileDeletingImage("");
      const url = CORE_ROUTE + "/admin" + FILES_END_POINT + "/" + fileName;
      const res = await Http.delete(url);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setImageDeleteApiStatus(API_STATUS.SUCCESS);
        setImageDeleteData(res?.data);
        onSuccessCallback && onSuccessCallback(res?.data);
        return;
      }
      setImageDeleteApiStatus(API_STATUS.ERROR);
      setErrorWhileDeletingImage(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setImageDeleteApiStatus(API_STATUS.ERROR);
      const errMessage =
        err.response?.data?.message ||
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" });

      setErrorWhileDeletingImage(errMessage);
      onErrorCallback && onErrorCallback(errMessage);
    }
  };

  const isLoading = imageDeleteApiStatus === API_STATUS.LOADING;
  const isSuccess = imageDeleteApiStatus === API_STATUS.SUCCESS;
  const isError = imageDeleteApiStatus === API_STATUS.ERROR;
  return {
    imageDeleteData,
    errorWhileDeletingImage,
    imageDeleteApiStatus,
    handleDeleteImage,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileDeletingImage,
  };
};

export default useDeleteImageApi;
