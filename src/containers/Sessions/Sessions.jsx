import React from 'react';
import { Button, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons'

import { SESSION_ITEMS } from '../../dummyData';

import styles from './sessions.module.scss';

function Sessions() {
  // TODO: need to set items of the session dropdown according to api data.

  return <Dropdown
    trigger={['click']}
    menu={{
      items: SESSION_ITEMS,
      selectable: true,
    }}
    className={styles.sessionContainer}
  >
    <Button shape='round' size='middle'>
      <Typography.Text> Session: </Typography.Text> &nbsp;
      <Typography.Text strong> 2023 Aug -  Sept Campus Placement</Typography.Text>
      <DownOutlined />
    </Button>
  </Dropdown>
}

export default Sessions;
