import React, { useState, useContext } from "react";
import { Avatar, Dropdown, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import CardDropdownOverlay from "./CardDropdownOverlay";
import useResponsive from "../../core/hooks/useResponsive";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import styles from "./profileDropdown.module.scss";

const ProfileDropdown = () => {
  // TODO: To find logic to put Role base on Role ID
  const [userProfileState] = useContext(UserProfileContext);

  const loggedInUserInfo = userProfileState.userDetails || {};
  const userName = loggedInUserInfo?.name;
  const userRole = "Admin";
  const userEmail = loggedInUserInfo?.email;
  const userProfilePic = loggedInUserInfo?.profile_photo;

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const responsive = useResponsive();

  return (
    <Dropdown
      dropdownRender={() => (
        <CardDropdownOverlay
          userName={userName}
          userEmail={userEmail}
          userProfile={userProfilePic}
          setDropdownVisible={setDropdownVisible}
        />
      )}
      trigger={["click"]}
      onOpenChange={(visible) => setDropdownVisible(visible)}
      open={dropdownVisible}
    >
      <Space className={styles.profileDropdown}>
        <Avatar
          src={userProfilePic}
          icon={<UserOutlined />}
          size="large"
          className="profileAvatar"
        />
        {responsive.isMd && (
          <Space size={16}>
            <Space direction="vertical" size="1">
              <span className={styles.profileName}>{userName}</span>
              <span className={styles.profileRole}>{userRole}</span>
            </Space>
            <DownOutlined
              className={`${styles.downIcon} ${
                dropdownVisible ? styles.arrowRotated : ""
              }`}
            />
          </Space>
        )}
      </Space>
    </Dropdown>
  );
};

export default ProfileDropdown;
