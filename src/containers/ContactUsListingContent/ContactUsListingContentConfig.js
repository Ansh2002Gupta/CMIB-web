import { Image, Typography } from "antd";
import styles from "./ContactUsListingContent.module.scss";
import CustomCheckBox from "../../components/CustomCheckBox/CustomCheckBox";

const getStatusStyles = (status) => {
  if (
    status?.toLowerCase() === "closed" ||
    status?.toLowerCase() === "answered"
  ) {
    return ["statusContainer_success", "statusText_success"];
  }
  if (status?.toLowerCase() === "pending") {
    return ["statusContainer_failed", "statusText_failed"];
  }
  return ["statusContainer_progress", "statusText_progress"];
};

export const getTicketOrQueryColumn = ({
  type,
  intl,
  getImage,
  navigate,
  renderColumn,
  queriesColumnProperties = {},
}) => {
  const { sortArrowStyles, selectedItemsList, setSelectedItemsList } =
    queriesColumnProperties;
  if (type === "2") {
    return [
      renderColumn({
        title: (
          <div>
            <CustomCheckBox customStyles={styles.columnHeading}>
              {intl.formatMessage({ id: "label.queriesId" })}
            </CustomCheckBox>
          </div>
        ),
        dataIndex: "readable_id",
        key: "readable_id",
        renderTextWithCheckBoxes: {
          visible: true,
          isCheckBoxTextBold: true,
          customCheckBoxContainerStyles: [styles.tableCell].join(" "),
          checkBoxList: selectedItemsList,
          funForCheckingIsCheckBoxDisable: (rowData) => {
            const { status } = rowData;
            return status?.toLowerCase() === "answered";
          },
          onClickCheckbox: (rowData) => {
            const { id } = rowData;
            if (selectedItemsList?.includes(id)) {
              const updatedData = selectedItemsList?.filter(
                (val) => val !== id
              );
              setSelectedItemsList(updatedData);
              return;
            }
            setSelectedItemsList((prev) => [...prev, id]);
          },
        },
      }),
      renderColumn({
        title: (
          <Typography
            className={[styles.columnHeading, styles.centerContent].join(" ")}
            // onClick={() =>
            //   fetchData({
            //     queryParamsObject: {
            //       perPage: pageSize,
            //       page: current,
            //       keyword: searchedValue,
            //       sort: toggleSorting(sortedOrder.sortDirection),
            //       order: sortedOrder.sortKeyName,
            //     },
            //     onSuccessCallback: () => {
            //       setSearchParams((prevValue) => {
            //         prevValue.set(
            //           SORT_PROPERTIES.SORT_BY,
            //           toggleSorting(sortedOrder.sortDirection)
            //         );
            //         return prevValue;
            //       });
            //       setSortedOrder((prev) => {
            //         return {
            //           ...prev,
            //           sortDirection: toggleSorting(prev.sortDirection),
            //         };
            //       });
            //     },
            //   })
            // }
          >
            {intl.formatMessage({ id: "label.studentOrCompany" })}
            <div className={styles.sortintArrawContainer}>
              <Image
                src={getImage("arrowDownDarkGrey")}
                preview={false}
                className={[sortArrowStyles, styles.centerContent].join(" ")}
              />
            </div>
          </Typography>
        ),
        dataIndex: "name",
        key: "name",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      }),
      renderColumn({
        title: intl.formatMessage({
          id: "label.nonRegisteredStudentOrCompany",
        }),
        dataIndex: "type",
        key: "type",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      }),
      renderColumn({
        title: intl.formatMessage({ id: "label.queryStatus" }),
        dataIndex: "status",
        key: "status",
        render: (data, rowData) => {
          const { status } = rowData;
          const styleClassForContainer = getStatusStyles(status)[0];
          const styleClassForText = getStatusStyles(status)[1];
          return (
            <div
              className={[
                styles.statusBox,
                styles[styleClassForContainer],
              ].join(" ")}
            >
              <Typography className={styles[styleClassForText]}>
                {status}
              </Typography>
            </div>
          );
        },
      }),
      renderColumn({
        title: intl.formatMessage({ id: "label.email" }),
        dataIndex: "email",
        key: "email",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      }),
      {
        title: () => (
          <p className={styles.columnHeading}>
            {intl.formatMessage({ id: "label.mobileNumber" })}
          </p>
        ),
        dataIndex: "mobile",
        key: "mobile",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      },
      renderColumn({
        title: intl.formatMessage({ id: "label.queryType" }),
        dataIndex: "query_type",
        key: "query_type",
        renderText: {
          visible: true,
          textStyles: [styles.centerText, styles.tableCell].join(" "),
        },
      }),
      renderColumn({
        title: (
          <Typography
            className={styles.columnHeading}
            // onClick={() =>
            //   fetchData({
            //     queryParamsObject: {
            //       perPage: pageSize,
            //       page: current,
            //       keyword: searchedValue,
            //       sort: toggleSorting(sortedOrder.sortDirection),
            //       order: sortedOrder.sortKeyName,
            //     },
            //     onSuccessCallback: () => {
            //       setSearchParams((prevValue) => {
            //         prevValue.set(
            //           SORT_PROPERTIES.SORT_BY,
            //           toggleSorting(sortedOrder.sortDirection)
            //         );
            //         return prevValue;
            //       });
            //       setSortedOrder((prev) => {
            //         return {
            //           ...prev,
            //           sortDirection: toggleSorting(prev.sortDirection),
            //         };
            //       });
            //     },
            //   })
            // }
          >
            {intl.formatMessage({ id: "label.createdOn" })}
            <Image
              src={getImage("arrowDownDarkGrey")}
              preview={false}
              className={[sortArrowStyles].join(" ")}
            />
          </Typography>
        ),
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
          alt: "eye",
          preview: false,
          src: getImage("eye"),
          visible: true,
          onClick: (rowData) => navigate(`query/${rowData?.id}`),
        },
      }),
      renderColumn({
        dataIndex: "check",
        key: "check",
        renderImage: {
          alt: "check",
          preview: false,
          src: getImage("rightIcon"),
          visible: true,
        },
      }),
    ];
  }

  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.ticketId" }),
      dataIndex: "readable_id",
      key: "readable_id",
      renderText: {
        isTextBold: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdBy" }),
      dataIndex: "created_by",
      key: "created_by",
      sortKey: "created_by",
      sortTypeText: true,
      renderText: { visible: true, textStyles: [styles.tableCell].join(" ") },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.role" }),
      dataIndex: "role",
      key: "role",
      renderText: { visible: true, textStyles: [styles.tableCell].join(" ") },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.registrationOrMembershipNumber" }),
      dataIndex: "registration_no",
      key: "registration_no",
      renderText: { visible: true, textStyles: [styles.tableCell].join(" ") },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.queryType" }),
      dataIndex: "query_type",
      key: "query_type",
      renderText: {
        visible: true,
        textStyles: [styles.centerText, styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.status" }),
      dataIndex: "status",
      key: "status",
      render: (data, rowData) => {
        const { status } = rowData;
        const styleClassForContainer = getStatusStyles(status)[0];
        const styleClassForText = getStatusStyles(status)[1];
        return (
          <div
            className={[styles.statusBox, styles[styleClassForContainer]].join(
              " "
            )}
          >
            <Typography className={styles[styleClassForText]}>
              {status}
            </Typography>
          </div>
        );
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.assignedTo" }),
      dataIndex: "assigned_to",
      key: "assigned_to",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isCapitalize: true,
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
      sortDirection: ["ascend"],
      sortKey: "created_at",
      sortTypeDate: true,
      defaultSortOrder: "ascend",
    }),
    renderColumn({
      dataIndex: "see",
      key: "see",
      renderImage: {
        alt: "eye",
        preview: false,
        src: getImage("messageText"),
        visible: true,
      },
    }),
  ];
};
