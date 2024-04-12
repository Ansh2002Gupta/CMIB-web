import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import styles from "./SchduledInterviewDetail.module.scss";
import {
  APPLICANT_DETAILS_FEILDS,
  PRIMARY_INTERVIEW_SCHEDUlE,
} from "./ScheduleInterviewFieldsDetails";
import { TwoRow } from "../../core/layouts";
import CustomGrid from "../../components/CustomGrid";
import { formatDate, formatTime } from "../../constant/utils";

const { Link } = Typography;

const ScheduleInterviewDetailsView = ({ interviewDetailData }) => {
  const intl = useIntl();

  const primaryScheduleDate = new Date(interviewDetailData?.primary_schedule);
  const alternateScheduleDate = new Date(
    interviewDetailData?.alternate_schedule
  );

  const applicant_details_feilds = APPLICANT_DETAILS_FEILDS(
    interviewDetailData?.applicant_name,
    interviewDetailData?.applicant_id
  );
  const primary_interview_feilds = PRIMARY_INTERVIEW_SCHEDUlE(
    formatDate(primaryScheduleDate),
    formatTime(primaryScheduleDate),
    interviewDetailData?.type,
    interviewDetailData?.remote_meeting_link,
    interviewDetailData?.venue_address
  );
  const secondary_interview_feilds = PRIMARY_INTERVIEW_SCHEDUlE(
    formatDate(alternateScheduleDate),
    formatTime(alternateScheduleDate),
    interviewDetailData?.alternate_type,
    interviewDetailData?.alternate_remote_meeting_link,
    interviewDetailData?.alternate_venue_address
  );

  const renderJobDetailText = (heading, value, isMandatory, label, index) => {
    if (label === "meetingLink" && !!value) {
      return (
        <TwoRow
          key={`${heading}` + index}
          className={styles.gridItem}
          topSection={
            <Typography className={styles.headingText}>
              {intl.formatMessage({
                id: `label.${heading}`,
              })}
            </Typography>
          }
          bottomSection={
            <Link className={styles.blackText} href={value} target="_blank">
              {value ? value : "-"}
            </Link>
          }
        />
      );
    } else if (label === "venueAddress" && !!value) {
      return (
        <TwoRow
          key={`${heading}` + index}
          className={styles.gridItem}
          topSection={
            <Typography className={styles.headingText}>
              {intl.formatMessage({
                id: `label.${heading}`,
              })}
              {isMandatory ? <span className={styles.redText}> *</span> : null}
            </Typography>
          }
          bottomSection={
            <Typography className={styles.blackText}>
              {value ? value : "-"}
            </Typography>
          }
        />
      );
    } else {
      if (label !== "meetingLink" && label !== "venueAddress") {
        return (
          <TwoRow
            className={styles.gridItem}
            topSection={
              <Typography className={styles.headingText}>
                {intl.formatMessage({
                  id: `label.${heading}`,
                })}
                {isMandatory ? (
                  <span className={styles.redText}> *</span>
                ) : null}
              </Typography>
            }
            bottomSection={
              <Typography className={styles.blackText}>
                {value ? value : "-"}
              </Typography>
            }
          />
        );
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <TwoRow
        className={styles.scheduleInterviewDetails}
        topSection={
          <div className={styles.headingContainer}>
            <div>
              <Typography className={styles.modalHeadingText}>
                {intl.formatMessage({
                  id: `label.interviewDetails`,
                })}
              </Typography>
              <div className={styles.applicantDetailContainer}>
                <CustomGrid>
                  {applicant_details_feilds.map((item, index) =>
                    renderJobDetailText(
                      item.headingIntl,
                      item.value,
                      false,
                      index
                    )
                  )}
                </CustomGrid>
              </div>
            </div>
            <div className={styles.borderBottom}></div>
          </div>
        }
        bottomSection={
          <TwoRow
            topSection={
              <div className={styles.primaryScheduledcontainer}>
                <CustomGrid customStyle={styles.customGridStyle}>
                  {primary_interview_feilds.map((item, index) => {
                    return renderJobDetailText(
                      item.headingIntl,
                      item.value,
                      false,
                      item.label,
                      index
                    );
                  })}
                </CustomGrid>
                <div className={styles.borderBottom}></div>
              </div>
            }
            bottomSection={
              <CustomGrid customStyle={styles.customGridStyle}>
                {secondary_interview_feilds.map((item) => {
                  return renderJobDetailText(
                    item.headingIntl,
                    item.value,
                    false,
                    item.label
                  );
                })}
              </CustomGrid>
            }
          />
        }
      />
    </div>
  );
};

export default ScheduleInterviewDetailsView;
