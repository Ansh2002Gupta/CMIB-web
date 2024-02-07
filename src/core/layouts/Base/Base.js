import React from "react";
import PropTypes from "prop-types";
import { Column, Row } from "../../components";
import Styles from "./base.module.scss";

function Base({ children, className, onClick, style }) {
  return (
    <div
      className={`${Styles.baseLayout} ${className}`}
      style={style}
      {...{ onClick }}
    >
      {typeof children === "function" ? children({ Row, Column }) : children}
    </div>
  );
}

Base.defaultProps = {
  className: "",
  onClick: () => {},
  style: {},
};

Base.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Base;
