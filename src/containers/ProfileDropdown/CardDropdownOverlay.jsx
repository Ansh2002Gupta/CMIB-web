import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Avatar, Space, Card, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { ReactComponent as UserIcon } from "../../themes/base/assets/icons/user.svg";
import { ReactComponent as LockIcon } from "../../themes/base/assets/icons/lock.svg";

import { ReactComponent as LogoutIcon } from "../../themes/base/assets/icons/logout.svg";
import useHeader from "../../core/hooks/useHeader";
import { setShowLogoutModal } from "../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import headerActionItems from "../../constants/headerActionItems";

import styles from "./profileDropdown.module.scss";

export default function CardDropdownOverlay({
  userName,
  userEmail,
  userProfile,
  setCurrentOpenModal,
  setDropdownVisible,
}) {
  const intl = useIntl();
  const [, userProfileDispatch] = useContext(UserProfileContext);

  const handleLogoutClick = () => {
    setDropdownVisible(false)
    userProfileDispatch(setShowLogoutModal(true));
  }
  const { onLogout } = useHeader();

  const headerActionItems = [
    {
      id: 1,
      onClick: () => {
        setDropdownVisible(false);
        setCurrentOpenModal(1);
      },
      label: "label.viewProfile",
      icon: <UserIcon />,
    },
    {
      id: 2,
      onClick: () => {
      },
      label: "label.changePassword",
      icon: <LockIcon />,
    },
  ];

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
        {headerActionItems.map((item) => (
          <Button
            key={item?.id}
            className={styles.menuBtn}
            type="text"
            block
            icon={<span>{item.icon}</span>}
            onClick={item?.onClick}
          >
            {intl.formatMessage({ id: item.label })}
          </Button>
        ))}
      </Space>
    </Card>
  );
}
