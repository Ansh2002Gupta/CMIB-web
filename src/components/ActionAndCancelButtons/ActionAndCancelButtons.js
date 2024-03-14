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
  customContainerStyle,
  isActionBtnDisable,
  onActionBtnClick,
  onCancelBtnClick,
}) => {
  return (
    <TwoColumn
      className={[styles.saveAndCancelBtnContainer, customContainerStyle].join(
        " "
      )}
      leftSection={
        <Button
          className={[styles.cancelBtn, customCancelBtnStyles].join(" ")}
          onClick={onCancelBtnClick}
        >
          {cancelBtnText}
        </Button>
      }
      rightSection={
        <CustomButton
          isBtnDisable={isActionBtnDisable}
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
  customContainerStyle: "",
  isActionBtnDisable: false,
  onActionBtnClick: () => {},
  onCancelBtnClick: () => {},
};

ActionAndCancelButtons.propTypes = {
  actionBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  customActionBtnStyles: PropTypes.string,
  customCancelBtnStyles: PropTypes.string,
  customContainerStyle: PropTypes.string,
  isActionBtnDisable: PropTypes.bool,
  onActionBtnClick: PropTypes.func,
  onCancelBtnClick: PropTypes.func,
};

export default ActionAndCancelButtons;
