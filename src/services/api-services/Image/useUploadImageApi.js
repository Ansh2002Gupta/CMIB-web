import { useState } from "react";
import { useIntl } from "react-intl";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constant/constant";
import { CORE_ROUTE, FILES_END_POINT } from "../../../constant/apiEndpoints";

const useUploadImageApi = () => {
  const intl = useIntl();
  const [imageUploadApiStatus, setImageUploadApiStatus] = useState(
    API_STATUS.IDLE
  );
  const [imageUploadData, setImageUploadData] = useState(null);
  const [errorWhileUploadingImage, setErrorWhileUploadingImage] = useState("");

  const handleUploadImage = async ({
    onSuccessCallback,
    module,
    file,
    onErrorCallback,
  }) => {
    try {
      setImageUploadApiStatus(API_STATUS.LOADING);
      setImageUploadData(null);
      errorWhileUploadingImage && setErrorWhileUploadingImage("");
      const url = CORE_ROUTE + "/" + module + FILES_END_POINT;
      const formData = new FormData();
      console.log({file, module});
      formData.append("file_name", file);
      const res = await Http.post(url, formData);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setImageUploadApiStatus(API_STATUS.SUCCESS);
        setImageUploadData(res?.data);
        onSuccessCallback && onSuccessCallback();
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
      if (err.response?.data?.message) {
        setErrorWhileUploadingImage(err.response?.data?.message);
        onErrorCallback && onErrorCallback(err.response?.data?.message);
        return;
      }
      setErrorWhileUploadingImage(
        intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
      );
      onErrorCallback &&
        onErrorCallback(
          intl.formatMessage({ id: "label.generalGetApiFailedErrorMessage" })
        );
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
