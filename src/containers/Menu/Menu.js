import React from "react";
import { Drawer, Layout } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import useResponsive from "core/hooks/useResponsive";

import SideMenu from "../SideMenu";

import { ReactComponent as AppLogo } from '../../themes/base/assets/icons/app-logo.svg'

import styles from "./menu.module.scss";

function MenuContainer({ openSideMenu, setOpenSideMenu }) {
  const responsive = useResponsive();
  return responsive.isMd ? (
    <Layout
      style={{
        minHeight: '100vh',
        
      }}>
      <Layout.Sider
        width={240}
        breakpoint="md"
        collapsedWidth={0}
        trigger={null}
      >
        <SideMenu logo={<AppLogo/>} />
      </Layout.Sider>
    </Layout>
  ) : (
    <Drawer
    className={styles.sideDrawer}
      title={
      <div className={styles.drawerAppLogo}>

        <AppLogo />
      </div>
    }
      placement="left"
      open={openSideMenu}
      onClose={() => setOpenSideMenu(false)}
      width="90%"
      closeIcon={<CloseOutlined/>}
     
      styles={{
        body: {
          padding: 0,
        },
        content:{
          background: '#001529',
        },
        mask: {
          backdropFilter: 'blur(3px)',
          background: 'rgba(0,0,0, 0.60)'
        }
      }}
    >
      <SideMenu />
    </Drawer>
  );
  
}
export default MenuContainer;
