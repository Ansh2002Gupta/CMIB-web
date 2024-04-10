import React, {useState} from "react";
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
import ScheduleInterviewModal from '../ScheduleInterviewModal';
import {
  ADMIN_ROUTE,
  APPLICANT,
  JOBS,
} from "../../constant/apiEndpoints";

const AllJobApplicantDetailModal = () => {
  const intl = useIntl();
  const { applicantId, jobId } = useParams();
  const [openScheduleModal, setOpenScheduleModal] = useState(false);

  const {
    data: applicantDetails,
    error,
    isError,
    isLoading,
    fetchData,
  } = useFetch({
    url: ADMIN_ROUTE + JOBS + `/${jobId}` + APPLICANT + `/${applicantId}`,
  });


  const handleScheduledInterviewCallback = () => {

  }

  return (
    <div className={styles.headerContainer}>
      {
        <ScheduleInterviewModal
          applicantId={applicantId}
          isOpen={openScheduleModal}
          handleCloseModal={() => setOpenScheduleModal(false)}
          handleScheduledInterviewCallback={handleScheduledInterviewCallback}
        />
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
              topSection={
                <ContentHeader
                  headerText={intl.formatMessage({ id: "label.companies" })}
                  customStyles={styles.headerResponsiveStyle}
                  rightSection={
                    <CustomButton
                      btnText={intl.formatMessage({
                        id: "label.scheduleInterview",
                      })}
                      IconElement={calendar}
                      iconStyles={styles.btnIconStyles}
                      customStyle={styles.btnCustomStyles}
                      onClick={()=> setOpenScheduleModal(true)}
                    />
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
                        <span className={styles.detailText}>Amulya Kohli</span>
                      </Typography>
                      <div className={styles.verticalLine}></div>
                      <Typography className={styles.headingText}>
                        {intl.formatMessage({ id: "label.applicantId" })}:
                        <span className={styles.detailText}>Amulya Kohli</span>
                      </Typography>
                    </div>
                  }
                  bottomSection={
                    <div className={styles.applicantDetailContainer}>
                      <Typography className={styles.headingText}>
                        {intl.formatMessage({ id: "label.updatedAt" })}:
                        <span className={styles.detailText}>Amulya Kohli</span>
                      </Typography>
                      <div className={styles.verticalLine}></div>
                      <Typography className={styles.headingText}>
                        {intl.formatMessage({ id: "label.status" })}:
                        <span className={styles.detailText}>Amulya Kohli</span>
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

export default AllJobApplicantDetailModal;
