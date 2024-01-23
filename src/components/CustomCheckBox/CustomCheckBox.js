import PropTypes from "prop-types";
import { Checkbox } from "antd";

import styles from "./CustomCheckBox.module.scss";
import "./override.css";

const CustomCheckBox = ({ checked, children, customStyles, onChange }) => {
  return (
    <Checkbox
      className={[styles.box, customStyles].join(" ")}
      onChange={onChange}
      checked={checked}
    >
      {children}
    </Checkbox>
  );
};

CustomCheckBox.defaultProps = {
  checked: false,
  customStyles: "",
  onChange: () => {},
};

CustomCheckBox.propTypes = {
  checked: PropTypes.bool,
  customStyles: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomCheckBox;
