import React, { useContext, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Image } from "antd";

import { ThemeContext } from "core/providers/theme";

import CustomButton from "../CustomButton";
import ZoomSliderWithInfo from "../ZoomSliderWithInfo/ZoomSliderWithInfo";
import getCroppedImg, { getImageSource } from "../../constant/utils";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { STORAGE_KEYS, ZOOM_CONSTANT } from "../../constant/constant";
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
  user2FacValidation,
  showNotification,
}) => {
  const intl = useIntl();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(ZOOM_CONSTANT.MIN_ZOOM);
  const rotateImageBy = 90;
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCroppingImage, setIsCroppingImage] = useState(false);
  const [isErrorCroppingImage, setIsErrorCroppingImage] = useState(false);

  const { getImage } = useContext(ThemeContext);

  const { getUserDetails } = useGetUserDetails();

  const [, userProfileDispatch] = useContext(UserProfileContext);

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
        is_two_factor: user2FacValidation,
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
      const { file } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setIsCroppingImage(false);
      initiateFileUpload({
        onSuccessCallback: (imgURL) => {
          uploadImageToServer({ uploadedFile: file, uploadedURL: imgURL });
        },
        file: file,
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
          onClick={() => setRotation((prev) => (prev + rotateImageBy) % 360)}
        />
      </div>
      <div className={styles.actionBtnContainer}>
        <CustomButton
          customStyle={styles.cancelButton}
          onClick={cancelCropHandler}
          isBtnDisable={isCroppingImage}
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
