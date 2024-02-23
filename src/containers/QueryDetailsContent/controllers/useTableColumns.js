import { useIntl } from "react-intl";
import { Typography } from "antd";
import { capitalize } from "lodash";

import { formatDate } from "../../../constant/utils";
import styles from "../QueryDetailsContent.module.scss";

const useTableColumns = () => {
  const intl = useIntl();

  const getTextWithStar = (text) => {
    return (
      <Typography className={styles.label}>
        {text}
        &nbsp;
        <span className={styles.isRequired}>*</span>
      </Typography>
    );
  };

  const getLayout = (type, data) => {
    if (type?.toLowerCase() === "company") {
      const columnsData = [
        {
          key: "1",
          label: intl.formatMessage({ id: "label.companyName" }),
          children: capitalize(data?.name) || "-",
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
          label: intl.formatMessage({ id: "label.entity" }),
          children: data?.entity,
        },
        {
          key: "6",
          label: intl.formatMessage({ id: "label.firmRegistrationNo" }),
          children: data?.firm_registration_number,
        },
        {
          key: "7",
          label: intl.formatMessage({ id: "label.partnersNo" }),
          children: data?.partners_number || 0,
        },
        {
          key: "8",
          label: intl.formatMessage({ id: "label.currentIndustry" }),
          children: data?.current_industry,
        },
        {
          key: "9",
          label: intl.formatMessage({ id: "label.contactPersonName" }),
          children: data?.contact_person_name,
        },
        {
          key: "10",
          label: intl.formatMessage({ id: "label.contactPersonDesignation" }),
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
          children: formatDate({ date: data?.created_at }),
        },
      ];

      return columnsData?.filter((item) => item?.children);
    }

    return [
      {
        key: "1",
        label: intl.formatMessage({ id: "label.studentName" }),
        children: capitalize(data?.name) || "-",
      },
      {
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
        children: formatDate({ date: data?.created_at }),
      },
    ];
  };

  return {
    getLayout,
  };
};

export default useTableColumns;
