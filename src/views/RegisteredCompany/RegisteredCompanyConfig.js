import { Image, Typography } from "antd";

import { isUserAdmin } from "../../constant/utils";
import { SORT_VALUES } from "../../constant/constant";
import styles from "./RegisteredCompany.module.scss";

export const getRegisteredCompanyColumn = ({
  getImage,
  handleClickAssign,
  handleTicketIcon,
  handleSorting,
  intl,
  renderColumn,
  setSortBy,
  sortBy,
  userProfileDetails,
}) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.company_name" }),
      dataIndex: "company_name",
      key: "company_name",
      sortKey: "company_name",
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
      dataIndex: "company_type",
      key: "company_type",
      renderText: {
        visible: true,
        textStyles: styles.tableCell,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.approved_not_approved" }),
      dataIndex: "status",
      key: "status",
      render: (data, rowData) => {
        const { status } = rowData;
        return (
          <div className={styles.statusBox}>
            <Typography className={styles.ClassForText}>{status}</Typography>
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
        onClick: (data) => handleTicketIcon(data),
      },
    }),
    ...(isUserAdmin(userProfileDetails?.userDetails)
      ? [
          renderColumn({
            dataIndex: "see",
            key: "see",
            render: (data, rowData) => {
              const { status } = rowData;
              const isClosed = status.toLowerCase() === "closed";
              return (
                <Image
                  src={
                    isClosed
                      ? getImage("iconProfileAddDisabled")
                      : getImage("iconProfileAdd")
                  }
                  preview={false}
                  alt="addAssignee"
                  visible
                  onClick={() => !isClosed && handleClickAssign(rowData)}
                  className={
                    isClosed ? styles.assignIconDisabled : styles.assignIcon
                  }
                />
              );
            },
          }),
        ]
      : []),
  ];
};
