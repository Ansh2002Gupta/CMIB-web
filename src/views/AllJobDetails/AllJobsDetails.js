import React, { useState } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "core/layouts";

import AllJobsDetailHeader from "../../containers/AllJobDetailHeader/AllJobDetailHeader";
import JobDetails from "../JobDetails";
import CustomTabs from "../../components/CustomTabs";
import { ALL_JOB_DETAILS } from "../../constant/constant";
import variables from "../../themes/base/styles/variables";
import styles from "./AllJobDetails.module.scss";
import { useParams } from "react-router-dom";
import {
  COMPANY_ROUTE,
  JOBS,
} from "../../constant/apiEndpoints";
import useFetch from "../../core/hooks/useFetch";

function AllJobDetails() {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState("1");

  const { jobId } = useParams();

  const {
    data: jobDetails,
    error,
    fetchData,
    isError,
    isLoading,
  } = useFetch({
    url: COMPANY_ROUTE + JOBS + `/${jobId}`,
  });

  console.log(jobDetails, "jobDetails");

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({ id: "label.job_details" }),
      children: (
        <JobDetails roundList={ALL_JOB_DETAILS} jobDetails={jobDetails} />
      ),
    },
    {
      key: "2",
      title: intl.formatMessage({ id: "label.applicants" }),
      children: <JobDetails roundList={ALL_JOB_DETAILS} />,
    },
    {
      key: "3",
      title: intl.formatMessage({ id: "label.scheduled_interviews" }),
      children: <JobDetails roundList={ALL_JOB_DETAILS} />,
    },
  ];

  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.topSectionStyle}
          topSection={<AllJobsDetailHeader />}
          bottomSection={
            <CustomTabs
              tabs={tabItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          }
        />
      }
      bottomSection={!!activeTabChildren && activeTabChildren.children}
      bottomSectionStyle={{
        padding: variables.fontSizeXlargeMedium,
        width: "100%",
      }}
    />
  );
}

export default AllJobDetails;
