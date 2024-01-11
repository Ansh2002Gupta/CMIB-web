import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "antd";

import styles from "./CustomTabs.module.scss";

const CustomTabs = ({
  activeTab,
  setActiveTab,
  tabs,
  tabsKeyText,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabsKeyName = tabsKeyText || "tab";

  const tabClass = (tabKey) => {
    let classes = `${styles.tab}`;
    if (activeTab === tabKey) classes += ` ${styles.active}`;
    return classes;
  };

  const handleSelectTab = (tabName) => {
    setActiveTab(tabName);
    setSearchParams((params) => {
      params.set(tabsKeyName, tabName);
      return params;
    });
  };

  useEffect(() => {
    let tabQueryParam = searchParams.get(tabsKeyName);
    if (tabs.some((tab) => tab.key === tabQueryParam)) {
      setActiveTab(tabQueryParam);
    } else {
      setActiveTab(tabs[0].key);
      setSearchParams((params) => {
        params.set(tabsKeyName, tabs[0].key);
        return params;
      });
    }
  }, [tabs, setActiveTab]);

  return (
    <div className={styles["tab-container"]}>
      <div className={styles["tab-box"]}>
        {tabs?.map((tab, index) => (
          <Typography
            key={tab.key}
            className={tabClass(tab.key, index)}
            onClick={() => handleSelectTab(tab.key)}
          >
            {tab.title}
          </Typography>
        ))}
      </div>
    </div>
  );
};

CustomTabs.defaultProps = {
  activeTab: "",
  setActiveTab: () => {},
  tabs: [],
  tabsKeyText: "",
};

CustomTabs.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  tabs: PropTypes.array,
  tabsKeyText: PropTypes.string,
};

export default CustomTabs;
