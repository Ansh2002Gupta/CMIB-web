import React from "react";
import PropTypes from "prop-types";
import { Image, Modal, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";

import CustomButton from "../CustomButton";
import styles from "./CustomModal.module.scss";

const CustomModal = ({
  btnText,
  closeIcon,
  headingText,
  imgElement,
  isOpen,
  maskClosable,
  onBtnClick,
  onCancel,
  subHeadingText,
}) => {
  return (
    <Modal
      className={styles.modal}
      footer={null}
      open={isOpen}
      {...{ onCancel, closeIcon, maskClosable }}
    >
      <Base className={styles.container}>
        <div className={styles.imageAndHeadingContainer}>
          <div>
            {imgElement ? (
              <Image
                src={imgElement}
                className={styles.image}
                preview={false}
              />
            ) : null}
          </div>
          <div className={styles.headingAndSubHeadingContainer}>
            <div>
              <Typography className={styles.heading}>{headingText}</Typography>
            </div>
            <div>
              <Typography className={styles.subHeading}>
                {subHeadingText}
              </Typography>
            </div>
          </div>
        </div>
        <CustomButton
          onClick={onBtnClick}
          {...{ btnText }}
          customStyle={styles.btn}
        />
      </Base>
    </Modal>
  );
};

CustomModal.defaultProps = {
  btnText: "",
  closeIcon: false,
  headingText: "",
  ImgElement: null,
  isOpen: false,
  maskClosable: false,
  onBtnClick: () => {},
  onCancel: () => {},
  subHeadingText: "",
};

CustomModal.propTypes = {
  btnText: PropTypes.string,
  closeIcon: PropTypes.bool,
  headingText: PropTypes.string,
  ImgElement: PropTypes.node,
  isOpen: PropTypes.bool,
  maskclosable: PropTypes.bool,
  onBtnClick: PropTypes.func,
  onCancel: PropTypes.func,
  subHeadingText: PropTypes.string,
};

export default CustomModal;