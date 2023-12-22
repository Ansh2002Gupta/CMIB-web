import React from "react";
import PropTypes from "prop-types";
import { Modal, Typography, Image } from "antd";

import Base from "../../core/layouts/Base/Base";

import CustomButton from "../CustomButton";
import styles from "./CustomModal.module.scss";

const CustomModal = ({
  btnText,
  headingText,
  imgElement,
  isOpen,
  onBtnClick,
  onCancel,
  subHeadingText,
}) => {
  return (
    <Modal footer={null} open={isOpen} {...{ onCancel }}>
      <Base className={styles.container}>
        <div className={styles.imageAndHeadingContainer}>
          <div>
            {imgElement ? (
              <Image src={imgElement} className={styles.image} />
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
  headingText: "",
  ImgElement: null,
  isOpen: false,
  onBtnClick: () => {},
  onCancel: () => {},
  subHeadingText: "",
};

CustomModal.propTypes = {
  btnText: PropTypes.string,
  headingText: PropTypes.string,
  ImgElement: PropTypes.node,
  isOpen: PropTypes.bool,
  onBtnClick: PropTypes.func,
  onCancel: PropTypes.func,
  subHeadingText: PropTypes.string,
};

export default CustomModal;
