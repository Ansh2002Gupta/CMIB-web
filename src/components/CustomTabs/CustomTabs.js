import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

import styles from './CustomTabs.module.scss';

const CustomTabs = ({ activeTab, setActiveTab, tabs }) => {
  const selectTab = (tabName) => {
    setActiveTab(tabName);
  };

  const tabClass = (tabKey) => {
    let classes = `${styles.tab}`;
    if (activeTab === tabKey) classes += ` ${styles.active}`;
    return classes;
  };

  return (
    <div className={styles['tab-container']}>
      <div className={styles['tab-box']}>
        {tabs?.map((tab, index) => (
          <Typography
            key={tab.key}
            className={tabClass(tab.key, index)}
            onClick={() => selectTab(tab.key)}
          >
            {tab.title}
          </Typography>
        ))}
      </div>
    </div>
  );
};

CustomTabs.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  tab: PropTypes.object,
};

export default CustomTabs;
