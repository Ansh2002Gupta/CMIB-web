import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Image } from "antd";

import styles from "./CustomHeaderMenu.module.scss";

const CustomHeaderMenu = ({
  menuIcon,
  menuItems,
  menuPreview,
  triggerType,
}) => {
  return (
    <Dropdown  placement="bottomRight" menu={menuItems} trigger={[triggerType]}>
      <Image src={menuIcon} className={styles.moreIcon} preview={menuPreview} />
    </Dropdown>
  );
};

CustomHeaderMenu.defaultProps = {
  menuIcon: "",
  menuItems: {},
  menuPreview: false,
  triggerType: "click",
};

CustomHeaderMenu.propTypes = {
  menuIcon: PropTypes.string,
  menuItems: PropTypes.object,
  menuPreview: PropTypes.bool,
  triggerType: PropTypes.string,
};
export default CustomHeaderMenu;
