import React, { useState } from 'react';
import { Avatar, Dropdown, Space, Card, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { ReactComponent as UserIcon } from '../../themes/base/assets/icons/user.svg';
import { ReactComponent as CompanyIcon } from '../../themes/base/assets/icons/building.svg';
import { ReactComponent as LockIcon } from '../../themes/base/assets/icons/lock.svg';
import { ReactComponent as LogoutIcon } from '../../themes/base/assets/icons/logout.svg';

import Styles from './profileDropdown.module.scss'

const CardDropdownOverlay = ({ userName, userEmail, userProfile, onLogout }) => (
    <Card
        className={Styles.profileMenu}
        bodyStyle={{
            padding: '16px'
        }}
        title={
            <Space
                className={Styles.profileMenuHeader}
                direction='vertical'
                size='middle'>
                <Avatar size={64} src={userProfile} icon={<UserOutlined />} />

                <Space direction="vertical" size='1' >
                    <span className={`${Styles.profileName} ${Styles.profileMenuName}`}>{userName}</span>
                    <span className={`${Styles.profileRole} ${Styles.profileMenuRole}`}>{userEmail}</span>
                </Space>
            </Space>
        }
        actions={[
            <Button
                className={Styles.logoutBtn}
                type='text'
                icon={<span><LogoutIcon /></span>}
                onClick={onLogout}
            >
                Log out
            </Button>
        ]}
    >
        <Space className={Styles.profileList} size='small' direction='vertical'>
            <Button type='text' icon={<span><UserIcon /></span>}>View Profile</Button>
            <Button type='text' icon={<span> <CompanyIcon /></span>} >Company Profile</Button>
            <Button type='text' icon={<span><LockIcon /></span>}>Change Password</Button>
        </Space>

    </Card>
);


const ProfileDropdown = ({ onLogout }) => {
    // it is temporary need to change logic
    const userName = 'Nitin';
    const userRole = 'Admin';
    const userEmail = 'nitin@gmail.com';
    const userProfilePic = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleVisibleChange = (visible) => {
        setDropdownVisible(visible);
    };

    return (
        <Space className={Styles.profileDropdown}>
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
                onOpenChange={handleVisibleChange}
                open={dropdownVisible}
            >
                <Space size={64}>
                    <Space direction="vertical" size='1' >
                        <span className={Styles.profileName} >{userName}</span>
                        <span className={Styles.profileRole}>{userRole}</span>
                    </Space>
                    <DownOutlined className={`${Styles.downIcon} ${dropdownVisible ? Styles.arrowRotated : ''}`} />
                </Space>
            </Dropdown>

        </Space>
    );
};

export default ProfileDropdown;