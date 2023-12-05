import React, { useContext } from "react";
import { TwoColumn } from 'core/layouts';
import { Badge, Space } from "antd";
import { BellOutlined } from '@ant-design/icons';

import ProfileDropdown from "../ProfileDropdown";
import Sessions from "../Sessions/Sessions";

import { AuthContext } from "../../globalContext/auth/authProvider";
import { clearAuthAndLogout } from './../../globalContext/auth/authActions'

import styles from './header.module.scss'

function useHeader() {
  const [, authDispatch] = useContext(AuthContext);

  const onLogout = () => {
    authDispatch(clearAuthAndLogout());
  }

  return {
    onLogout
  }
}

function HeaderContainer(props) {
  const { onLogout } = useHeader()
  return (
    <TwoColumn
      className={styles.headerContainer}
      rightSection={(
        <Space size='large'>
          <Sessions />
          <Badge dot offset={[-6, 4]}>
            <BellOutlined className={styles.notificationIcon} />
          </Badge>
          <ProfileDropdown onLogout={onLogout} />
        </Space>
      )}

    />
  );
}
export default HeaderContainer;
