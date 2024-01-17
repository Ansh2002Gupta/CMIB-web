import React, { useContext } from "react";
import { Image } from "antd";

import { ThemeContext } from "core/providers/theme";

import styles from "./PublicFoter.module.scss";

const PublicFooter = () => {
  const { getImage } = useContext(ThemeContext);

  return (
    <Image
      preview={false}
      src={getImage("publicFooter")}
      className={styles.footer}
    />
  );
};

export default PublicFooter;
