import React from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";

import { Base } from "../../core/layouts";

import styles from "./CustomLoader.module.scss";

const CustomLoader = ({ customLoaderContainerStyles, size }) => {
  return (
    <Base
      className={[styles.loadingContainer, customLoaderContainerStyles].join(
        " "
      )}
    >
      <Spin size={size || "large"} />
    </Base>
  );
};

CustomLoader.defaultProps = {
  customLoaderContainerStyles: "",
  size: "",
};

CustomLoader.propTypes = {
  customLoaderContainerStyles: PropTypes.string,
};

export default CustomLoader;
