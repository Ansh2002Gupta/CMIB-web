import React, { useContext } from "react";
import { ThemeContext } from "core/providers/theme";
import { Image } from "antd";

import Base from "../../core/layouts/Base/Base";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";
import { LOGIN } from "../../routes/routeNames";
import styles from "./PublicHeader.module.scss";

const PublicHeader = () => {
  const responsive = useResponsive();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();

  const handleOnLogoClick = () => {
    navigate(LOGIN)
  }

  return (
    <Base className={styles.container}>
      <div className={styles.logo}>
        <Image src={getImage("Logo")} preview={false} className={styles.logo} onClick={handleOnLogoClick} />
      </div>
      {responsive?.isSm && (
        <div className={styles.rightSubIconContainer}>
          <Image
            src={getImage("seventyFive")}
            preview={false}
            className={styles.icons}
          />
          <Image
            src={getImage("g20")}
            preview={false}
            className={styles.icons}
          />
          <Image
            src={getImage("gloPac")}
            preview={false}
            className={styles.icons}
          />
        </div>
      )}
    </Base>
  );
};

export default PublicHeader;
