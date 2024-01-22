import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

import styles from "./CommonModal.module.scss";
import "./Override.css";

const CommonModal = ({
  children,
  closeIcon,
  isOpen,
  onCancel,
  maskClosable,
}) => {
  return (
    <Modal
      className={[styles.modal, "customModal"]}
      footer={null}
      open={isOpen}
      {...{ onCancel, closeIcon, maskClosable }}
    >
      {children}
    </Modal>
  );
};

CommonModal.defaultProps = {
  children: null,
  closeIcon: false,
  isOpen: false,
  onCancel: () => {},
  maskClosable: false,
};

CommonModal.propTypes = {
  children: PropTypes.node,
  btnText: PropTypes.string,
  closeIcon: PropTypes.bool,
  onCancel: PropTypes.func,
  maskclosable: PropTypes.bool,
};

export default CommonModal;
