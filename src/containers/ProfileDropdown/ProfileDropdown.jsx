import React, { useState } from 'react';
import { Avatar, Dropdown, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import CardDropdownOverlay from './CardDropdownOverlay';
import useResponsive from '../../core/hooks/useResponsive';

import styles from './profileDropdown.module.scss'

const ProfileDropdown = ({ onLogout }) => {
    // TODO: need to add  logic for getting user data
    const userName = 'Nitin';
    const userRole = 'Admin';
    const userEmail = 'nitin@gmail.com';
    const userProfilePic = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const responsive = useResponsive();

    return <Dropdown
        dropdownRender={() =>
            <CardDropdownOverlay
                userName={userName}
                userEmail={userEmail}
                userProfile={userProfilePic}
                onLogout={onLogout}
            />}
        trigger={['click']}
        onOpenChange={(visible) => setDropdownVisible(visible)}
        open={dropdownVisible}
    >
        <Space className={styles.profileDropdown}>
            <Avatar
                src={userProfilePic}
                icon={<UserOutlined />}
                size='large'
                className='profileAvatar'
            />
            {
                responsive.isMd && <Space size={16}>
                    <Space direction="vertical" size='1' >
                        <span className={styles.profileName} >{userName}</span>
                        <span className={styles.profileRole}>{userRole}</span>
                    </Space>
                    <DownOutlined className={`${styles.downIcon} ${dropdownVisible ? styles.arrowRotated : ''}`} />
                </Space>
            }
        </Space>
    </Dropdown>
};

export default ProfileDropdown;