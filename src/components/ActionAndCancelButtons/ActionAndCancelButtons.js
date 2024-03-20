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
  customContainerStyles,
  isActionBtnDisable,
  isLoading,
  onActionBtnClick,
  onCancelBtnClick,
}) => {
  return (
    <TwoColumn
      className={[styles.saveAndCancelBtnContainer, customContainerStyles].join(
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
          btnText={actionBtnText}
          customStyle={[styles.saveBtn, customActionBtnStyles].join(" ")}
          isBtnDisable={isActionBtnDisable}
          loading={isLoading}
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
  loading: false,
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
  loading: PropTypes.bool,
  onActionBtnClick: PropTypes.func,
  onCancelBtnClick: PropTypes.func,
};

export default ActionAndCancelButtons;
