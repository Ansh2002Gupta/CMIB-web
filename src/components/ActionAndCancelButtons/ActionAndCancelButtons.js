import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import CustomButton from "../CustomButton";
import styles from "./ActionAndCancelButtons.module.scss";

const ActionAndCancelButtons = ({
  actionBtnText,
  cancelBtnText,
  customActionBtnStyles,
  customCancelBtnStyles,
  onActionBtnClick,
  onCancelBtnClick,
}) => {
  
  return (
    <div
      className={[styles.saveAndCancelBtnContainer, customCancelBtnStyles].join(
        " "
      )}
    >
      <Button className={styles.cancelBtn} onClick={onCancelBtnClick}>
        {cancelBtnText}
      </Button>
      <CustomButton
        customStyle={[styles.saveBtn, customActionBtnStyles].join(" ")}
        btnText={actionBtnText}
        onClick={onActionBtnClick}
      />
    </div>
  );
};

ActionAndCancelButtons.defaultProps = {
  actionBtnText: "",
  cancelBtnText: "",
  customActionBtnStyles: "",
  customCancelBtnStyles: "",
  onActionBtnClick: () => {},
  onCancelBtnClick: () => {},
};

ActionAndCancelButtons.propTypes = {
  actionBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  customActionBtnStyles: PropTypes.string,
  customCancelBtnStyles: PropTypes.string,
  onActionBtnClick: PropTypes.func,
  onCancelBtnClick: PropTypes.func,
};

export default ActionAndCancelButtons;
