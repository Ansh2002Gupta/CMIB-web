import React from 'react';
import { Drawer, Layout } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import useNavigateScreen from '../../core/hooks/useNavigateScreen';
import useResponsive from 'core/hooks/useResponsive';
import SideMenu from '../SideMenu';
import { DASHBOARD } from '../../routes/routeNames';
import { ReactComponent as AppLogo } from '../../themes/base/assets/icons/app-logo.svg';
import styles from './menu.module.scss';

function MenuContainer({ openSideMenu, setOpenSideMenu }) {
  const { navigateScreen: navigate } = useNavigateScreen();
  const responsive = useResponsive();

  const handleOnClickLogo = () => {
    navigate(DASHBOARD);
    setOpenSideMenu(false)
  };

  return responsive.isMd ? (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout.Sider
        width="100%"
        breakpoint='md'
        collapsedWidth={0}
        trigger={null}
      >
        <SideMenu logo={<AppLogo />} />
      </Layout.Sider>
    </Layout>
  ) : (
    <Drawer
      className={styles.sideDrawer}
      placement='left'
      open={openSideMenu}
      onClose={() => setOpenSideMenu(false)}
      width='90%'
      closeIcon={<CloseOutlined />}
      title={
        <div className={styles.drawerAppLogoContainer}>
          <AppLogo className={styles.drawerAppLogo} onClick={handleOnClickLogo} />
        </div>
      }
      styles={{
        body: {
          padding: 0,
        },
        content: {
          background: 'var(--sidemenuBgColor, #001529)',
        },
        mask: {
          backdropFilter: 'blur(3px)',
          background: 'var(--sideMenuMaskBg, rgba(0,0,0,0.60))',
        },
      }}
    >
      <SideMenu />
    </Drawer>
  );
}

export default MenuContainer;
