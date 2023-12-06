import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import Base from "../../core/layouts/Base/Base";

import GreenButton from "../GreenButton";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./ButtonAndLink.module.scss";

const ButtonAndLink = ({
  bottomLinkText,
  topBtnText,
  isTopBtnDisable,
  linkRedirection,
  onTopBtnClick,
}) => {
  const { navigateScreen: navigate } = useNavigateScreen();
  return (
    <Base className={styles.container}>
      <GreenButton btnText={topBtnText} isBtnDisable={isTopBtnDisable} onClick={onTopBtnClick} />
      <div className={styles.linkContainer}>
        <Button
          className={styles.backToLoginLink}
          type="link"
          onClick={() => {
            linkRedirection && navigate(linkRedirection);
          }}
        >
          {bottomLinkText}
        </Button>
      </div>
    </Base>
  );
};

ButtonAndLink.defaultProps = {
  bottomLinkText: "",
  topBtnText: "",
  isTopBtnDisable: false,
  linkRedirection: "",
  onTopBtnClick: () => {},
};

ButtonAndLink.propTypes = {
  isTopBtnDisable: PropTypes.bool,
  bottomLinkText: PropTypes.string,
  topBtnText: PropTypes.string,
  linkRedirection: PropTypes.string,
  onTopBtnClick: PropTypes.func,
};

export default ButtonAndLink;
