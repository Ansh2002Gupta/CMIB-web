import React from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";

import { Base } from "../../core/layouts";

import styles from "./CustomLoader.module.scss";

const CustomLoader = ({ customLoaderContainerStyles }) => {
  return (
    <Base
      className={[styles.loadingContainer, customLoaderContainerStyles].join(
        " "
      )}
    >
      <Spin size="large" />
    </Base>
  );
};

CustomLoader.defaultProps = {
  customLoaderContainerStyles: "",
};

CustomLoader.propTypes = {
  customLoaderContainerStyles: PropTypes.string,
};

export default CustomLoader;
