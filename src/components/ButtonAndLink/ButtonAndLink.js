import React from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";

import GreenButton from "../GreenButton";
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
}) => {
  const { navigateScreen: navigate } = useNavigateScreen();
  return (
    <div>
      {!!error && <Typography className={styles.error}>{error}</Typography>}
      <Base className={styles.container}>
        <GreenButton
          {...{ loading }}
          btnText={topBtnText}
          isBtnDisable={isTopBtnDisable}
          onClick={onTopBtnClick}
        />
        <div className={styles.linkContainer}>
          <Button
            disabled={loading}
            className={styles.backToLoginLink}
            type="link"
            onClick={() => {
              linkRedirection && navigate(linkRedirection);
              onLinkClick && onLinkClick();
            }}
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
};

export default ButtonAndLink;
