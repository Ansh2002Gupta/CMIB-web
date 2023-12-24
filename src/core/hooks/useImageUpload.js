import { useState } from "react";

import Http from "../../services/http-service";
import { API_STATUS, STATUS_CODES } from "../../constant/constant";
import {
  COMPANY_ROUTE,
  IMAGE_UPLOAD_END_POINT,
} from "../../constant/apiEndpoints";
import { GENERAL_ERROR_MESSAGE } from "../../Constants/errorMessage";

const useImageUpload = () => {
  const [imageUploadStatus, setImageUploadStatus] = useState(API_STATUS.IDLE);
  const [errorWhileUploadingImage, setErrorWhileUploadingImage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadImageData, setUploadImageData] = useState(null);

  const uploadImage = async (file, callBackOnSuccess, callbackOnError) => {
    errorWhileUploadingImage && setErrorWhileUploadingImage("");
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("company_logo", file?.file);
      const url = COMPANY_ROUTE + IMAGE_UPLOAD_END_POINT;
      const res = await Http.post(url, formData);
      setIsUploadingImage(false);
      if (res?.code === STATUS_CODES.SUCCESS_STATUS) {
        setImageUploadStatus(API_STATUS.SUCCESS);
        setUploadImageData(res?.data);
        callBackOnSuccess(res?.data);
        return;
      }
      setImageUploadStatus(API_STATUS.ERROR);
    } catch (err) {
      callbackOnError(err);
      setImageUploadStatus(API_STATUS.ERROR);
      setIsUploadingImage(false);
      if (err?.response?.data?.message) {
        setErrorWhileUploadingImage(err?.response?.data?.message);
        return;
      }
      setErrorWhileUploadingImage(GENERAL_ERROR_MESSAGE);
    }
  };

  return {
    imageUploadStatus,
    errorWhileUploadingImage,
    isUploadingImage,
    uploadImageData,
    uploadImage,
  };
};

export default useImageUpload;
