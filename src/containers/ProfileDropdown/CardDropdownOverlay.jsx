import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Avatar, Space, Card, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { ReactComponent as LogoutIcon } from "../../themes/base/assets/icons/logout.svg";
import {
  setShowChangePasswordModal,
  setShowLogoutModal,
  setUserProfileModalNumber,
} from "../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import headerActionItems from "../../constants/headerActionItems";

import styles from "./profileDropdown.module.scss";

export default function CardDropdownOverlay({
  userName,
  userEmail,
  userProfile,
  setDropdownVisible,
}) {
  const intl = useIntl();
  const [, userProfileDispatch] = useContext(UserProfileContext);

  const handleLogoutClick = () => {
    setDropdownVisible(false);
    userProfileDispatch(setShowLogoutModal(true));
  };

  const headerActionMethods = {
    changePassword: () => {
      setDropdownVisible(false);
      userProfileDispatch(setShowChangePasswordModal(true));
    },
    viewProfile: () => {
      setDropdownVisible(false);
      userProfileDispatch(setUserProfileModalNumber(1));
    },
  };

  return (
    <Card
      className={styles.profileMenu}
      bodyStyle={{
        padding: "16px",
      }}
      title={
        <Space
          className={styles.profileMenuHeader}
          direction="vertical"
          size="middle"
        >
          <Avatar size={64} src={userProfile} icon={<UserOutlined />} />
          <Space direction="vertical" size="1">
            <span className={`${styles.profileName} ${styles.profileMenuName}`}>
              {userName}
            </span>
            <span className={`${styles.profileRole} ${styles.profileMenuRole}`}>
              {userEmail}
            </span>
          </Space>
        </Space>
      }
      actions={[
        <Button
          className={styles.logoutBtn}
          type="text"
          icon={<LogoutIcon />}
          onClick={handleLogoutClick}
        >
          {intl.formatMessage({ id: "label.logout" })}
        </Button>,
      ]}
    >
      <Space className={styles.profileList} size="small" direction="vertical">
        {headerActionItems?.map((item) => (
          <Button
            key={item?.id}
            className={styles.menuBtn}
            type="text"
            block
            icon={<span>{item.icon}</span>}
            onClick={headerActionMethods[item?.key]}
          >
            {intl.formatMessage({ id: item?.id })}
          </Button>
        ))}
      </Space>
    </Card>
  );
}
