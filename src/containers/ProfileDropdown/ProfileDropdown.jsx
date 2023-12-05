import React, { useState } from 'react';
import { Avatar, Dropdown, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import CardDropdownOverlay from './CardDropdownOverlay';

import styles from './profileDropdown.module.scss'

const ProfileDropdown = ({ onLogout }) => {
    // it is temporary need to change logic
    const userName = 'Nitin';
    const userRole = 'Admin';
    const userEmail = 'nitin@gmail.com';
    const userProfilePic = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'

    const [dropdownVisible, setDropdownVisible] = useState(false);

    return (
        <Space className={styles.profileDropdown}>
            <Avatar
                src={userProfilePic}
                icon={<UserOutlined />}
                size='large'
                className='profileAvatar'
            />
            <Dropdown
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
                <Space size={16}>
                    <Space direction="vertical" size='1' >
                        <span className={styles.profileName} >{userName}</span>
                        <span className={styles.profileRole}>{userRole}</span>
                    </Space>
                    <DownOutlined className={`${styles.downIcon} ${dropdownVisible ? styles.arrowRotated : ''}`} />
                </Space>
            </Dropdown>

        </Space>
    );
};

export default ProfileDropdown;