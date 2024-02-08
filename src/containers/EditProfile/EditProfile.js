import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography, Image, Button, Upload } from "antd";

import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import CropAndRotateImage from "../../components/CropAndRotateImage/CropAndRotateImage";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import useDeleteImageApi from "../../services/api-services/Image/useDeleteImageApi";
import useUploadImageApi from "../../services/api-services/Image/useUploadImageApi";
import useUpdateUserProfileApi from "../../services/api-services/UserProfile/useUpdateUserProfileApi";
import { getImageSource } from "../../constant/utils";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  setUserDetails,
  setUserProfileModalNumber,
} from "../../globalContext/userProfile/userProfileActions";
import { classes } from "./EditProfile.styles";
import styles from "./EditProfile.module.scss";
import "./override.css";

const EditProfile = ({ showNotification }) => {
  const intl = useIntl();
  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);
  const { currentlyOpenedUserProfileModal } = userProfileDetails;

  const [userProfileImage, setUserProfileImage] = useState({
    file: null,
    src: userProfileDetails?.userDetails?.profile_photo,
  });
  const userProfileImageURL = userProfileDetails?.userDetails?.profile_photo;
  const userProfileImageName = userProfileImageURL?.split("/")?.pop() || "";
  const userName = userProfileDetails?.userDetails?.name;
  const firstName = userName?.split(" ")?.[0] || "";
  const lastName = userName?.split(" ")?.[1] || "";
  const [imageToBeChaged, setImageToBeChanged] = useState(null);
  const { getImage } = useContext(ThemeContext);
  const { handleUpdatingUserProfile, isLoading: isUpdatingUserProfilePicture } =
    useUpdateUserProfileApi();

  const { handleUploadImage, isLoading: isUploadingImage } =
    useUploadImageApi();

  const { handleDeleteImage } = useDeleteImageApi();

  const beforeUpload = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const isAllowedType = allowedTypes.includes(file?.type);
    const isLessThan5MB = file?.size / 1024 / 1024 < 5;

    if (!isAllowedType) {
      showNotification({
        text: intl.formatMessage({ id: "label.onlyJpgAndPngFile" }),
        type: "error",
      });
      return Upload.LIST_IGNORE;
    }

    if (!isLessThan5MB) {
      showNotification({
        text: intl.formatMessage({ id: "label.fileUpto5MB" }),
        type: "error",
      });
      return Upload.LIST_IGNORE;
    }

    if (isAllowedType && isLessThan5MB) {
      const imageSRC = getImageSource(file);
      setImageToBeChanged({
        file,
        src: imageSRC,
      });
      userProfileDispatch(setUserProfileModalNumber(3));
    }
    return isAllowedType && isLessThan5MB;
  };

  const handleOnClose = () => {
    currentlyOpenedUserProfileModal === 2 &&
      userProfileDispatch(setUserProfileModalNumber(1));
    currentlyOpenedUserProfileModal === 3 &&
      userProfileDispatch(setUserProfileModalNumber(2));
  };

  const getTopHeader = () => {
    return (
      <TwoColumn
        className={styles.headingStyle}
        leftSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({
              id: `label.${
                currentlyOpenedUserProfileModal === 2
                  ? "editProfilePicture"
                  : "cropProfilePicture"
              }`,
            })}
          </Typography>
        }
        rightSection={
          <Image
            preview={false}
            src={getImage("cross")}
            className={styles.crossIconStyle}
            onClick={handleOnClose}
          />
        }
      />
    );
  };

  const resetUserStoredInfo = (uploadedURL) => {
    const { userDetails } = userProfileDetails;
    userProfileDispatch(
      setUserDetails({
        ...userDetails,
        profile_photo: uploadedURL || "",
      })
    );
  };

  const updateUserProfilePicture = ({
    uploadedFile,
    uploadedImageName,
    uploadedURL,
  }) => {
    setUserProfileImage({
      file: uploadedFile,
      src: uploadedURL,
    });
    handleUpdatingUserProfile({
      payload: {
        profile_photo: uploadedImageName,
      },
      onErrorCallback: (errString) => {
        showNotification({ text: errString, type: "error" });
        setUserProfileImage(null);
        userProfileDispatch(setUserProfileModalNumber(1));
      },
      onSuccessCallback: () => {
        resetUserStoredInfo(uploadedURL);
        userProfileDispatch(setUserProfileModalNumber(1));
      },
    });
  };

  const onErrorUploadingFile = (errMessage) => {
    showNotification({ text: errMessage, type: "error" });
    userProfileDispatch(setUserProfileModalNumber(1));
  };

  const closeCropView = () => {
    userProfileDispatch(setUserProfileModalNumber(2));
  };

  const handleOnRemoveImage = () => {
    handleUpdatingUserProfile({
      payload: {
        profile_photo: "",
      },
      onErrorCallback: (errorString) => {
        showNotification({ text: errorString, type: "error" });
      },
      onSuccessCallback: () => {
        handleDeleteImage({
          fileName: userProfileImageName,
        });
        resetUserStoredInfo();
        setUserProfileImage({
          src: "",
          file: null,
        });
      },
    });
  };

  return (
    <>
      {currentlyOpenedUserProfileModal === 2 ? (
        <ThreeRow
          className={styles.changeProfileContainer}
          topSection={getTopHeader()}
          middleSectionStyle={classes.middleSectionStyles}
          middleSection={
            <div className={styles.imageBox}>
              <ProfileIcon
                firstName={firstName}
                lastName={lastName}
                profileImage={userProfileImage?.src}
                profileImageStyle={styles.profileImageStyle}
                imageContainerStyle={styles.imageContainerStyle}
              />
            </div>
          }
          bottomSection={
            <>
              <TwoColumn
                className={styles.bottomSectionStyle}
                isLeftFillSpace
                isRightFillSpace={!!userProfileImage?.src}
                leftSection={
                  <Upload {...{ beforeUpload }} className={styles.fullWidth}>
                    <Button
                      className={[
                        styles.cancelButton,
                        styles.fullWidth,
                        styles.buttonText,
                      ].join(" ")}
                      icon={
                        <Image src={getImage("editIcon")} preview={false} />
                      }
                    >
                      {intl.formatMessage({
                        id: `label.${userProfileImage?.src ? "change" : "add"}`,
                      })}
                    </Button>
                  </Upload>
                }
                rightSection={
                  userProfileImage?.src ? (
                    <Button
                      className={[styles.buttonText, styles.cancelButton].join(
                        " "
                      )}
                      disabled={
                        isUploadingImage || isUpdatingUserProfilePicture
                      }
                      icon={
                        <Image src={getImage("trashBlue")} preview={false} />
                      }
                      onClick={handleOnRemoveImage}
                    >
                      {intl.formatMessage({ id: "label.remove" })}
                    </Button>
                  ) : (
                    <></>
                  )
                }
              />
            </>
          }
        />
      ) : (
        <TwoRow
          className={styles.cropAndRotateContainer}
          topSection={getTopHeader()}
          isBottomFillSpace
          bottomSection={
            <CropAndRotateImage
              isLoading={isUploadingImage || isUpdatingUserProfilePicture}
              photoURL={imageToBeChaged?.src}
              initiateFileUpload={handleUploadImage}
              onCancel={closeCropView}
              onSuccessFileUpload={updateUserProfilePicture}
              {...{ onErrorUploadingFile, showNotification }}
            />
          }
        />
      )}
    </>
  );
};

EditProfile.propTypes = {
  showNotification: PropTypes.func,
};

export default EditProfile;
