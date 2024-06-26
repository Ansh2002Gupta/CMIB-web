import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import {
  ADMIN_ROUTE,
  CORE_ROUTE,
  FILES_END_POINT,
} from "../../../constant/apiEndpoints";

const useUploadImageApi = () => {
  const intl = useIntl();
  const [imageUploadApiStatus, setImageUploadApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [imageUploadData, setImageUploadData] = useState(null);
  const [errorWhileUploadingImage, setErrorWhileUploadingImage] = useState("");

  const handleUploadImage = async ({
    onSuccessCallback,
    file,
    onErrorCallback,
  }) => {
    try {
      setImageUploadApiStatus(API_STATUS.LOADING);
      setImageUploadData(null);
      errorWhileUploadingImage && setErrorWhileUploadingImage("");
      const url = CORE_ROUTE + "/" + ADMIN_ROUTE + FILES_END_POINT;
      const formData = new FormData();
      formData.append("file", file);
      const res = await Http.post(url, formData);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setImageUploadApiStatus(API_STATUS.SUCCESS);
        setImageUploadData(res?.data);
        onSuccessCallback &&
          onSuccessCallback(res?.data?.url, res?.data?.file_name);
        return;
      }
      setImageUploadApiStatus(API_STATUS.ERROR);
      setErrorWhileUploadingImage(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
    } catch (err) {
      setImageUploadApiStatus(API_STATUS.ERROR);
      const errMessage =
        err.response?.data?.message ||
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" });
      setErrorWhileUploadingImage(errMessage);
      onErrorCallback && onErrorCallback(errMessage);
    }
  };

  const isLoading = imageUploadApiStatus === API_STATUS.LOADING;
  const isSuccess = imageUploadApiStatus === API_STATUS.SUCCESS;
  const isError = imageUploadApiStatus === API_STATUS.ERROR;
  return {
    imageUploadData,
    errorWhileUploadingImage,
    imageUploadApiStatus,
    handleUploadImage,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileUploadingImage,
  };
};

export default useUploadImageApi;
