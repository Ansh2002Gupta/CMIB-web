import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "antd";

import styles from "./CustomTabs.module.scss";

const CustomTabs = ({ activeTab, setActiveTab, tabs }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabClass = (tabKey) => {
    let classes = `${styles.tab}`;
    if (activeTab === tabKey) classes += ` ${styles.active}`;
    return classes;
  };

  const handleSelectTab = (tabName) => {
    setActiveTab(tabName);
    navigate({
      pathname: location.pathname,
      search: `?tab=${tabName}`,
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabQueryParam = queryParams.get("tab");
    if (tabs.some((tab) => tab.key === tabQueryParam)) {
      setActiveTab(tabQueryParam);
    } else {
      setActiveTab(tabs[0].key);
      navigate({
        pathname: location.pathname,
        search: `?tab=${tabs[0].key}`,
      });
    }
  }, [location.search, tabs, navigate, setActiveTab]);

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
