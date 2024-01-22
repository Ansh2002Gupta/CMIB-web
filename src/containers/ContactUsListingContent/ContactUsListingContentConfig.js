import { Image, Typography } from "antd";

import { SORT_DIRECTIONS, STATUS } from "../../constant/constant";
import styles from "./ContactUsListingContent.module.scss";

const getStatusStyles = (status) => {
  if (status === STATUS.CLOSED) {
    return ["statusContainer_success", "statusText_success"];
  }
  if (status === STATUS.PENDING) {
    return ["statusContainer_failed", "statusText_failed"];
  }
  return ["statusContainer_progress", "statusText_progress"];
};

const getArrowStyles = (str) => {
  if (str === SORT_DIRECTIONS.ASCENDING) {
    return styles.upside;
  }
  return styles.downside;
};

export const getTicketOrQueryColumn = (
  type,
  intl,
  getImage,
  navigate,
  renderColumn,
  sortDirection,
  changeDirections,
  markedQueryAsAnswered,
  onSuccessCallback,
  onErrorCallBack
) => {
  if (type === "2") {
    return [
      renderColumn({
        title: intl.formatMessage({ id: "label.queriesId" }),
        dataIndex: "readable_id",
        key: "readable_id",
        renderText: {
          isTextBold: true,
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      }),
      renderColumn({
        title: (
          <div className={styles.arrowContainer} onClick={changeDirections}>
            <Typography className={styles.columnHeader}>
              {intl.formatMessage({ id: "label.studentOrCompany" })}
            </Typography>
            <div>
              <Image
                preview={false}
                src={getImage("arrowDownDarkGrey")}
                className={[
                  styles.arrowDown,
                  getArrowStyles(sortDirection),
                ].join(" ")}
              />
            </div>
          </div>
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
      {
        title: () => (
          <p className={styles.columnHeading}>
            {intl.formatMessage({ id: "label.mobile" })}
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
        title: intl.formatMessage({ id: "label.email" }),
        dataIndex: "email",
        key: "email",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
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
        render: (_, rowData) => {
          return (
            <div
              className={[
                styles.checkIcon,
                rowData?.status === STATUS.PENDING.toLowerCase()
                  ? styles.cursor
                  : styles.disable,
              ].join(" ")}
              onClick={
                rowData?.status === STATUS.PENDING.toLowerCase()
                  ? () =>
                      markedQueryAsAnswered({
                        queryId: rowData?.id,
                        onSuccessCallback,
                        onErrorCallBack,
                      })
                  : () => {}
              }
            >
              <Image
                alt="CheckIcon"
                preview={false}
                src={getImage(
                  rowData?.status === STATUS.PENDING.toLowerCase()
                    ? "rightIcon"
                    : "greenTickSign"
                )}
              />
            </div>
          );
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
      title: (
        <div className={styles.arrowContainer} onClick={changeDirections}>
          <Typography className={styles.columnHeader}>
            {intl.formatMessage({ id: "label.createdBy" })}
          </Typography>
          <div>
            <Image
              preview={false}
              src={getImage("arrowDownDarkGrey")}
              className={[styles.arrowDown, getArrowStyles(sortDirection)].join(
                " "
              )}
            />
          </div>
        </div>
      ),
      dataIndex: "created_by",
      key: "created_by",
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
