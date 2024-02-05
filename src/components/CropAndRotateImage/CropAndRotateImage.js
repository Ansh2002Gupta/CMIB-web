import React, { useContext, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Image } from "antd";

import { ThemeContext } from "core/providers/theme";

import CustomButton from "../CustomButton";
import ZoomSliderWithInfo from "../ZoomSliderWithInfo/ZoomSliderWithInfo";
import getCroppedImg from "../../constant/cropImageUtils";
import { ROTATE_IMAGE_BY, ZOOM_CONSTANT } from "../../constant/constant";
import styles from "./CropAndRotateImage.module.scss";

const CropAndRotateImage = ({
  initiateFileUpload,
  isLoading,
  onCancel,
  onErrorUploadingFile,
  onSuccessFileUpload,
  photoURL,
}) => {
  const intl = useIntl();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(ZOOM_CONSTANT.MIN_ZOOM);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCroppingImage, setIsCroppingImage] = useState(false);
  const [isErrorCroppingImage, setIsErrorCroppingImage] = useState(false);

  const { getImage } = useContext(ThemeContext);

  const cropImage = async () => {
    try {
      setIsCroppingImage(true);
      isErrorCroppingImage && setIsErrorCroppingImage(false);
      const { file: croppedFile } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setIsCroppingImage(false);
      initiateFileUpload({
        onSuccessCallback: (imgURL, imgName) => {
          onSuccessFileUpload &&
            onSuccessFileUpload({
              uploadedFile: croppedFile,
              uploadedImageName: imgName,
              uploadedURL: imgURL,
            });
        },
        file: croppedFile,
        onErrorCallback: (errMessage) => {
          onErrorUploadingFile && onErrorUploadingFile(errMessage);
        },
      });
    } catch (error) {
      console.log(error);
      setIsErrorCroppingImage(true);
    }
  };

  const resetStates = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setIsCroppingImage(false);
    setIsErrorCroppingImage(false);
  };

  useEffect(() => {
    return () => {
      resetStates();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cropperContainer}>
        <Cropper
          aspect={1}
          crop={crop}
          cropShape="round"
          image={photoURL}
          onCropChange={(val) => {
            setCrop(val);
          }}
          onCropComplete={(croppedArea, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels);
          }}
          onRotationChange={setRotation}
          onZoomChange={setZoom}
          rotation={rotation}
          zoom={zoom}
        />
      </div>
      <div className={styles.containerWithRotate}>
        <ZoomSliderWithInfo {...{ setZoom, zoom }} />
        <Image
          src={getImage("rotateIcon")}
          preview={false}
          width={24}
          height={24}
          className={styles.rotateIcon}
          onClick={() => setRotation((prev) => (prev + ROTATE_IMAGE_BY) % 360)}
        />
      </div>
      <div className={styles.actionBtnContainer}>
        <CustomButton
          customStyle={styles.cancelButton}
          onClick={onCancel}
          isBtnDisable={isCroppingImage || isLoading}
          btnText={intl.formatMessage({ id: "label.cancel" })}
        />
        <CustomButton
          onClick={cropImage}
          isBtnDisable={isCroppingImage}
          btnText={intl.formatMessage({ id: "label.save" })}
        />
      </div>
    </div>
  );
};

CropAndRotateImage.defaultProps = {
  initiateFileUpload: () => {},
  onCancel: () => {},
  onErrorUploadingFile: () => {},
  onSuccessFileUpload: () => {},
  photoURL: "",
  setFile: () => {},
};

CropAndRotateImage.propTypes = {
  initiateFileUpload: PropTypes.func,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  onErrorUploadingFile: PropTypes.func,
  onSuccessFileUpload: PropTypes.func,
  photoURL: PropTypes.string,
};

export default CropAndRotateImage;
