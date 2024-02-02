import React, { useContext, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Image } from "antd";

import { ThemeContext } from "core/providers/theme";

import CustomButton from "../CustomButton";
import ZoomSliderWithInfo from "../ZoomSliderWithInfo/ZoomSliderWithInfo";
import getCroppedImg from "../../constant/cropImageUtils";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  ROTATE_IMAGE_BY,
  STORAGE_KEYS,
  ZOOM_CONSTANT,
} from "../../constant/constant";
import { removeItem } from "../../services/encrypted-storage-service";
import { resetUserDetails } from "../../globalContext/userProfile/userProfileActions";
import useGetUserDetails from "../../services/api-services/UserProfile/useGetUserProfile";
import styles from "./CropAndRotateImage.module.scss";

const CropAndRotateImage = ({
  file,
  handleFileUpload,
  heading,
  initiateFileUpload,
  photoURL,
  setFile,
  setCurrentOpenModal,
  showNotification,
  isLoading,
}) => {
  const intl = useIntl();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(ZOOM_CONSTANT.MIN_ZOOM);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCroppingImage, setIsCroppingImage] = useState(false);
  const [isErrorCroppingImage, setIsErrorCroppingImage] = useState(false);

  const { getImage } = useContext(ThemeContext);
  const [, userProfileDispatch] = useContext(UserProfileContext);

  const { getUserDetails } = useGetUserDetails();

  const resetUserStoredInfo = () => {
    removeItem(STORAGE_KEYS.USER_DATA);
    userProfileDispatch(resetUserDetails());
    getUserDetails();
  };

  const uploadImageToServer = ({ uploadedFile, uploadedURL }) => {
    setFile(uploadedURL);
    handleFileUpload({
      payload: {
        profile_photo: uploadedURL,
      },
      onErrorCallback: (errString) => {
        showNotification(errString, "error");
        setFile(null);
        setCurrentOpenModal(1);
      },
      onSuccessCallback: () => {
        resetUserStoredInfo();
      },
    });
  };

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
        onSuccessCallback: (imgURL) => {
          uploadImageToServer({
            uploadedFile: croppedFile,
            uploadedURL: imgURL,
          });
        },
        file: croppedFile,
        onErrorCallback: (errString) => {
          showNotification(errString, "error");
          setCurrentOpenModal(1);
        },
      });
    } catch (error) {
      console.log(error);
      setIsErrorCroppingImage(true);
    }
  };

  const cancelCropHandler = () => {
    setCurrentOpenModal(3);
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
          onClick={cancelCropHandler}
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
  file: null,
  handleFileUpload: () => {},
  heading: "Edit Picture",
  initiateFileUpload: () => {},
  photoURL: "",
  setFile: () => {},
  setCurrentOpenModal: () => {},
};

CropAndRotateImage.propTypes = {
  file: PropTypes.object,
  handleFileUpload: PropTypes.func,
  heading: PropTypes.string,
  initiateFileUpload: PropTypes.func,
  photoURL: PropTypes.string,
  setFile: PropTypes.func,
  setCurrentOpenModal: PropTypes.func,
  setPhotoURL: PropTypes.func,
};

export default CropAndRotateImage;
