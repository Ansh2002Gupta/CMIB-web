import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "antd";

import {
  PAGINATION_PROPERTIES,
  DEFAULT_PAGE_SIZE,
} from "../../constant/constant";
import styles from "./CustomTabs.module.scss";

const CustomTabs = ({
  activeTab,
  setActiveTab,
  tabs,
  tabsKeyText,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabClass = (tabKey) => {
    let classes = `${styles.tab}`;
    if (activeTab === tabKey) classes += ` ${styles.active}`;
    return classes;
  };

  const handleSelectTab = (tabName) => {
    setSearchParams((prev) => {
      prev.set(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      prev.set(PAGINATION_PROPERTIES.ROW_PER_PAGE, DEFAULT_PAGE_SIZE);
      return prev;
    });
    setActiveTab(tabName);
    setSearchParams((params) => {
      params.set(tabsKeyText, tabName);
      return params;
    });
  };

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
  tabsKeyText: "tab",
};

CustomTabs.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  tabs: PropTypes.array,
  tabsKeyText: PropTypes.string,
};

export default CustomTabs;
