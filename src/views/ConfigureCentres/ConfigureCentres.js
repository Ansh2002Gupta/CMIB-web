import React, { useCallback, useState } from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import CaJobsConfigurations from "../CAJobs/CaJobsConfigurations/CaJobsConfigurations";
import ConfigureCentreContent from "../../containers/ConfigureCentre/ConfigureCentreContent/ConfigureCentreContent";
import ConfigureCentreHeader from "../../containers/ConfigureCentre/ConfigureCentreHeader";
import CustomTabs from "../../components/CustomTabs";
import useShowNotification from "../../core/hooks/useShowNotification";
import { urlService } from "../../Utils/urlService";
import {
  ACTIVE_TAB,
  VALID_GLOBAL_CONFIGURATIONS_TABS_ID,
} from "../../constant/constant";
import { getCurrentActiveTab } from "../../constant/utils";
import styles from "./ConfigureCentres.module.scss";

const ConfigureCentres = () => {
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService.getQueryStringValue(ACTIVE_TAB),
      VALID_GLOBAL_CONFIGURATIONS_TABS_ID
    )
  );
  const { showNotification, notificationContextHolder } = useShowNotification();

  const tabItems = [
    {
      key: "1",
      title: "Configure Centres",
      children: <ConfigureCentreContent />,
    },
    {
      key: "2",
      title: "Set Profile Skills",
      children: (
        <div className={styles.configureCentreContentWrapper}>
          <CaJobsConfigurations />
        </div>
      ),
    },
  ];

  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  const handleOnTabSwitch = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  return (
    <>
      {notificationContextHolder}
      <TwoRow
        isBottomFillSpace
        className={styles.baseLayout}
        topSection={
          <ConfigureCentreHeader
            customHeaderStyling={styles.customHeaderStyling}
            tabComponent={
              <CustomTabs
                activeTab={activeTab}
                customTabContainerStyling={styles.tabContainer}
                setActiveTab={handleOnTabSwitch}
                tabs={tabItems}
                tabsKeyText={ACTIVE_TAB}
              />
            }
            showButton={activeTab === "1"}
          />
        }
        bottomSection={activeTabChildren.children}
      />
    </>
  );
};

export default ConfigureCentres;
