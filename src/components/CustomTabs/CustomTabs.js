import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "antd";

import styles from "./CustomTabs.module.scss";

const CustomTabs = ({ activeTab, setActiveTab, tabs }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabClass = (tabKey) => {
    let classes = `${styles.tab}`;
    if (activeTab === tabKey) classes += ` ${styles.active}`;
    return classes;
  };

  const handleSelectTab = (tabName) => {
    setActiveTab(tabName);
    setSearchParams((params) => {
      params.set("tab", tabName);
      return params;
    });
  };

  useEffect(() => {
    const tabQueryParam = searchParams.get("tab");
    if (tabs.some((tab) => tab.key === tabQueryParam)) {
      setActiveTab(tabQueryParam);
    } else {
      setActiveTab(tabs[0].key);
      setSearchParams((params) => {
        params.set("tab", tabs[0].key);
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
};

CustomTabs.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  tabs: PropTypes.array,
};

export default CustomTabs;
