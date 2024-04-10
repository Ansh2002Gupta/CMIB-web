import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import styles from "./ScheduleInterviewModal.module.scss";
import { TwoColumn, TwoRow } from "../../core/layouts";
import CommonModal from "../../components/CommonModal";
import { interview_type } from "./ScheduleInterviewFields";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomInput from "../../components/CustomInput";
import { NOTIFICATION_TYPES, SCHEDULE_INTERVIEW_ADDRESS_MAX_LENGTH } from "../../constant/constant";
import dayjs from "dayjs";
import ActionAndCancelButtons from "../../components/ActionAndCancelButtons/ActionAndCancelButtons";
import { formateDateandTime } from "../../constant/utils";
import { usePost, usePut } from "../../core/hooks/useApiRequest";
import {
  ADMIN_ROUTE,
  APPLICANTS,
  INTERVIEW,
  JOBS,
} from "../../constant/apiEndpoints";
import useShowNotification from "../../core/hooks/useShowNotification";

const getInterViewType = (interviewType) => {
  const type =
    interviewType === 0
      ? "face_to_face"
      : interviewType === 1
      ? "telephonic"
      : "remote";

  return type;
};

const getAPIInterViewType = (interviewType) => {
  const type =
    interviewType === 0
      ? "Face-To-Face"
      : interviewType === 1
      ? "Telephonic"
      : "Remote";

  return type;
};

const ScheduleInterviewModal = ({ applicantId, isOpen, handleCloseModal, handleScheduledInterviewCallback }) => {
  const intl = useIntl();
  const [primaryInterviewType, setPrimaryInterviewType] = useState(0);
  const [secondaryInterviewType, setSecondaryInterviewType] = useState(0);
  const [error, setError] = useState({
    face_to_face: {
      address: "",
      date: "",
      time: "",
    },
    telephonic: {
      date: "",
      time: "",
    },
    remote: {
      link: "",
      date: "",
      time: "",
    },
  });
  const [primaryDetails, setPrimaryDetails] = useState({
    face_to_face: {
      address: "",
      date: "",
      time: "",
    },
    telephonic: {
      date: "",
      time: "",
    },
    remote: {
      link: "",
      date: "",
      time: "",
    },
  });
  const [alternateDetails, setAlternateDetails] = useState({
    face_to_face: {
      address: "",
      date: "",
      time: "",
    },
    telephonic: {
      date: "",
      time: "",
    },
    remote: {
      link: "",
      date: "",
      time: "",
    },
  });

  const { showNotification, notificationContextHolder } = useShowNotification();

  const {
    isLoading: isScheduleInterviewLoading,
    makeRequest: scheduleInterviewRequest,
    error: errorWhileSchedulingInterview,
    isError: isErrorWhileSchedulingInterview
  } = usePost({
    url: ADMIN_ROUTE + JOBS + APPLICANTS + INTERVIEW,
  });

  const interview_id = 1;

  const {
    isLoading: isUpdatingInterview,
    makeRequest: updatatingInterview,
    error: errorWhileUpdatingInterview,
    setError: setErrorWhileUpdatingInterview,
  } = usePut({
    url: ADMIN_ROUTE + JOBS + APPLICANTS + INTERVIEW + `${interview_id}`,
  });

  const handleScheduleInterview = () => {
    const primaryType = getAPIInterViewType(primaryInterviewType);
    const alternatePrimaryType = getAPIInterViewType(secondaryInterviewType);

    const type = getInterViewType(primaryInterviewType);
    const alternate_type = getInterViewType(secondaryInterviewType);

    const primary_schedule = formateDateandTime(
      primaryDetails[type].date,
      primaryDetails[type].time
    );

    const alternate_schedule = formateDateandTime(
      alternateDetails[alternate_type].date,
      alternateDetails[alternate_type].time
    );

    scheduleInterviewRequest({
      body: {
        applicant_id: applicantId,
        type: primaryType,
        alternate_type: alternatePrimaryType,
        venue_address: primaryDetails[type].address,
        alternate_venue_address: alternateDetails[alternate_type].address,
        primary_schedule,
        alternate_schedule,
        remote_meeting_link: primaryDetails[type].link,
        alternate_remote_meeting_link: alternateDetails[alternate_type].link,
      },
      onSuccessCallback: () => {
        handleScheduledInterviewCallback(applicantId)
        showNotification({ text: intl.formatMessage({
            id: "label.InterviewScheduledSuccessfully",
          }), type: NOTIFICATION_TYPES.SUCCESS});
        handleCloseModal();
      },
      onErrorCallback :(errorMessage)=>{
        showNotification({ text: errorMessage?.data?.message, type: "error" });
      }
    });
  };

  const isScheduleButtonDisabled = () => {
    const interviewKey = getInterViewType(primaryInterviewType)
    const isEmpty = !Object.values(error[interviewKey]).every(x => x === null || x === '');
    const isFieldEmpty = Object.values(primaryDetails[interviewKey]).some(x => x === null || x === '');
    return isEmpty || isFieldEmpty
  }

  const handleValueChange = (
    details,
    setDetails,
    fieldName,
    value,
    isPrimary
  ) => {
    const [interviewKey, field] = fieldName.split(".");
    setDetails((prevDetails) => ({
      ...prevDetails,
      [interviewKey]: {
        ...prevDetails[interviewKey],
        [field]: value,
      },
    }));
    if (isPrimary) {
      if (value === null || value === "") {
        setError((prevDetails) => ({
          ...prevDetails,
          [interviewKey]: {
            ...prevDetails[interviewKey],
            [field]: intl.formatMessage({ id: "label.field_cannot_be_empty" }),
          },
        }));
      } else {
        setError((prevDetails) => ({
          ...prevDetails,
          [interviewKey]: {
            ...prevDetails[interviewKey],
            [field]: "",
          },
        }));
      }
    }
  };

  const renderInterviewType = (interviewType, setInterviewType) => {
    return (
      <TwoRow
        className={styles.marginTop}
        topSection={
          <>
            <Typography className={styles.headingText}>
              {intl.formatMessage({
                id: `label.interviewType`,
              })}
              <span className={styles.redText}> *</span>
            </Typography>
          </>
        }
        bottomSection={
          <div className={styles.customRadioButtonContainer}>
            {interview_type.map((item) => {
              return (
                <CustomRadioButton
                  checked={item.id === interviewType}
                  label={intl.formatMessage({
                    id: `label.${item.headingIntl}`,
                  })}
                  customStyles={styles.interviewTypeText}
                  onChange={(val) => {
                    setInterviewType(item.id);
                  }}
                />
              );
            })}
          </div>
        }
      />
    );
  };

  const renderDateComponents = (
    details,
    setDetails,
    interviewKey,
    isPrimary
  ) => {
    const primaryDateProps = isPrimary
      ? {
          isRequired: true,
          errorMessage: error[interviewKey].date,
        }
      : {};

    const primaryTimeProps = isPrimary
      ? {
          isRequired: true,
          errorMessage: error[interviewKey].time,
        }
      : {};
    return (
      <TwoColumn
        isLeftFillSpace
        isRightFillSpace
        className={styles.datePickerContainer}
        leftSection={
          <CustomDateTimePicker
            customLabelStyles={styles.inputLabel}
            customTimeStyle={styles.timeInput}
            customContainerStyles={styles.customDatePickerStyles}
            type="date"
            label={intl.formatMessage({
              id: "label.date",
            })}
            onChange={(momentValue, timeString) => {
              handleValueChange(
                details,
                setDetails,
                `${interviewKey}.date`,
                momentValue ? dayjs(momentValue).format("DD/MM/YYYY") : "",
                isPrimary
              );
            }}
            placeholder={intl.formatMessage({
              id: "label.placeholder.date",
            })}
            value={
              details.date
                ? dayjs(details?.date).format("DD/MM/YYYY")
                : null
            }
            {...primaryDateProps}
          />
        }
        rightSection={
          <CustomDateTimePicker
            customLabelStyles={styles.inputLabel}
            customTimeStyle={styles.timeInput}
            customContainerStyles={styles.customDatePickerStyles}
            label={intl.formatMessage({
              id: "label.time",
            })}
            onChange={(momentValue, timeString) => {
              handleValueChange(
                details,
                setDetails,
                `${interviewKey}.time`,
                momentValue ? dayjs(momentValue) : "",
                isPrimary
              );
            }}
            placeholder={intl.formatMessage({
              id: "label.placeholder.time",
            })}
            value={details.time && dayjs(details.time, "HH:mm:ss")}
            {...primaryTimeProps}
          />
        }
      />
    );
  };

  const renderInterviewDetails = (
    interviewType,
    details,
    setDetails,
    isPrimary
  ) => {
    const interviewKey = getInterViewType(interviewType);
    const primaryAddressProps = isPrimary
      ? {
          isRequired: true,
          isError: !!error[interviewKey].address,
          errorMessage: error[interviewKey].address,
        }
      : {};

    const primaryLinkProps = isPrimary
      ? {
          isRequired: true,
          isError: !!error[interviewKey].link,
          errorMessage: error[interviewKey].link,
        }
      : {};

    switch (interviewType) {
      case 0: // Face to Face
        return (
          <>
            <CustomInput
              customInputNumberStyles={styles.input}
              customLabelStyles={styles.inputLabel}
              customContainerStyles={styles.customContainerStyles}
              label={intl.formatMessage({ id: "label.address" })}
              onChange={(e) => {
                handleValueChange(
                  details,
                  setDetails,
                  `${interviewKey}.address`,
                  e?.target?.value,
                  isPrimary
                );
              }}
              maxLength={SCHEDULE_INTERVIEW_ADDRESS_MAX_LENGTH}
              placeholder={intl.formatMessage({
                id: `label.placeholder.enterAddress`,
              })}
              value={details[interviewKey].address}
              {...primaryAddressProps}
            />
            {renderDateComponents(
              details[interviewKey],
              setDetails,
              interviewKey,
              isPrimary
            )}
          </>
        );
      case 1: // Telephonic
        return renderDateComponents(
          details[interviewKey],
          setDetails,
          interviewKey,
          isPrimary
        );

      case 2: // Remote
        return (
          <>
            <CustomInput
              customInputNumberStyles={styles.input}
              customLabelStyles={styles.inputLabel}
              customContainerStyles={styles.customContainerStyles}
              label={intl.formatMessage({ id: "label.placeholder.link" })}
              onChange={(e) => {
                handleValueChange(
                  details,
                  setDetails,
                  `${interviewKey}.link`,
                  e?.target?.value,
                  isPrimary
                );
              }}
              placeholder={intl.formatMessage({ id: "label.placeholder.link" })}
              value={details[interviewKey].link}
              {...primaryLinkProps}
            />
            {renderDateComponents(
              details[interviewKey],
              setDetails,
              interviewKey,
              isPrimary
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <CommonModal
      width={700}
      isOpen={isOpen}
      closeIcon={true}
      onCancel={handleCloseModal}
    >
      <div className={styles.mainContainer}>
        {notificationContextHolder}
        <TwoRow
          className={styles.scheduleInterviewDetails}
          topSection={
            <div className={styles.headingContainer}>
              <div>
                <Typography className={styles.modalHeadingText}>
                  {intl.formatMessage({
                    id: `label.scheduleInterview`,
                  })}
                </Typography>
              </div>
              <div className={styles.borderBottom}></div>
            </div>
          }
          bottomSection={
            <TwoRow
              topSection={
                <div className={styles.primaryScheduledcontainer}>
                  <Typography className={styles.interviewTypeHeadingText}>
                    {intl.formatMessage({
                      id: `label.primaryInterviewSchedule`,
                    })}
                  </Typography>
                  {renderInterviewType(
                    primaryInterviewType,
                    setPrimaryInterviewType
                  )}
                  {renderInterviewDetails(
                    primaryInterviewType,
                    primaryDetails,
                    setPrimaryDetails,
                    true
                  )}
                  <div className={styles.borderBottom}></div>
                </div>
              }
              bottomSection={
                <div className={styles.primaryScheduledcontainer}>
                  <div className={styles.applicantDetailContainer}>
                    <Typography className={styles.interviewTypeHeadingText}>
                      {intl.formatMessage({
                        id: `label.alternateInterviewSchedule`,
                      })}
                    </Typography>
                  </div>
                  {renderInterviewType(
                    secondaryInterviewType,
                    setSecondaryInterviewType
                  )}
                  {renderInterviewDetails(
                    secondaryInterviewType,
                    alternateDetails,
                    setAlternateDetails,
                    false
                  )}
                  <div className={styles.ActionAndCancelButtonContainer}>
                    <ActionAndCancelButtons
                        customActionBtnStyles={styles.customActionBtnStyles}
                        customCancelBtnStyles={styles.customCancelBtnStyles}
                        actionBtnText={intl.formatMessage({
                        id: "label.schedule",
                        })}
                        cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                        onActionBtnClick={handleScheduleInterview}
                        isActionBtnDisable={
                          isScheduleButtonDisabled() || isScheduleInterviewLoading
                        }
                        onCancelBtnClick={handleCloseModal}
                        isctionButtonLoading={isScheduleInterviewLoading}
                    />
                  </div>
                </div>
              }
            />
          }
        />
      </div>
    </CommonModal>
  );
};

export default ScheduleInterviewModal;
