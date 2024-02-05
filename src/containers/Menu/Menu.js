import React from "react";
import PropTypes from "prop-types";
import { Drawer, Layout } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import SideMenu from "../SideMenu";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "core/hooks/useResponsive";
import { DASHBOARD } from "../../routes/routeNames";
import { ReactComponent as AppLogo } from "../../themes/base/assets/icons/app-logo.svg";
import styles from "./menu.module.scss";

function MenuContainer({ openSideMenu, setIsModalOpen, setOpenSideMenu }) {
  const { navigateScreen: navigate } = useNavigateScreen();
  const responsive = useResponsive();

  const handleOnClickLogo = () => {
    navigate(DASHBOARD);
    setOpenSideMenu(false);
  };

  return responsive.isMd ? (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Layout.Sider
        width="100%"
        breakpoint="md"
        collapsedWidth={0}
        trigger={null}
      >
        <SideMenu
          logo={<AppLogo className={styles.cmibLogo} />}
          {...{ setIsModalOpen, setOpenSideMenu }}
        />
      </Layout.Sider>
    </Layout>
  ) : (
    <Drawer
      className={styles.sideDrawer}
      placement="left"
      open={openSideMenu}
      onClose={() => setOpenSideMenu(false)}
      width="90%"
      closeIcon={<CloseOutlined className={styles.crossIcon} />}
      styles={{
        body: {
          padding: 0,
        },
        content: {
          background: "var(--sidemenuBgColor, #001529)",
        },
        mask: {
          backdropFilter: "blur(3px)",
          background: "var(--sideMenuMaskBg, rgba(0,0,0,0.60))",
        },
      }}
    >
      <SideMenu
        logo={
          <AppLogo
            className={styles.drawerAppLogo}
            onClick={handleOnClickLogo}
          />
        }
        {...{ setIsModalOpen, setOpenSideMenu }}
      />
    </Drawer>
  );
}

MenuContainer.defaultProps = {
  setIsModalOpen: () => {},
  setOpenSideMenu: () => {},
  openSideMenu: false,
};

MenuContainer.propTypes = {
  setIsModalOpen: PropTypes.func,
  setOpenSideMenu: PropTypes.func,
  openSideMenu: PropTypes.bool,
};

export default MenuContainer;
