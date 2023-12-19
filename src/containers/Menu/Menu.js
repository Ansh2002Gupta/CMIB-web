import React from "react";

import { TwoRow } from "core/layouts";
import useResponsive from "core/hooks/useResponsive";

import LogoComponent from "../../components/Logo";
import SideMenu from "../SideMenu";
import styles from "./menu.module.scss";

function MenuContainer() {
  const responsive = useResponsive();
  return responsive.isSm ? (
    <TwoRow
      className={styles.sideMenuContainer}
      topSection={<LogoComponent />}
      bottomSection={<SideMenu />}
    />
  ) : (
    <TwoRow className={styles.sideMenuContainer} bottomSection={<SideMenu />} />
  );
}
export default MenuContainer;
