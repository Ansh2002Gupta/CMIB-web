import React from 'react';
import { useIntl } from 'react-intl';
import { Avatar, Space, Card, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { ReactComponent as LogoutIcon } from '../../themes/base/assets/icons/logout.svg';

import headerActionItems from '../../constants/headerActionItems';

import styles from './profileDropdown.module.scss'

export default function CardDropdownOverlay({ userName, userEmail, userProfile, onLogout }) {
    const intl = useIntl();

    return <Card
        className={styles.profileMenu}
        bodyStyle={{
            padding: '16px'
        }}
        title={
            <Space
                className={styles.profileMenuHeader}
                direction='vertical'
                size='middle'>
                <Avatar size={64} src={userProfile} icon={<UserOutlined />} />
                <Space direction="vertical" size='1' >
                    <span className={`${styles.profileName} ${styles.profileMenuName}`}>{userName}</span>
                    <span className={`${styles.profileRole} ${styles.profileMenuRole}`}>{userEmail}</span>
                </Space>
            </Space>
        }
        actions={[
            <Button
                className={styles.logoutBtn}
                type='text'
                icon={<span><LogoutIcon /></span>}
                onClick={onLogout}
            >
                {intl.formatMessage({ id: 'label.logout' })}
            </Button>
        ]}
    >
        <Space className={styles.profileList} size='small' direction='vertical'>
            {
                headerActionItems.map(item =>
                    <Button
                        className={styles.menuBtn}
                        type='text'
                        block
                        icon={<span>{item.icon}</span>}
                    >
                        {intl.formatMessage({ id: item.id })}
                    </Button>)
            }
        </Space>
    </Card>
}
