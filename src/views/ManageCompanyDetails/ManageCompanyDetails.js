import React, { useState } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import useResponsive from "core/hooks/useResponsive";
import ContentHeader from "../../containers/ContentHeader/ContentHeader";
import CompanyDetailsCa from "../../containers/CompanyDetailsCa";
import PostedJobsCa from "../../containers/PostedJobsCa";
import CustomTabs from "../../components/CustomTabs";
import { getCurrentActiveTab } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { VALID_COMPANIES_TABS_ID } from "../../constant/constant";
import { classes } from "./ManageCompanyDetails.styles";
import styles from "./ManageCompanyDetails.module.scss";

const ManageCompanyDetails = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService?.getQueryStringValue("tab"),
      VALID_COMPANIES_TABS_ID
    )
  );
  const companyName = "Company Name";

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({ id: "label.companyDetails" }),
      children: <CompanyDetailsCa />,
    },
    {
      key: "2",
      title: intl.formatMessage({ id: "label.postedJobs" }),
      children: <PostedJobsCa />,
    },
  ];
  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  return (
    <TwoRow
      topSection={
        <ContentHeader
          customStyles={!responsive?.isMd ? styles.customStyles : ""}
          headerText={companyName}
          customContainerStyle={styles.customContainerStyle}
        />
      }
      bottomSection={
        <TwoRow
          className={styles.mainContainer}
          topSection={
            <CustomTabs
              tabs={tabItems}
              activeTab={activeTab}
              resetMode
              setActiveTab={setActiveTab}
            />
          }
          topSectionStyle={classes.customTabContainer}
          bottomSection={!!activeTabChildren && activeTabChildren.children}
        />
      }
      bottomSectionStyle={classes.tabContainerDetails}
    />
  );
};

export default ManageCompanyDetails;
