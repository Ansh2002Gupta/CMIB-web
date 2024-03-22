import { Typography } from "antd";

import { SORT_VALUES } from "../../constant/constant";
import styles from "./RegisteredCompaniesList.module.scss";

export const getRegisteredCompanyColumn = ({
  getImage,
  handleEyeIcon,
  handleSorting,
  intl,
  renderColumn,
  setSortBy,
  sortBy,
}) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.company_name" }),
      dataIndex: "name",
      key: "name",
      sortKey: "name",
      renderSorterColumn: true,
      setSortBy: setSortBy,
      columnSortByHandler: handleSorting,
      customIconStyle: [
        styles[sortBy],
        sortBy === SORT_VALUES.ASCENDING || sortBy === SORT_VALUES.DESCENDING
          ? styles.active
          : "",
      ],
      renderText: { visible: true, textStyles: [styles.tableCell].join(" ") },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.type" }),
      dataIndex: "type",
      key: "type",
      renderText: {
        visible: true,
        textStyles: styles.tableCell,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.approved_not_approved" }),
      dataIndex: "approved",
      key: "approved",
      render: (data, rowData) => {
        const { approved } = rowData;
        return (
          <div className={styles.statusBox}>
            <Typography className={styles.appovedText}>{approved}</Typography>
          </div>
        );
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdOn" }),
      dataIndex: "created_at",
      key: "created_at",
      renderText: {
        isTypeDate: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      dataIndex: "see",
      key: "see",
      renderImage: {
        alt: "msg",
        preview: false,
        src: getImage("eye"),
        visible: true,
        onClick: (data) => handleEyeIcon(data),
      },
    }),
  ];
};
