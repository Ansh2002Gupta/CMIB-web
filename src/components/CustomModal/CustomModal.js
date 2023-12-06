import React from "react";
import PropTypes from "prop-types";
import { Image, Modal, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";

import GreenButton from "../GreenButton";
import styles from "./CustomModal.module.scss";

const CustomModal = ({
  btnText,
  headingText,
  imageSrc,
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
            {!!imageSrc && (
              <Image src={imageSrc} preview={false} className={styles.image} />
            )}
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
        <GreenButton
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
  imageSrc: "",
  isOpen: false,
  onBtnClick: () => {},
  onCancel: () => {},
  subHeadingText: "",
};

CustomModal.propTypes = {
  btnText: PropTypes.string,
  headingText: PropTypes.string,
  imageSrc: PropTypes.string,
  isOpen: PropTypes.bool,
  onBtnClick: PropTypes.func,
  onCancel: PropTypes.func,
  subHeadingText: PropTypes.string,
};

export default CustomModal;
