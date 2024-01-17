import React, { useState ,useEffect} from "react";
import { Avatar, Dropdown, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { getItem, setItem } from "../../services/encrypted-storage-service";
import useFetch from "../../core/hooks/useFetch";
import useHeader from "../../core/hooks/useHeader";
import CardDropdownOverlay from "./CardDropdownOverlay";
import useResponsive from "../../core/hooks/useResponsive";
import { STORAGE_KEYS } from "../../constant/constant";
import { CORE_MENU_PROFILE, ADMIN_ROUTE } from "../../constant/apiEndpoints";
import styles from "./profileDropdown.module.scss";

const ProfileDropdown = () => {
  const { data, error, fetchData, isError } = useFetch({
    url: CORE_MENU_PROFILE + ADMIN_ROUTE,otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const userData= getItem(STORAGE_KEYS?.USER_DATA);
 
  const userName = userData?.name;
  const userRole = userData?.user_type;
  const userEmail = userData?.email;
  const userProfilePic = userData?.profile_photo;

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const responsive = useResponsive();
  const { onLogout } = useHeader();

  useEffect(()=>{
    if(!getItem(STORAGE_KEYS?.USER_DATA))
    {
      fetchData()
    }

  },[])

  useEffect(() => {
    if (data) {
      setItem(STORAGE_KEYS?.USER_DATA,data);
    }
    if(isError){
      onLogout();
    }
  }, [data,isError,error]);

  return (
    <Dropdown
      dropdownRender={() => (
        <CardDropdownOverlay
          userName={userName}
          userEmail={userEmail}
          userProfile={userProfilePic}
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
