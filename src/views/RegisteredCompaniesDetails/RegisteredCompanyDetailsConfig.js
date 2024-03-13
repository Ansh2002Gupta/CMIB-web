import CustomSwitch from "../../components/CustomSwitch";
import styles from "./RegisteredCompaniesDetails.module.scss";

export const getRegisteredCompanyDetailsColumns = ({
  handleSwitchButton,
  intl,
  renderColumn,
}) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.module" }),
      dataIndex: "module",
      key: "module",
      renderText: {
        isCapitalize: true,
        visible: true,
        textStyles: styles.tableCell,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.approved_not_approved" }),
      dataIndex: "status",
      key: "status",
      render: (data, rowData) => {
        const { approved_not_approved } = rowData;
        const isChecked = approved_not_approved.toLowerCase() === "approved";
        return (
          <div className={styles.statusBox}>
            <CustomSwitch
              activeText={"approved"}
              inActiveText={"not_approved"}
              checked={isChecked}
              onChange={() => handleSwitchButton(rowData)}
              disabled={isChecked}
            />
          </div>
        );
      },
    }),
  ];
};
