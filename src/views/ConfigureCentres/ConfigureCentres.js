import React, { useCallback, useState } from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ConfigureCentreContent from "../../containers/ConfigureCentre/ConfigureCentreContent/ConfigureCentreContent";
import ConfigureCentreHeader from "../../containers/ConfigureCentre/ConfigureCentreHeader";
import CustomTabs from "../../components/CustomTabs";
import ProfileSkills from "../../containers/ProfileSkills/ProfileSkills";
import { urlService } from "../../Utils/urlService";
import {
  ACTIVE_TAB,
  VALID_GLOBAL_CONFIGURATIONS_TABS_ID,
} from "../../constant/constant";
import { getCurrentActiveTab } from "../../constant/utils";
import { initialFieldState } from "./constant";
import styles from "./ConfigureCentres.module.scss";

const ConfigureCentres = () => {
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService.getQueryStringValue(ACTIVE_TAB),
      VALID_GLOBAL_CONFIGURATIONS_TABS_ID
    )
  );
  const [itSkillsObj, setItSkillsObj] = useState(initialFieldState);
  const [softSkillsObj, setSoftSkillsObj] = useState(initialFieldState);

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
          <ProfileSkills
            currentFieldStateItSkills={itSkillsObj}
            currentFieldStateSoftSkills={softSkillsObj}
            setCurrentFieldStateItSkills={setItSkillsObj}
            setCurrentFieldStateSoftSkills={setSoftSkillsObj}
          />
        </div>
      ),
    },
  ];

  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  const handleOnTabSwitch = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={
        <ConfigureCentreHeader
          customHeaderStyling={styles.customHeaderStyling}
          tabComponent={
            <CustomTabs
              tabs={tabItems}
              activeTab={activeTab}
              setActiveTab={handleOnTabSwitch}
              tabsKeyText={ACTIVE_TAB}
            />
          }
          showButton={activeTab === "1"}
        />
      }
      bottomSection={activeTabChildren.children}
    />
  );
};

export default ConfigureCentres;
