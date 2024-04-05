import CustomSwitch from "../../components/CustomSwitch";
import styles from "./RegisteredCompaniesDetails.module.scss";

export const getRegisteredCompanyDetailsColumns = ({
  handleSwitchButton,
  intl,
  isUpdatingApprovalStatus,
  renderColumn,
}) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.module" }),
      dataIndex: "label",
      key: "label",
      renderText: {
        isCapitalize: true,
        visible: true,
      },
      customStyles: styles.tableCellStyle,
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.approved_not_approved" }),
      dataIndex: "is_approved",
      key: "is_approved",
      customStyles: styles.tableCellStyle,
      render: (data, rowData) => {
        const { is_approved } = rowData;
        const isChecked = is_approved === 1;
        return (
          <div className={styles.statusBox}>
            <CustomSwitch
              activeText={"approved"}
              inActiveText={"not_approved"}
              checked={isChecked}
              customStyle={styles.checkBoxStyle}
              customTextStyle={isChecked ? styles.disabledtext : {}}
              onChange={() => handleSwitchButton(rowData)}
              disabled={isChecked || isUpdatingApprovalStatus}
            />
          </div>
        );
      },
    }),
  ];
};
