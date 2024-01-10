import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import { TwoColumn } from "../../core/layouts";

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
    <TwoColumn
      className={[styles.saveAndCancelBtnContainer, customCancelBtnStyles].join(
        " "
      )}
      leftSection={
        <Button className={styles.cancelBtn} onClick={onCancelBtnClick}>
          {cancelBtnText}
        </Button>
      }
      rightSection={
        <CustomButton
          customStyle={[styles.saveBtn, customActionBtnStyles].join(" ")}
          btnText={actionBtnText}
          onClick={onActionBtnClick}
        />
      }
    />
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
