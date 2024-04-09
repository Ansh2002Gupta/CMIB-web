import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography, Upload } from "antd";

import Base from "../../core/layouts/Base/Base";
import { TwoRow } from "../../core/layouts";

import UserImage from "../UserImage/UserImage";
import useShowNotification from "../../core/hooks/useShowNotification";
import useUploadImageApi from "../../services/api-services/Images/useUploadImageApi";
import useDeleteImageApi from "../../services/api-services/Images/useDeleteImageApi";
import { ReactComponent as UploadImageIcon } from "../../themes/base/assets/images/Upload icon.svg";
import styles from "./FileUpload.module.scss";
import "./override.css";

const FileUpload = ({
  customContaierStyles,
  heading,
  isFormEditable,
  isNotAddable,
  name,
  subHeading,
  updateUserData,
  userImageName,
  userProfilePic,
  deletedImage,
  setDeletedImage,
}) => {
  const intl = useIntl();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const { handleUploadImage } = useUploadImageApi();
  const { handleDeleteImage } = useDeleteImageApi();

  const beforeUpload = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const isAllowedType = allowedTypes.includes(file?.file?.type);
    const isLessThan5MB = file?.file?.size / 1024 / 1024 < 5;

    if (!isAllowedType) {
      showNotification({
        text: intl.formatMessage({ id: "label.onlyJpgAndPngFile" }),
        type: "error",
        headingText: intl.formatMessage({ id: "label.errorMessage" }),
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
    return isAllowedType && isLessThan5MB;
  };

  const handleOnUploadImage = (file) => {
    const { onError } = file;
    const isValid = beforeUpload(file);
    if (typeof isValid === "string" || !isValid) {
      onError("error", file?.file);
      return;
    }
    if (file?.file) {
      isNotAddable &&
        handleUploadImage({
          onSuccessCallback: (imgData) => {
            updateUserData("profile_photo_url", imgData?.url);
            updateUserData("profile_photo", imgData?.file_name);
          },
          file: file?.file,
          onErrorCallback: (errString) => {
            showNotification(errString);
          },
        });
    }
  };
  const removeSelctedImage = () => {
    setDeletedImage([...deletedImage, userImageName]);
    !isNotAddable &&
      handleDeleteImage({
        fileName: userImageName,
      });
    updateUserData("profile_photo_url", "");
    updateUserData("profile_photo", "");
  };

  return (
    <Base className={[styles.container, customContaierStyles].join(" ")}>
      {!!heading && (
        <Typography className={styles.headingText}>{heading}</Typography>
      )}
      <div className={styles.uploadBottomContainer}>
        {!!subHeading && (
          <Typography className={styles.subHeadingText}>
            {subHeading}
          </Typography>
        )}
        {notificationContextHolder}
        {userProfilePic || !isFormEditable ? (
          <UserImage
            onTrashClick={removeSelctedImage}
            src={userProfilePic}
            imageName={userImageName}
            editable={isFormEditable}
          />
        ) : (
          <Upload
            className={[styles.uploadContainer].join(" ")}
            customRequest={handleOnUploadImage}
            disabled={!isFormEditable}
            accept=".jpg,.jpeg,.png"
          >
            <TwoRow
              className={styles.uploadTextContainer}
              topSection={<UploadImageIcon className={styles.uploadImage} />}
              bottomSection={
                <div>
                  <div className={styles.uploadHeadingContainer}>
                    <Typography className={styles.uploadText}>
                      {intl.formatMessage({ id: "label.dragNdrop" })}
                    </Typography>
                    <Typography className={styles.uploadGreenText}>
                      {intl.formatMessage({ id: "label.browse" })}
                    </Typography>
                  </div>
                  <Typography className={styles.uploadInfo}>
                    {intl.formatMessage({ id: "label.supportedFormat" })}
                  </Typography>
                </div>
              }
            />
          </Upload>
        )}
      </div>
    </Base>
  );
};

FileUpload.defaultProps = {
  heading: "",
  isFormEditable: false,
  name: "",
  subHeading: "",
  updateUserData: () => {},
  userProfilePic: "",
  userImageName: "",
};

FileUpload.propTypes = {
  heading: PropTypes.string,
  isFormEditable: PropTypes.bool,
  name: PropTypes.string,
  subHeading: PropTypes.string,
  updateUserData: PropTypes.func,
  userProfilePic: PropTypes.string,
  userImageName: PropTypes.string,
};

export default FileUpload;
