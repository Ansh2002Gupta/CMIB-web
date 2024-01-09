import React from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";

import { Base } from "../../core/layouts";

import styles from "./CustomLoader.module.scss";

const CustomLoader = ({ customLoaderContainer }) => {
  return (
    <Base className={[styles.loadingContainer, customLoaderContainer]}>
      <Spin size="large" />
    </Base>
  );
};

CustomLoader.defaultProps = {
  customLoaderContainer: "",
};

CustomLoader.propTypes = {
  customLoaderContainer: PropTypes.string,
};

export default CustomLoader;
