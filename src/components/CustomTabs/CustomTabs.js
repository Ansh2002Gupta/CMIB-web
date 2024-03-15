import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import { urlService } from "../../Utils/urlService";
import { FORM_STATES } from "../../constant/constant";
import styles from "./CustomTabs.module.scss";

const CustomTabs = ({
  activeTab,
  customTabContainerStyling,
  resetMode,
  setActiveTab,
  tabs,
  tabsKeyText,
}) => {
  const tabClass = (tabKey) => {
    let classes = `${styles.tab}`;
    if (activeTab === tabKey) classes += ` ${styles.active}`;
    return classes;
  };

  const handleSelectTab = (tabName) => {
    setActiveTab(tabName);
    resetMode &&
      tabName !== urlService.getQueryStringValue("tab") &&
      urlService.setQueryStringValue("mode", FORM_STATES.VIEW_ONLY);
    urlService.setQueryStringValue(tabsKeyText, tabName);
  };

  return (
    <div
      className={[styles["tab-container"], customTabContainerStyling].join(" ")}
    >
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
  resetMode: false,
  setActiveTab: () => {},
  tabs: [],
  tabsKeyText: "tab",
};

CustomTabs.propTypes = {
  activeTab: PropTypes.string,
  resetMode: PropTypes.bool,
  setActiveTab: PropTypes.func,
  tabs: PropTypes.array,
  tabsKeyText: PropTypes.string,
};

export default CustomTabs;
