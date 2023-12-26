import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Image, Typography, Upload, message } from "antd";

import Base from "../../core/layouts/Base/Base";

import UserImage from "../UserImage/UserImage";
import useImageUpload from "../../services/api-services/Image/useImageUpload";
import { ReactComponent as UploadImageIcon } from "../../themes/base/assets/images/Upload icon.svg";
import { classes } from "./FileUpload.styles";
import styles from "./FileUpload.module.scss";

const FileUpload = ({
  heading,
  isFormEditable,
  subHeading,
  updateUserData,
  userProfilePic,
}) => {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();

  const { uploadImage, uploadImageData } = useImageUpload();

  const beforeUpload = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const isAllowedType = allowedTypes.includes(file?.file?.type);
    const isLessThan5MB = file?.file?.size / 1024 / 1024 < 5;

    if (!isAllowedType) {
      messageApi.open({
        type: "error",
        content: intl.formatMessage({ id: "label.onlyJpgAndPngFile" }),
        style: {
          marginTop: "20vh",
        },
      });
      return Upload.LIST_IGNORE;
    }

    if (!isLessThan5MB) {
      messageApi.open({
        type: "error",
        content: intl.formatMessage({ id: "label.fileUpto5MB" }),
        style: {
          marginTop: "20vh",
        },
      });
      return Upload.LIST_IGNORE;
    }
    return isAllowedType && isLessThan5MB;
  };

  const getImageSource = (uploadedImage) => {
    if (uploadedImage && typeof uploadedImage === "string") {
      return uploadedImage;
    }
    if (uploadedImage) {
      return URL.createObjectURL(uploadedImage);
    }
    return "";
  };

  const handleOnUploadImage = (file) => {
    const { onSuccess, onError, onProgress } = file;
    const isValid = beforeUpload(file);
    onProgress({ percent: 10 });
    if (typeof isValid === "string" || !isValid) {
      onError("error", file?.file);
      return;
    }
    onProgress({ percent: 50 });
    uploadImage(
      file,
      (result) => {
        // on Success
        onProgress({ percent: 100 });
        onSuccess({ body: result });
        const imageUrl = getImageSource(file?.file);
        updateUserData("profile_photo", imageUrl);
      },
      (err) => {
        //  on Error
        onError("error", err);
        messageApi.open({
          type: "error",
          content: intl.formatMessage({ id: "label.networkError" }),
          style: classes.errorMessage,
        });
      }
    );
  };

  return (
    <Base className={styles.container}>
      <Typography className={styles.headingText}>{heading}</Typography>
      <div className={styles.uploadBottomContainer}>
        <Typography className={styles.subHeadingText}>{subHeading}</Typography>
        {contextHolder}
        {userProfilePic ? (
          <UserImage
            onTrashClick={() => updateUserData("profile_photo", "")}
            src={userProfilePic}
            imageName={uploadImageData?.image_name}
          />
        ) : (
          <Upload
            className={styles.uploadContainer}
            customRequest={handleOnUploadImage}
            disabled={!isFormEditable}
          >
            <div className={styles.uploadTextContainer}>
              <UploadImageIcon className={styles.uploadImage} />
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
            </div>
          </Upload>
        )}
      </div>
    </Base>
  );
};

FileUpload.defaultProps = {
  heading: "Sent To",
  isFormEditable: false,
  subHeading: "Photo",
  updateUserData: () => {},
  userProfilePic: "",
};

FileUpload.propTypes = {
  heading: PropTypes.string,
  isFormEditable: PropTypes.bool,
  subHeading: PropTypes.string,
  updateUserData: PropTypes.func,
  userProfilePic: PropTypes.string,
};

export default FileUpload;
