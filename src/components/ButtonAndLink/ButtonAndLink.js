import React from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";

import CustomButton from "../CustomButton";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./ButtonAndLink.module.scss";

const ButtonAndLink = ({
  bottomLinkText,
  error,
  isTopBtnDisable,
  linkRedirection,
  loading,
  onLinkClick,
  onTopBtnClick,
  topBtnText,
  type,
}) => {
  const { navigateScreen: navigate } = useNavigateScreen();
  const handleOnLinkClick = () => {
    linkRedirection && navigate(linkRedirection);
    onLinkClick && onLinkClick();
  };

  return (
    <div>
      {!!error && <Typography className={styles.error}>{error}</Typography>}
      <Base className={styles.container}>
        <CustomButton
          {...{ loading, type }}
          btnText={topBtnText}
          isBtnDisable={isTopBtnDisable}
          onClick={onTopBtnClick}
        />
        <div className={styles.linkContainer}>
          <Button
            disabled={loading}
            className={styles.backToLoginLink}
            type="link"
            onClick={() => handleOnLinkClick()}
          >
            {bottomLinkText}
          </Button>
        </div>
      </Base>
    </div>
  );
};

ButtonAndLink.defaultProps = {
  bottomLinkText: "",
  error: "",
  isTopBtnDisable: false,
  linkRedirection: "",
  loading: false,
  onLinkClick: () => {},
  onTopBtnClick: () => {},
  topBtnText: "",
  type: "",
};

ButtonAndLink.propTypes = {
  bottomLinkText: PropTypes.string,
  error: PropTypes.string,
  isTopBtnDisable: PropTypes.bool,
  linkRedirection: PropTypes.string,
  loading: PropTypes.bool,
  onLinkClick: PropTypes.func,
  onTopBtnClick: PropTypes.func,
  topBtnText: PropTypes.string,
  type: PropTypes.string,
};

export default ButtonAndLink;
