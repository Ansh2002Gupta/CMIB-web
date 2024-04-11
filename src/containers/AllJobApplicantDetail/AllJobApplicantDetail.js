import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import styles from "./AllJobApplicantDetail.module.scss";
import { TwoRow } from "../../core/layouts";
import { formatDate } from "../../constant/utils";
import { useParams } from "react-router-dom";
import ContentHeader from "../ContentHeader";
import CustomButton from "../../components/CustomButton";
import { ReactComponent as calendar } from "../../themes/base/assets/images/whiteCalender.svg";
import useFetch from "../../core/hooks/useFetch";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import CustomLoader from "../../components/CustomLoader";
import ScheduleInterviewModal from "../ScheduleInterviewModal";
import { ADMIN_ROUTE, APPLICANT, JOBS } from "../../constant/apiEndpoints";
import useFetchInterviewDetailApi from "../../services/api-services/AllJob/useFetchInterviewDetailApi";
import useShowNotification from "../../core/hooks/useShowNotification";
import { INTERVIEW_SCHEDULED, SHORTLISTED } from "../../constant/constant";

const AllJobApplicantDetailView = () => {
  const intl = useIntl();
  const { userId, jobId } = useParams();
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const { showNotification, notificationContextHolder } = useShowNotification();

  const {
    data: applicantDetails,
    error,
    isError,
    isLoading,
    fetchData,
  } = useFetch({
    url: ADMIN_ROUTE + JOBS + `/${jobId}` + APPLICANT + `/${userId}`,
  });

  const {
    fetchInterviewDetail,
    isLoading: isLoadingFetchInterviewDetails,
    interviewDetailData,
  } = useFetchInterviewDetailApi();

  const handleScheduledInterviewCallback = () => {
    fetchData({});
  };

  const applicantShortDetails =
    applicantDetails && applicantDetails?.length > 0 ? applicantDetails[0] : {};
  const updatedAt = new Date(applicantShortDetails?.updated_at);
  const isScheduleInterviewVisible =
    applicantShortDetails?.status === SHORTLISTED ||
    applicantShortDetails?.status === INTERVIEW_SCHEDULED;

  const openScheduledInterviewModal = () => {
    if (applicantShortDetails?.interview_id) {
      fetchInterviewDetail(
        applicantShortDetails?.interview_id,
        () => {},
        (errorMessage) =>
          showNotification({ text: errorMessage, type: "error" })
      );
    }
    setOpenScheduleModal(true);
  };

  return (
    <div className={styles.headerContainer}>
      {notificationContextHolder}
      {openScheduleModal ? (
        <ScheduleInterviewModal
          applicantId={applicantShortDetails?.id}
          interviewId={applicantShortDetails?.interview_id}
          isOpen={openScheduleModal}
          handleCloseModal={() => setOpenScheduleModal(false)}
          handleScheduledInterviewCallback={handleScheduledInterviewCallback}
          interviewDetailData={interviewDetailData}
        />
      ) : null}
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
              topSection={
                <ContentHeader
                  headerText={intl.formatMessage({ id: "label.companies" })}
                  customStyles={styles.headerResponsiveStyle}
                  rightSection={
                    <>
                      {isScheduleInterviewVisible ? (
                        <CustomButton
                          btnText={intl.formatMessage({
                            id: `label.${
                              applicantShortDetails?.interview_id
                                ? "updateScheduleInterview"
                                : "scheduleInterview"
                            }`,
                          })}
                          IconElement={calendar}
                          iconStyles={styles.btnIconStyles}
                          customStyle={styles.btnCustomStyles}
                          onClick={() => openScheduledInterviewModal()}
                        />
                      ) : null}
                    </>
                  }
                />
              }
              bottomSection={
                <TwoRow
                  className={styles.applicantShortDetailContainer}
                  topSection={
                    <div className={styles.applicantDetailContainer}>
                      <Typography className={styles.headingText}>
                        {intl.formatMessage({ id: "label.applicantName" })}:
                        <span className={styles.detailText}>
                          {applicantShortDetails
                            ? applicantShortDetails?.name
                            : "-"}
                        </span>
                      </Typography>
                      <div className={styles.verticalLine}></div>
                      <Typography className={styles.headingText}>
                        {intl.formatMessage({ id: "label.applicantId" })}:
                        <span className={styles.detailText}>
                          {applicantShortDetails?.applicant_id
                            ? applicantShortDetails?.applicant_id
                            : "-"}
                        </span>
                      </Typography>
                    </div>
                  }
                  bottomSection={
                    <div className={styles.applicantDetailContainer}>
                      <Typography className={styles.headingText}>
                        {intl.formatMessage({ id: "label.updatedAt" })}:
                        <span className={styles.detailText}>
                          {formatDate(updatedAt)}
                        </span>
                      </Typography>
                      <div className={styles.verticalLine}></div>
                      <Typography className={styles.headingText}>
                        {intl.formatMessage({ id: "label.status" })}:
                        <span className={styles.detailText}>
                          {applicantShortDetails?.status
                            ? applicantShortDetails?.status
                            : "-"}
                        </span>
                      </Typography>
                    </div>
                  }
                />
              }
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default AllJobApplicantDetailView;
