import { SESSION_PERIOD } from "../../constant/constant";
import { FormatDate } from "../../constant/utils";

export const FIELDS = (
  name,
  nature_of_service,
  perform_invoice_no_format,
  examination_session_period,
  gmcs_completion_date,
  membership_completion_date,
  session_start_date,
  article_completion_from_date,
  bank_account_offline,
  bank_account_online
) => {
  return [
    {
      id: 1,
      headingIntl: "sessionName",
      label: "name",
      value: name,
      rules: [
        {
          required: true,
          message: "Please enter Session Name",
        },
      ],
    },
    {
      id: 2,
      headingIntl: "natureOfGoods",
      label: "nature_of_service",
      value: nature_of_service,
      rules: [
        {
          required: true,
          message: "Please enter services/goods",
        },
      ],
    },
    {
      id: 3,
      headingIntl: "invoiceNumberFormat",
      label: "perform_invoice_no_format",
      value: perform_invoice_no_format,
      rules: [
        {
          required: true,
          message: "Please enter Performa Invoice Number",
        },
      ],
    },
    {
      id: 4,
      headingIntl: "examinationSessionPeriod",
      label: "examination_session_period",
      value: examination_session_period,
      selectOptions: SESSION_PERIOD,
      rules: [
        {
          required: true,
          message: "Please select atleast one Examination Session Period ",
        },
      ],
    },
    {
      id: 5,
      headingIntl: "gmcsCompletetionDate",
      label: "gmcs_completion_date",
      value: FormatDate(gmcs_completion_date),
      rules: [
        {
          required: true,
          message: "Please select GMCS Completetion Date",
        },
      ],
    },
    {
      id: 6,
      headingIntl: "membershipCompletetionDate",
      label: "membership_completion_date",
      value: FormatDate(membership_completion_date),
      rules: [
        {
          required: true,
          message: "Please select Membership Completetion Date",
        },
      ],
    },
    {
      id: 7,
      headingIntl: "articleshipCompletetionFromDate",
      label: "session_start_date",
      value: FormatDate(session_start_date),
      rules: [
        {
          required: true,
          message: "Please select Articleship Completetion From Date",
        },
      ],
    },
    {
      id: 8,
      headingIntl: "articleshipCompletetionToDate",
      label: "article_completion_from_date",
      value: FormatDate(article_completion_from_date),
      rules: [
        {
          required: true,
          message: "Please select Articleship Completetion From Date",
        },
      ],
    },
    {
      id: 9,
      headingIntl: "bankACNumberOffline",
      label: "bank_account_offline",
      value: bank_account_offline,
      rules: [
        {
          required: true,
          message: "Please enter Bank A/C number offline",
        },
      ],
    },
    {
      id: 10,
      headingIntl: "bankACNumberOnline",
      label: "bank_account_online",
      value: bank_account_online,
      rules: [
        {
          required: true,
          message: "Please enter Bank A/C number online",
        },
      ],
    },
  ];
};
