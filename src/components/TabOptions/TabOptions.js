import React from "react";
import { Tabs } from 'antd';
import Styles from "./TabOptions.module.scss";

const TabOptions = () => {
  return (
    <div className={Styles.mainContainer}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Tab 1',
            key: '1',
          },
          {
            label: 'Tab 2',
            key: '2',
          },
        ]}
      />
    </div>
  );
};

export default TabOptions;
