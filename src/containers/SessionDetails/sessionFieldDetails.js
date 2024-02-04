import { SESSION_PERIOD } from "../../constant/constant";
import { formatDate } from "../../constant/utils";

export const FIELDS = (
  name,
  nature_of_service,
  perform_invoice_no_format,
  examination_session_period,
  gmcs_completion_date,
  membership_completion_date,
  session_start_date,
  article_completion_from_date,
  hsn_sac_code,
  bank_ac_no,
  bank_ac_ifsc
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
      value: formatDate({ date: gmcs_completion_date }),
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
      value: formatDate({ date: membership_completion_date }),
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
      value: formatDate({ date: session_start_date }),
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
      value: formatDate({ date: article_completion_from_date }),
      rules: [
        {
          required: true,
          message: "Please select Articleship Completetion From Date",
        },
      ],
    },
    {
      id: 9,
      headingIntl: "hsnCode",
      label: "hsn_sac_code",
      value: hsn_sac_code,
      rules: [
        {
          required: true,
          message: "Please enter HSN Code/ SAC",
        },
      ],
    },
    {
      id: 10,
      headingIntl: "bankACNumber",
      label: "bank_ac_no",
      value: bank_ac_no,
      rules: [
        {
          required: true,
          message: "Please enter Bank A/C number",
        },
      ],
    },
    {
      id: 11,
      headingIntl: "ifsc",
      label: "bank_ac_ifsc",
      value: bank_ac_ifsc,
      rules: [
        {
          required: true,
          message: "Please enter IFSC Code",
        },
      ],
    },
  ];
};
