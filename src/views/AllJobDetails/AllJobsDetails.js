import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "core/layouts";

import AllJobsDetailHeader from "../../containers/AllJobDetailHeader/AllJobDetailHeader";
import JobDetails from "../JobDetails";
import CustomTabs from "../../components/CustomTabs";
import { ALL_JOB_DETAILS } from "../../constant/constant";
import styles from "./AllJobDetails.module.scss";
import { useParams } from "react-router-dom";
import { ADMIN_ROUTE, CHANGE_STATUS, JOBS } from "../../constant/apiEndpoints";
import useFetch from "../../core/hooks/useFetch";
import CustomLoader from "../../components/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import ApplicantListing from "../ApplicantsListing";
import ScheduledInterviewListing from "../ScheduledInterviewListing";
import { urlService } from "../../Utils/urlService";
import { usePatch } from "../../core/hooks/useApiRequest";
import useShowNotification from "../../core/hooks/useShowNotification";
import InactiveJobConfirmationModal from "../../containers/InactiveJobConfirmationModal";
import CommonModal from "../../components/CommonModal";

function AllJobDetails() {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState("1");
  const [showInactiveJobModal, setShowInactiveJobModal] = useState(false);

  const { jobId } = useParams();
  const activeTabFromUrl = urlService.getQueryStringValue("tab");
  const { showNotification, notificationContextHolder } = useShowNotification();

  useEffect(() => {
    setActiveTab(activeTabFromUrl);
  }, [activeTabFromUrl]);

  const {
    data: jobDetails,
    error,
    isError,
    isLoading,
    fetchData,
    setData,
  } = useFetch({
    url: ADMIN_ROUTE + JOBS + `/${jobId}`,
  });

  const {
    isLoading: isLoadingJobStatusChange,
    isSuccess: isSuccessJobStatusChange,
    isError: isErrorJobStatusChange,
    error: jobStatusChangeError,
    makeRequest,
  } = usePatch({ url: ADMIN_ROUTE + JOBS + `/${jobId}` + CHANGE_STATUS });

  useEffect(() => {
    if (isSuccessJobStatusChange) {
      setData({
        ...jobDetails,
        status: !jobDetails.status,
      });
    }
  }, [isSuccessJobStatusChange]);

  useEffect(() => {
    if (isErrorJobStatusChange) {
      showNotification({
        text: jobStatusChangeError?.data?.message,
        type: "error",
      });
    }
  }, [isErrorJobStatusChange]);

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
      children: <ApplicantListing jobId={jobId} />,
    },
    {
      key: "3",
      title: intl.formatMessage({ id: "label.scheduled_interviews" }),
      children: <ScheduledInterviewListing jobId={jobId} />,
    },
  ];

  useEffect(() => {
    const tabQueryParam = urlService.getQueryStringValue("tab");
    if (tabItems.some((tab) => tab.key === tabQueryParam)) {
      setActiveTab(tabQueryParam);
    } else {
      setActiveTab(tabItems[0].key);
      urlService.setQueryStringValue("tab", tabItems[0].key);
    }
  }, [activeTab]);

  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  const onClickYes =  () => {
    makeRequest({})
    setShowInactiveJobModal(false)
  }

  const changeJobStatus = () => {
    if (!!jobDetails?.status) {
      setShowInactiveJobModal(true)
    } else {
      makeRequest({})
    }
  }

  return (
    <>
      {notificationContextHolder}
      {
        <CommonModal isOpen={showInactiveJobModal} width={500}>
          <InactiveJobConfirmationModal
            heading={intl.formatMessage({ id: "label.inactiveJob" })}
            subHeadingText={intl.formatMessage({ id: "label.inactiveJobConfirmation" })}
            onClickYes={onClickYes}
            onClickNo={() => setShowInactiveJobModal(false)}
          />
        </CommonModal>
      }
      {!isLoading && isError && (
        <div className={styles.erroContainerBox}>
          <ErrorMessageBox
            errorHeading={intl.formatMessage({ id: "label.errorMessage" })}
            errorText={error?.data?.message}
            onRetry={() => fetchData({})}
          />
        </div>
      )}
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          {!isError ? (
            <TwoRow
              className={styles.mainContainer}
              topSection={
                <TwoRow
                  className={styles.topSectionStyle}
                  topSection={
                    <AllJobsDetailHeader
                      designation={jobDetails?.designation}
                      changeJobStatus={changeJobStatus}
                      isActive={!!jobDetails?.status}
                    />
                  }
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
                width: "100%",
              }}
            />
          ) : null}
        </>
      )}
    </>
  );
}

export default AllJobDetails;
