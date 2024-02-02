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
import useGetUserDetails from "../../services/api-services/UserProfile/useGetUserProfile";
import useUpdateUserProfileApi from "../../services/api-services/UserProfile/useUpdateUserProfileApi";
import { getImageSource } from "../../constant/utils";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { resetUserDetails } from "../../globalContext/userProfile/userProfileActions";
import { removeItem } from "../../services/encrypted-storage-service";
import { STORAGE_KEYS } from "../../constant/constant";
import { classes } from "./EditProfile.styles";
import styles from "./EditProfile.module.scss";
import "./override.css";

const EditProfile = ({
  setCurrentOpenModal,
  currentOpenendModal,
  showNotification,
}) => {
  const intl = useIntl();
  const [userProfileDetails] = useContext(UserProfileContext);
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
  const { handleUpdatingUserProfile } = useUpdateUserProfileApi();
  const [, userProfileDispatch] = useContext(UserProfileContext);

  const { handleUploadImage, isLoading: isUploadingImage } =
  useUploadImageApi();
  
  const {
    handleDeleteImage,
    isLoading: isDeletingImage,
  } = useDeleteImageApi();
  
  const { getUserDetails } = useGetUserDetails();

  const beforeUpload = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const isAllowedType = allowedTypes.includes(file?.type);
    const isLessThan5MB = file?.size / 1024 / 1024 < 5;

    if (!isAllowedType) {
      showNotification(
        intl.formatMessage({ id: "label.onlyJpgAndPngFile" }),
        "error"
      );
      return Upload.LIST_IGNORE;
    }

    if (!isLessThan5MB) {
      showNotification(
        intl.formatMessage({ id: "label.fileUpto5MB" }),
        "error"
      );
      return Upload.LIST_IGNORE;
    }

    if (isAllowedType && isLessThan5MB) {
      const imageSRC = getImageSource(file);
      setImageToBeChanged({
        file,
        src: imageSRC,
      });
      setCurrentOpenModal(4);
    }
    return isAllowedType && isLessThan5MB;
  };

  const handleOnClose = () => {
    currentOpenendModal === 3 && setCurrentOpenModal(1);
    currentOpenendModal === 4 && setCurrentOpenModal(3);
  };

  const getTopHeader = () => {
    return (
      <TwoColumn
        className={styles.headingStyle}
        leftSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({
              id: `label.${
                currentOpenendModal === 3
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

  const resetUserStoredInfo = () => {
    removeItem(STORAGE_KEYS.USER_DATA);
    userProfileDispatch(resetUserDetails());
    getUserDetails();
  };

  const handleOnRemoveImage = () => {
    handleUpdatingUserProfile({
      payload: {
        profile_photo: "",
        is_two_factor: userProfileDetails?.userDetails?.is_two_factor,
      },
      onErrorCallback: (errorString) => {
        showNotification(errorString, "error");
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
      {currentOpenendModal === 3 ? (
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
              isLoading={isUploadingImage}
              file={imageToBeChaged.file}
              setFile={setUserProfileImage}
              photoURL={imageToBeChaged?.src}
              initiateFileUpload={handleUploadImage}
              handleFileUpload={handleUpdatingUserProfile}
              {...{ showNotification, setCurrentOpenModal }}
            />
          }
        />
      )}
    </>
  );
};

EditProfile.propTypes = {
  setCurrentOpenModal: PropTypes.func,
};

export default EditProfile;
