import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography, Upload, message } from "antd";

import Base from "../../core/layouts/Base/Base";
import { TwoRow } from "../../core/layouts";

import UserImage from "../UserImage/UserImage";
import { ReactComponent as UploadImageIcon } from "../../themes/base/assets/images/Upload icon.svg";
import { classes } from "./FileUpload.styles";
import styles from "./FileUpload.module.scss";

const FileUpload = ({
  heading,
  isFormEditable,
  subHeading,
  updateUserData,
  userImageName,
  userProfilePic,
}) => {
  const intl = useIntl();
  const [messageApi, messageContextHolder] = message.useMessage();

  const beforeUpload = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const isAllowedType = allowedTypes.includes(file?.file?.type);
    const isLessThan5MB = file?.file?.size / 1024 / 1024 < 5;

    if (!isAllowedType) {
      messageApi.open({
        type: "error",
        content: intl.formatMessage({ id: "label.onlyJpgAndPngFile" }),
        style: classes.errorMessage,
      });
      return Upload.LIST_IGNORE;
    }

    if (!isLessThan5MB) {
      messageApi.open({
        type: "error",
        content: intl.formatMessage({ id: "label.fileUpto5MB" }),
        style: classes.errorMessage,
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
    const { onError } = file;
    const isValid = beforeUpload(file);
    if (typeof isValid === "string" || !isValid) {
      onError("error", file?.file);
      return;
    }
    const imageUrl = getImageSource(file?.file);
    updateUserData("profile_photo", file);
    updateUserData("profile_photo_url", imageUrl);
  };

  const removeSelctedImage = () => {
    updateUserData("profile_photo_url", "");
    updateUserData("profile_photo", "");
  };

  return (
    <Base className={styles.container}>
      <Typography className={styles.headingText}>{heading}</Typography>
      <div className={styles.uploadBottomContainer}>
        <Typography className={styles.subHeadingText}>{subHeading}</Typography>
        {messageContextHolder}
        {userProfilePic ? (
          <UserImage
            onTrashClick={removeSelctedImage}
            src={userProfilePic}
            imageName={userImageName}
            editable={isFormEditable}
          />
        ) : (
          <Upload
            className={styles.uploadContainer}
            customRequest={handleOnUploadImage}
            disabled={!isFormEditable}
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
  heading: "Sent To",
  isFormEditable: false,
  subHeading: "Photo",
  updateUserData: () => {},
  userProfilePic: "",
  userImageName: "",
};

FileUpload.propTypes = {
  heading: PropTypes.string,
  isFormEditable: PropTypes.bool,
  subHeading: PropTypes.string,
  updateUserData: PropTypes.func,
  userProfilePic: PropTypes.string,
  userImageName: PropTypes.string,
};

export default FileUpload;
