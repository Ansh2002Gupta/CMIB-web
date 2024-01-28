import React from "react";
import PropTypes from "prop-types";

import styles from "./Slider.module.css";

const Slider = ({ maximumValue, minimumValue, onChange, step, value }) => {
  return (
    <div className={styles["controls"]}>
      <input
        type="range"
        value={value}
        min={minimumValue || 1}
        max={maximumValue || 3}
        step={step || 0.1}
        aria-labelledby="Label"
        onChange={(e) => {
          onChange(+e.target.value);
        }}
        className={styles["range"]}
      />
    </div>
  );
};

Slider.defaultProps = {
  maximumValue: 3,
  minimumValue: 1,
  onChange: () => {},
  step: 0.1,
  value: 1,
};

Slider.propTypes = {
  maximumValue: PropTypes.number,
  minimumValue: PropTypes.number,
  onChange: PropTypes.func,
  step: PropTypes.number,
  value: PropTypes.number,
};

export default Slider;
