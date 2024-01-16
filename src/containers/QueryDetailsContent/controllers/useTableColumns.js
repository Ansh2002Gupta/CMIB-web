import { useIntl } from "react-intl";
import moment from "moment";
import { Space, Typography } from "antd";
import styles from "../QueryDetailsContent.module.scss";

const useTableColumns = () => {
  const intl = useIntl();
  const getLayout = (type, data) => {
    if (type === "company") {
      const columnsData = [
        {
          key: "1",
          label: intl.formatMessage({ id: "label.companyName" }),
          children: data?.name || "--",
        },
        {
          key: "2",
          label: intl.formatMessage({
            id: "label.nonRegisteredStudentOrCompany",
          }),
          children: `Non-registered Company`,
        },
        {
          key: "3",
          label: intl.formatMessage({ id: "label.queryType" }),
          children: data?.query_type,
        },
        {
          key: "4",
          label: intl.formatMessage({ id: "label.query" }),
          span: 3,
          children: data?.query,
        },
        {
          key: "5",
          label: (
            <Typography className={styles.label}>
              {" "}
              {intl.formatMessage({ id: "label.entity" })}{" "}
              <span className={styles.isRequired}>*</span>
            </Typography>
          ),
          children: data?.entity,
        },
        {
          key: "6",
          label: (
            <Typography className={styles.label}>
              {" "}
              {intl.formatMessage({ id: "label.firmRegistrationNo" })}{" "}
              <span className={styles.isRequired}>*</span>
            </Typography>
          ),
          children: data?.firm_registration_number,
        },
        {
          key: "7",
          label: (
            <Typography className={styles.label}>
              {" "}
              {intl.formatMessage({ id: "label.partnersNo" })}{" "}
              <span className={styles.isRequired}>*</span>
            </Typography>
          ),
          children: data?.partners_number || 0,
        },
        {
          key: "8",
          label: (
            <Typography className={styles.label}>
              {" "}
              {intl.formatMessage({ id: "label.currentIndustry" })}{" "}
              <span className={styles.isRequired}>*</span>
            </Typography>
          ),
          children: data?.current_industry,
        },
        {
          key: "9",
          label: (
            <Typography className={styles.label}>
              {" "}
              {intl.formatMessage({ id: "label.contactPersonName" })}{" "}
              <span className={styles.isRequired}>*</span>
            </Typography>
          ),
          children: data?.contact_person_name,
        },
        {
          key: "10",
          label: (
            <Typography className={styles.label}>
              {" "}
              {intl.formatMessage({
                id: "label.contactPersonDesignation",
              })}{" "}
              <span className={styles.isRequired}>*</span>
            </Typography>
          ),
          children: data?.contact_person_designation,
        },
        {
          key: "11",
          label: intl.formatMessage({ id: "label.mobileNumber" }),
          children: data?.mobile,
        },
        {
          key: "12",
          label: intl.formatMessage({ id: "label.emailId" }),
          children: data?.email,
        },
        {
          key: "13",
          label: intl.formatMessage({ id: "label.dateCreatedOn" }),
          children: moment(new Date(data?.created_at)).format("DD/MM/YYYY"),
        },
      ];

      return columnsData?.filter((item) => item?.children);
    }

    return [
      {
        key: "1",
        label: intl.formatMessage({ id: "label.studentName" }),
        children: data?.name || "--",
      },
      {
        // TODO: please confirm that this data will shown as it is or require some changes.
        key: "2",
        label: intl.formatMessage({
          id: "label.nonRegisteredStudentOrCompany",
        }),
        children: `Non-registered Student`,
      },
      {
        key: "3",
        label: intl.formatMessage({ id: "label.queryType" }),
        children: data?.query_type,
      },
      {
        key: "4",
        label: intl.formatMessage({ id: "label.query" }),
        span: 3,
        children: data?.query,
      },
      {
        key: "5",
        label: intl.formatMessage({ id: "label.mobileNumber" }),
        children: data?.mobile,
      },
      {
        key: "6",
        label: intl.formatMessage({ id: "label.emailId" }),
        children: data?.email,
      },
      {
        key: "7",
        label: intl.formatMessage({ id: "label.dateCreatedOn" }),
        children: moment(new Date(data?.created_at)).format("DD/MM/YYYY"),
      },
    ];
  };

  return {
    getLayout,
  };
};

export default useTableColumns;
