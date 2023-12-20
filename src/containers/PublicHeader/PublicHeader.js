import React, { useContext } from "react";
import { ThemeContext } from "core/providers/theme";
import { Image } from "antd";

import Base from "../../core/layouts/Base/Base";

import useResponsive from "../../core/hooks/useResponsive";
import styles from "./PublicHeader.module.scss";

const PublicHeader = () => {
  const responsive = useResponsive();
  const { getImage } = useContext(ThemeContext);

  return (
    <Base className={styles.container}>
      <div>
        <Image src={getImage("Logo")} preview={false} />
      </div>
      {responsive?.isSm && (
        <div className={styles.rightSubIconContainer}>
          <div>
            <Image src={getImage("seventyFive")} preview={false} />
          </div>
          <div>
            <Image src={getImage("g20")} preview={false} />
          </div>
          <div>
            <Image src={getImage("gloPac")} preview={false} />
          </div>
        </div>
      )}
    </Base>
  );
};

export default PublicHeader;
