import { useIntl } from "react-intl";

import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import styles from "./ConsentTable.module.scss";
import "./Override.css";

const useConsentTableColumns = (isEdit, registration, onDateChange) => {
  const { renderColumn } = useRenderColumn();
  const intl = useIntl();

  // Define the columns based on registration prop and isEdit state
  const columns = registration
    ? [
        renderColumn({
          title: intl.formatMessage({ id: "label.sNo" }),
          dataIndex: "sNo",
          key: "sNo",
          renderText: {
            visible: true,
            includeDotAfterText: true,
            textStyles: styles.textStyles,
          },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.centreName" }),
          dataIndex: "centreName",
          key: "centreName",
          renderText: { isTextBold: true, visible: true },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.lastRegistrationDate" }),
          dataIndex: "lastRegistrationDate",
          key: "lastRegistrationDate",
          isRequiredField: true,
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.lastRegistrationDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "lastRegistrationDate", date),
          },
          renderText: { visible: !isEdit, isTypeDate: true },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.psychometricTestDate" }),
          dataIndex: "psychometricTestDate",
          isRequiredField: true,
          key: "psychometricTestDate",
          renderDateTime: {
            isEditable: isEdit,
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.psychometricTestDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "psychometricTestDate", date),
          },
          renderText: { visible: !isEdit, isTypeDate: true },
        }),
      ]
    : [
        renderColumn({
          title: intl.formatMessage({ id: "label.sNo" }),
          dataIndex: "sNo",
          key: "sNo",
          renderText: {
            visible: true,
            includeDotAfterText: true,
            textStyles: styles.textStyles,
          },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.centreName" }),
          dataIndex: "centreName",
          key: "centreName",
          renderText: { isTextBold: true, visible: true },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.companyStartDate" }),
          dataIndex: "companyStartDate",
          key: "companyStartDate",
          isRequiredField: true,
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.companyStartDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "companyStartDate", date),
          },
          renderText: { visible: !isEdit, isTypeDate: true },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.consentFromDate" }),
          dataIndex: "companyEndDate",
          isRequiredField: true,
          key: "companyEndDate",
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.companyEndDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "companyEndDate", date),
          },
          renderText: { visible: !isEdit, isTypeDate: true },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.consentFromDate" }),
          dataIndex: "consentFromDate",
          isRequiredField: true,
          key: "consentFromDate",
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.consentFromDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "consentFromDate", date),
          },
          renderText: { visible: !isEdit, isTypeDate: true },
        }),
        renderColumn({
          title: intl.formatMessage({ id: "label.consentToDate" }),
          dataIndex: "consentToDate",
          isRequiredField: true,
          key: "consentToDate",
          renderDateTime: {
            visible: isEdit,
            type: "date",
            placeholder: intl.formatMessage({
              id: "label.placeholder.consentToDate",
            }),
            customTimeStyle: styles.customTimeStyle,
            onChange: (date, record) =>
              onDateChange(record, "consentToDate", date),
          },
          renderText: { visible: !isEdit, isTypeDate: true },
        }),
      ];

  return columns;
};

export default useConsentTableColumns;
