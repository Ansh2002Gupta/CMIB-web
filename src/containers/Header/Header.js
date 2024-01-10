import React, { useContext } from "react";
import useResponsive from "../../core/hooks/useResponsive";
import { TwoColumn } from "core/layouts";
import { Badge, Button, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";

import ProfileDropdown from "../ProfileDropdown";
import Sessions from "../Sessions/Sessions";

import { AuthContext } from "../../globalContext/auth/authProvider";
import { clearAuthAndLogout } from "./../../globalContext/auth/authActions";

import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { ReactComponent as MenuIcon } from "../../themes/base/assets/icons/menu.svg";
import { LOGIN } from "../../routes/routeNames";
import styles from "./header.module.scss";

function useHeader() {
  const [, authDispatch] = useContext(AuthContext);
  const { navigateScreen: navigate } = useNavigateScreen();

  const onLogout = () => {
    authDispatch(clearAuthAndLogout());
    window.location.reload();
  };

  return {
    onLogout,
  };
}

function HeaderContainer({ openSideMenu, setOpenSideMenu }) {
  const { onLogout } = useHeader();

  const responsive = useResponsive();

  return (
    <TwoColumn
      className={styles.headerContainer}
      leftSection={
        !responsive.isMd && (
          <Button
            icon={<MenuIcon />}
            type="text"
            onClick={() => setOpenSideMenu(true)}
          />
        )
      }
      rightSection={
        <Space size="large">
          {responsive.isMd && <Sessions />}
          <Badge dot offset={[-6, 4]}>
            <BellOutlined className={styles.notificationIcon} />
          </Badge>
          <ProfileDropdown onLogout={onLogout} />
        </Space>
      }
    />
  );
}
export default HeaderContainer;
