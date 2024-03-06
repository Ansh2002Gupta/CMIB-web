import React, { useState } from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../ContentHeader";
import CustomTabs from "../../components/CustomTabs";
import PaymentSettings from "../PaymentSettings";
import useResponsive from "../../core/hooks/useResponsive";
import { TwoRow } from "../../core/layouts";
import { getCurrentActiveTab } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { CAMPUS_INTERVIEW_SETTINGS_TAB } from "../../constant/constant";
import styles from "./CampusInterviewSettings.module.scss";

const CampusInterviewContent = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService?.getQueryStringValue("tab"),
      CAMPUS_INTERVIEW_SETTINGS_TAB
    )
  );

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({ id: "session.forCandidateAndCompany" }),
      children: <></>,
    },

    {
      key: "2",
      title: intl.formatMessage({ id: "session.paymentSettings" }),
      children: <PaymentSettings />,
    },
  ];

  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.topSectionStyle}
          topSection={
            <ContentHeader
              customStyles={!responsive?.isMd ? styles.customStyles : ""}
              headerText={intl.formatMessage({
                id: "label.setCampusInterviewSettings",
              })}
            />
          }
          bottomSection={
            <CustomTabs
              tabs={tabItems}
              activeTab={activeTab}
              resetMode
              setActiveTab={setActiveTab}
            />
          }
        />
      }
      isBottomFillSpace
      bottomSection={!!activeTabChildren ? activeTabChildren.children : ""}
    />
  );
};

export default CampusInterviewContent;
