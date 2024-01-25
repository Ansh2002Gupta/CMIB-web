import React, { useContext } from "react";
import { Badge, Button, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";

import { TwoColumn } from "core/layouts";

import ConfirmLogout from "../ConfirmLogout";
import ChangePassword from "../ChangePassword";
import ProfileDropdown from "../ProfileDropdown";
import Sessions from "../Sessions/Sessions";
import useResponsive from "../../core/hooks/useResponsive";
import { ReactComponent as MenuIcon } from "../../themes/base/assets/icons/menu.svg";
import styles from "./header.module.scss";

function HeaderContainer({ openSideMenu, setOpenSideMenu }) {
  const responsive = useResponsive();
  return (
    <>
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
            <ProfileDropdown />
          </Space>
        }
      />
      <ConfirmLogout />
      <ChangePassword />
    </>
  );
}
export default HeaderContainer;
