import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

import styles from "./CommonModal.module.scss";
import { classes } from "./CommonModal.styles";
import "./Override.css";

const CommonModal = ({
  children,
  closeIcon,
  footer,
  isOpen,
  onCancel,
  maskClosable,
  width,
}) => {
  return (
    <Modal
      className={[styles.modal, "customModal"]}
      footer={footer}
      width={width}
      centered
      open={isOpen}
      {...{ onCancel, closeIcon, maskClosable }}
      style={classes.modalStyles}
    >
      {children}
    </Modal>
  );
};

CommonModal.defaultProps = {
  children: null,
  closeIcon: false,
  footer: null,
  isOpen: false,
  onCancel: () => {},
  maskClosable: false,
};

CommonModal.propTypes = {
  children: PropTypes.node,
  btnText: PropTypes.string,
  closeIcon: PropTypes.bool,
  footer: PropTypes.bool,
  onCancel: PropTypes.func,
  maskclosable: PropTypes.bool,
  width: PropTypes.number,
};

export default CommonModal;
