import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Typography, Image } from "antd";

import { ThemeContext } from "core/providers/theme";

import CommonModal from "../CommonModal";
import styles from "./Dialog.style";

const Dialog = ({
  children,
  heading,
  omitCloseBtn,
  // maxWidth, // TODO: check does we need this or not
  onClose,
}) => {
  const { getImage } = useContext(ThemeContext);

  return (
    <CommonModal>
      <div style={styles.headingRow}>
        <div>
          {heading ? (
            <Typography customTextStyle={styles.heading} fontWeight="600">
              {heading}
            </Typography>
          ) : (
            <></>
          )}
        </div>
        <div>
          {!omitCloseBtn ? (
            <Typography onClick={onClose} style={styles.dialogCloseBtn}>
              <Image src={getImage("cross")} />
            </Typography>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div style={styles.content}>{children}</div>
    </CommonModal>
  );
};

Dialog.defaultProps = {
  children: <></>,
  maxWidth: "",
  heading: "",
  omitCloseBtn: false,
  onClose: () => {},
  preventCloseOnBackdropClick: false,
};

Dialog.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
  omitCloseBtn: PropTypes.bool,
  maxWidth: PropTypes.string,
  onClose: PropTypes.func,
  preventCloseOnBackdropClick: PropTypes.bool,
};

export default Dialog;
