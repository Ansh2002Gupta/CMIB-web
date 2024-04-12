export const APPLICANT_DETAILS_FEILDS = (
    applicantName,
    applicantId,
  ) => {
    return [
      {
        id: 1,
        headingIntl: "applicantName",
        label: "applicantName",
        value: applicantName,
        isMandatory: false,
      },
      {
        id: 2,
        headingIntl: "applicantId",
        label: "applicantId",
        value: applicantId,
        isMandatory: false,
      },
    ];
  };

   export const PRIMARY_INTERVIEW_SCHEDUlE = (
    date,
    time,
    interviewType,
    meetingLink,
    venueAddress,
  ) => {
    return [
      {
        id: 1,
        headingIntl: "date",
        label: "date",
        value: date,
        isMandatory: false,
      },
      {
        id: 2,
        headingIntl: "time",
        label: "time",
        value: time,
        isMandatory: false,
      },
      {
        id: 3,
        headingIntl: "interviewType",
        label: "interviewType",
        value: interviewType,
        isMandatory: false,
      },
      {
        id: 4,
        headingIntl: "meetingLink",
        label: "meetingLink",
        value: meetingLink,
        isMandatory: false,
      },
      {
        id: 5,
        headingIntl: "venueAddress",
        label: "venueAddress",
        value: venueAddress,
        isMandatory: false,
      },
    ];
  };