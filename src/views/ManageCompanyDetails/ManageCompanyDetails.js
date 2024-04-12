import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import useResponsive from "core/hooks/useResponsive";
import ContentHeader from "../../containers/ContentHeader/ContentHeader";
import CompanyDetailsCa from "../../containers/CompanyDetailsCa";
import PostedJobsCa from "../../containers/PostedJobsCa";
import CustomTabs from "../../components/CustomTabs";
import useFetch from "../../core/hooks/useFetch";
import { getCurrentActiveTab } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { VALID_COMPANIES_TABS_ID } from "../../constant/constant";
import { ADMIN_ROUTE, REGISTERED_COMPANIES } from "../../constant/apiEndpoints";
import { classes } from "./ManageCompanyDetails.styles";
import styles from "./ManageCompanyDetails.module.scss";

const ManageCompanyDetails = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { companyId } = useParams();
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService?.getQueryStringValue("tab"),
      VALID_COMPANIES_TABS_ID
    )
  );

  const {
    data,
    error: errorWhileGettingCompanyData,
    isLoading: isGettingCompanyData,
    fetchData: getCompanyData,
  } = useFetch({
    url: ADMIN_ROUTE + REGISTERED_COMPANIES + "/" + companyId,
  });

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({ id: "label.companyDetails" }),
      children: (
        <CompanyDetailsCa
          {...{
            data,
            errorWhileGettingCompanyData,
            isGettingCompanyData,
            getCompanyData,
          }}
        />
      ),
    },
    {
      key: "2",
      title: intl.formatMessage({ id: "label.postedJobs" }),
      children: <PostedJobsCa {...{ companyId }} />,
    },
  ];
  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  return (
    <TwoRow
      topSection={
        <ContentHeader
          customStyles={!responsive?.isMd ? styles.customStyles : ""}
          headerText={data?.name}
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
