import React from "react";
import { Image, Typography, Upload, message } from "antd";

import Base from "../../core/layouts/Base/Base";

import trashIcon from "../../themes/base/assets/images/trash.svg";
import uploadImg from "../../themes/base/assets/images/Upload icon.svg";
import styles from "./FileUpload.module.scss";

const FileUpload = ({ isOnlyImage, heading, subHeading }) => {
  const TYPES = {
    IMAGE_ONLY: ".jpg,.jpeg,.png,.PNG",
    ANY_FILE: "*",
  };
  const props = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      const isFileLessThanEqualTo2MB = file.size / 1024 / 1024 <= 2;
      if (!isFileLessThanEqualTo2MB) {
        message.error("Image must be smaller than 2MB!");
        return Upload.LIST_IGNORE;
      }
      return isImage || Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    accept: isOnlyImage ? TYPES.IMAGE_ONLY : TYPES.ANY_FILE, // This is where you specify the accepted file types
  };
  return (
    <Base className={styles.container}>
      <Typography className={styles.headingText}>{heading}</Typography>
      <div className={styles.uploadBottomContainer}>
        <Typography className={styles.subHeadingText}>{subHeading}</Typography>
        <Upload
          className={styles.uploadContainer}
          {...{ props }}
          >
          {/* {fileList.length >= 8 ? null : uploadButton} */}
          <div className={styles.uploadTextContainer}>
            <Image
              src={uploadImg}
              preview={false}
              className={styles.uploadImage}
            />
            <div>
              <Typography className={styles.uploadText}>
                Drag & drop files or Browse
              </Typography>
              <Typography className={styles.uploadInfo}>
                Supported formates: png, jpg, jpeg
              </Typography>
            </div>
          </div>
        </Upload>
      </div>
    </Base>
  );
};

// action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
// listType="picture-card"
// fileList={fileList}
// onPreview={handlePreview}
// onChange={handleChange}

FileUpload.defaultProps = {
  heading: "Sent To",
  subHeading: "Photo",
};

export default FileUpload;
