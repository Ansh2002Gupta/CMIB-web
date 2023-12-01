import React from 'react';
import { Button, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons'


import Styles from './sessions.module.scss';

const items = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
  {
    key: '3',
    label: 'Item 3',
  },
];
function Sessions() {
  return <Dropdown
    trigger={['click']}
    menu={{
      items,
      selectable: true,
    }}
    className={Styles.sessionContainer}
  >
    <Button shape='round' size='middle'>
      <Typography.Text> Session: </Typography.Text> &nbsp;
      <Typography.Text strong> 2023 Aug -  Sept Campus Placement</Typography.Text>
      <DownOutlined />
    </Button>
  </Dropdown>

}

export default Sessions;
