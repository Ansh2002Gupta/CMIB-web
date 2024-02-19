import React, { useState, useContext } from "react";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import CardDropdownOverlay from "./CardDropdownOverlay";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useResponsive from "../../core/hooks/useResponsive";
import { splitName } from "../../constant/utils";
import styles from "./profileDropdown.module.scss";

const ProfileDropdown = () => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const userData = userProfileDetails?.userDetails;

  const userName = userData?.name || "";
  const userRole = userData?.user_type || "";
  const userEmail = userData?.email || "";
  const userProfilePic = userData?.profile_photo || "";
  const { firstName, lastName } = splitName(userName);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const responsive = useResponsive();

  return (
    <Dropdown
      dropdownRender={() => (
        <CardDropdownOverlay
          userProfile={userProfilePic}
          {...{ userName, userEmail, setDropdownVisible }}
        />
      )}
      trigger={["click"]}
      onOpenChange={(visible) => setDropdownVisible(visible)}
      open={dropdownVisible}
    >
      <Space className={styles.profileDropdown}>
        <ProfileIcon
          firstName={firstName}
          lastName={lastName}
          profileImage={userProfilePic}
          size="xs"
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
