import React, { useContext } from "react";
import { ThemeContext } from "core/providers/theme";
import { Image } from "antd";

import Base from "../../core/layouts/Base/Base";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { LOGIN } from "../../routes/routeNames";
import styles from "./PublicHeader.module.scss";

const PublicHeader = () => {
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();

  const handleOnLogoClick = () => {
    navigate(LOGIN);
  };

  return (
    <Base className={styles.container}>
      <div className={styles.logo}>
        <Image
          src={getImage("publicLogoWhite")}
          preview={false}
          className={styles.logo}
          onClick={handleOnLogoClick}
        />
      </div>
    </Base>
  );
};

export default PublicHeader;
