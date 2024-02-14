import { SESSION_PERIOD } from "../../constant/constant";
import { formatDate } from "../../constant/utils";
import {
  ALPHANUMERIC_REGEX,
  BANK_ACC_NUMBER_REGEX,
  HSN_SAC_CODE_REGEX,
  IFSC_CODE_REGEX,
  PERFORMA_INVOICE_REGEX,
} from "../../constant/regex";

export const FIELDS = (
  name,
  nature_of_services,
  pi_number_format,
  ps_examination_periods,
  mcs_completion_date,
  membership_completion_date,
  article_completion_to_date,
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
          regex: ALPHANUMERIC_REGEX,
          required: true,
          message: "sessionName",
        },
      ],
    },
    {
      id: 2,
      headingIntl: "natureOfGoods",
      label: "nature_of_services",
      value: nature_of_services,
      rules: [
        {
          regex: ALPHANUMERIC_REGEX,
          required: true,
          message: "natureOfGoods",
        },
      ],
    },
    {
      id: 3,
      headingIntl: "invoiceNumberFormat",
      label: "pi_number_format",
      value: pi_number_format,
      rules: [
        {
          regex: PERFORMA_INVOICE_REGEX,
          required: true,
          message: "invoiceNumberFormat",
        },
      ],
    },
    {
      id: 4,
      headingIntl: "examinationSessionPeriod",
      label: "ps_examination_periods",
      value: ps_examination_periods,
      selectOptions: SESSION_PERIOD,
      rules: [
        {
          required: true,
          message: "examinationSessionPeriod",
        },
      ],
    },
    {
      id: 5,
      headingIntl: "mcsCompletetionDate",
      label: "mcs_completion_date",
      value: formatDate({ date: mcs_completion_date }),
      rules: [
        {
          required: true,
          message: "mcsCompletetionDate",
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
          message: "membershipCompletetionDate",
        },
      ],
    },
    {
      id: 7,
      headingIntl: "articleshipCompletetionFromDate",
      label: "article_completion_from_date",
      value: formatDate({ date: article_completion_from_date }),

      rules: [
        {
          required: true,
          message: "articleshipCompletetionFromDate",
        },
      ],
    },
    {
      id: 8,
      headingIntl: "articleshipCompletetionToDate",
      label: "article_completion_to_date",
      value: formatDate({ date: article_completion_to_date }),
      rules: [
        {
          required: true,
          message: "articleshipCompletetionToDate",
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
          regex: HSN_SAC_CODE_REGEX,
          required: true,
          message: "hsnCode",
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
          regex: BANK_ACC_NUMBER_REGEX,
          required: true,
          message: "bankACNumber",
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
          regex: IFSC_CODE_REGEX,
          required: true,
          message: "ifsc",
        },
      ],
    },
  ];
};
