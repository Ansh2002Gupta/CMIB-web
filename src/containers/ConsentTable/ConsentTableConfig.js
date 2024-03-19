import { useIntl } from "react-intl";

import { isNotAFutureDate, compareTwoDayjsDates } from "../../constant/utils";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import styles from "./ConsentTable.module.scss";
import "./Override.css";

const useConsentTableColumns = (
  errors,
  isEdit,
  registration,
  registrationDatesData,
  onDateChange
) => {
  const { renderColumn } = useRenderColumn();
  const intl = useIntl();

  const columns = registration
    ? [
        renderColumn({
          title: intl.formatMessage({ id: "label.sNo" }),
          dataIndex: "id",
          key: "id",
          renderText: {
            visible: true,
            includeDotAfterText: true,
            textStyles: styles.textStyles,
          },
          render: (_, __, index) => {
            return {
              props: {
                className: styles.customStyles,
              },
              children: <p>{index + 1}.</p>,
            };
          },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.centreName" }),
          dataIndex: "centre_name",
          key: "centre_name",
          renderText: {
            isCapitalize: true,
            isCentre: true,
            isTextBold: true,
            visible: true,
          },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.company_reg_end_date" }),
          customColumnHeading: styles.customColumnHeading,
          dataIndex: "company_reg_end_date",
          key: "company_reg_end_date",
          isRequiredField: true,
          renderDateTime: {
            getDisabledDate: (current, record) => {
              return (
                isNotAFutureDate(current) ||
                compareTwoDayjsDates({
                  current: current,
                  date: registrationDatesData["company_reg_start_date"],
                  checkForFuture: false,
                })
              );
            },
            getError: (index) => errors[index].company_reg_end_date,
            visible: true,
            isEditable: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.company_reg_end_date",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "company_reg_end_date", date),
            useExactDate: true,
          },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.psychometric_test_date" }),
          customColumnHeading: styles.customColumnHeading,
          dataIndex: "psychometric_test_date",
          isRequiredField: true,
          key: "psychometric_test_date",
          renderDateTime: {
            getDisabledDate: (current, record) => {
              return isNotAFutureDate(current);
            },
            getError: (index) => errors[index].psychometric_test_date,
            isEditable: isEdit,
            visible: true,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.psychometric_test_date",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "psychometric_test_date", date),
            useExactDate: true,
          },
        }),
      ]
    : [
        renderColumn({
          title: intl.formatMessage({ id: "label.sNo" }),
          dataIndex: "id",
          key: "id",
          renderText: {
            visible: true,
            includeDotAfterText: true,
            textStyles: styles.textStyles,
          },
          render: (_, __, index) => {
            return {
              props: {
                className: styles.customStyles,
              },
              children: <p>{index + 1}.</p>,
            };
          },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.centreName" }),
          dataIndex: "centre_name",
          key: "centre_name",
          renderText: {
            isCapitalize: true,
            isCentre: true,
            isTextBold: true,
            visible: true,
          },
        }),
        renderColumn({
          title: intl.formatMessage({
            id: "label.company_shortlisting_start_date",
          }),
          customColumnHeading: styles.customColumnHeading,
          dataIndex: "company_shortlisting_start_date",
          key: "company_shortlisting_start_date",
          isRequiredField: true,
          renderDateTime: {
            getDisabledDate: (current, record) => {
              return (
                isNotAFutureDate(current) ||
                compareTwoDayjsDates({
                  current: current,
                  date: record["company_shortlisting_end_date"],
                  checkForFuture: true,
                }) ||
                compareTwoDayjsDates({
                  current: current,
                  date: record["candidate_consent_marking_start_date"],
                  checkForFuture: true,
                }) ||
                compareTwoDayjsDates({
                  current: current,
                  date: registrationDatesData[
                    record?.centreSize === "small"
                      ? "candidate_reg_end_date_sm_centre"
                      : "candidate_reg_end_date_bg_centre"
                  ],
                  checkForFuture: false,
                })
              );
            },
            getError: (index) => errors[index].company_shortlisting_start_date,
            visible: true,
            isEditable: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.company_shortlisting_start_date",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "company_shortlisting_start_date", date),
            useExactDate: true,
          },
        }),
        renderColumn({
          title: intl.formatMessage({
            id: "label.company_shortlisting_end_date",
          }),
          customColumnHeading: styles.customColumnHeading,
          dataIndex: "company_shortlisting_end_date",
          isRequiredField: true,
          key: "company_shortlisting_end_date",
          renderDateTime: {
            getDisabledDate: (current, record) => {
              return (
                isNotAFutureDate(current) ||
                compareTwoDayjsDates({
                  current: current,
                  date: record["company_shortlisting_start_date"],
                  checkForFuture: false,
                }) ||
                compareTwoDayjsDates({
                  current: current,
                  date: record["candidate_consent_marking_end_date"],
                  checkForFuture: true,
                }) ||
                compareTwoDayjsDates({
                  current: current,
                  date: registrationDatesData[
                    record?.centreSize === "small"
                      ? "candidate_reg_end_date_sm_centre"
                      : "candidate_reg_end_date_bg_centre"
                  ],
                  checkForFuture: false,
                })
              );
            },
            getError: (index) => errors[index].company_shortlisting_end_date,
            visible: true,
            isEditable: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.company_shortlisting_end_date",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "company_shortlisting_end_date", date),
            useExactDate: true,
          },
          renderText: { visible: !isEdit, isTypeDate: true },
        }),
        renderColumn({
          title: intl.formatMessage({
            id: "label.candidate_consent_marking_start_date",
          }),
          customColumnHeading: styles.customColumnHeading,
          dataIndex: "candidate_consent_marking_start_date",
          isRequiredField: true,
          key: "candidate_consent_marking_start_date",
          renderDateTime: {
            getDisabledDate: (current, record) => {
              return (
                isNotAFutureDate(current) ||
                compareTwoDayjsDates({
                  current: current,
                  date: record["candidate_consent_marking_end_date"],
                  checkForFuture: true,
                }) ||
                compareTwoDayjsDates({
                  current: current,
                  date: record["company_shortlisting_start_date"],
                  checkForFuture: false,
                }) ||
                compareTwoDayjsDates({
                  current: current,
                  date: registrationDatesData[
                    record?.centreSize === "small"
                      ? "candidate_reg_end_date_sm_centre"
                      : "candidate_reg_end_date_bg_centre"
                  ],
                  checkForFuture: false,
                })
              );
            },
            getError: (index) =>
              errors[index].candidate_consent_marking_start_date,
            visible: true,
            isEditable: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.candidate_consent_marking_start_date",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(
                record,
                "candidate_consent_marking_start_date",
                date
              ),
            useExactDate: true,
          },
        }),
        renderColumn({
          title: intl.formatMessage({
            id: "label.candidate_consent_marking_end_date",
          }),
          customColumnHeading: styles.customColumnHeading,
          dataIndex: "candidate_consent_marking_end_date",
          isRequiredField: true,
          key: "candidate_consent_marking_end_date",
          renderDateTime: {
            getDisabledDate: (current, record) => {
              return (
                isNotAFutureDate(current) ||
                compareTwoDayjsDates({
                  current: current,
                  date: record["candidate_consent_marking_start_date"],
                  checkForFuture: false,
                }) ||
                compareTwoDayjsDates({
                  current: current,
                  date: record["company_shortlisting_end_date"],
                  checkForFuture: false,
                }) ||
                compareTwoDayjsDates({
                  current: current,
                  date: registrationDatesData[
                    record?.centre_size === "small"
                      ? "candidate_reg_end_date_sm_centre"
                      : "candidate_reg_end_date_bg_centre"
                  ],
                  checkForFuture: false,
                })
              );
            },
            getError: (index) =>
              errors[index].candidate_consent_marking_end_date,
            visible: true,
            isEditable: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.candidate_consent_marking_end_date",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "candidate_consent_marking_end_date", date),
            useExactDate: true,
          },
        }),
      ];

  return columns;
};

export default useConsentTableColumns;
