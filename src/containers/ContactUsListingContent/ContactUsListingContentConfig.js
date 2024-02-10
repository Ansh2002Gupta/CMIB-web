import { Checkbox, Image, Typography } from "antd";
import { toggleSorting } from "../../constant/utils";
import { SORTING_QUERY_PARAMS } from "../../constant/constant";
import styles from "./ContactUsListingContent.module.scss";

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
  fetchData,
  paginationAndSearchProperties,
  sortedOrder,
  setSortedOrder,
  setSearchParams,
  setIsConfirmationModalOpen,
  toggleSelectAllItems,
  areAllItemsSelected,
  areSomeItemsSelected,
}) => {
  const {
    sortArrowStyles,
    selectedItemsList,
    toggleSelectedQueriesId,
    handleMarkMutipleQueriesAsAnswered,
    setSelectedItemsList,
  } = queriesColumnProperties;
  const { pageSize, current, searchedValue, filterArray } =
    paginationAndSearchProperties;
  const isTableInSelectAllMode = selectedItemsList?.length !== 0;
  if (type === "2") {
    return [
      renderColumn({
        title: (
          <div>
            <Checkbox
              indeterminate={areSomeItemsSelected}
              checked={areAllItemsSelected}
              className={[
                styles.columnHeading,
                isTableInSelectAllMode ? styles.greenText : "",
              ].join(" ")}
              onChange={toggleSelectAllItems}
            >
              {!isTableInSelectAllMode
                ? intl.formatMessage({ id: "label.queriesId" })
                : intl.formatMessage({ id: "label.selectAll" })}
            </Checkbox>
          </div>
        ),
        dataIndex: "readable_id",
        key: "readable_id",
        renderTextWithCheckBoxes: {
          visible: true,
          isCheckBoxTextBold: true,
          customCheckBoxContainerStyles: [styles.tableCell].join(" "),
          checkBoxList: selectedItemsList,
          onClickCheckbox: (rowData) => {
            const { id } = rowData;
            toggleSelectedQueriesId(id);
          },
        },
      }),
      renderColumn({
        title: (
          <>
            {!isTableInSelectAllMode ? (
              <Typography
                className={[styles.columnHeading, styles.centerContent].join(
                  " "
                )}
                onClick={() =>
                  fetchData({
                    queryParamsObject: {
                      perPage: pageSize,
                      page: current,
                      keyword: searchedValue,
                      queryType: filterArray,
                      sortDirection: toggleSorting(sortedOrder.sortDirection),
                      sortField: "name",
                    },
                    onSuccessCallback: () => {
                      setSearchParams((prevValue) => {
                        prevValue.set(
                          SORTING_QUERY_PARAMS.SORTED_DIRECTION,
                          toggleSorting(sortedOrder.sortDirection)
                        );
                        prevValue.set(SORTING_QUERY_PARAMS.SORTED_KEY, "name");
                        return prevValue;
                      });
                      setSortedOrder((prev) => {
                        return {
                          ...prev,
                          sortDirection: toggleSorting(prev.sortDirection),
                          sortKeyName: "name",
                        };
                      });
                    },
                  })
                }
              >
                {intl.formatMessage({ id: "label.studentOrCompany" })}
                <div className={styles.sortintArrawContainer}>
                  <Image
                    src={getImage("arrowDownDarkGrey")}
                    preview={false}
                    className={[sortArrowStyles, styles.centerContent].join(
                      " "
                    )}
                  />
                </div>
              </Typography>
            ) : (
              ""
            )}
          </>
        ),
        dataIndex: "name",
        key: "name",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      }),
      renderColumn({
        title: (
          <>
            {isTableInSelectAllMode
              ? ""
              : intl.formatMessage({
                  id: "label.nonRegisteredStudentOrCompany",
                })}
          </>
        ),
        dataIndex: "type",
        key: "type",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      }),
      renderColumn({
        title: (
          <>
            {isTableInSelectAllMode
              ? ""
              : intl.formatMessage({
                  id: "label.queryStatus",
                })}
          </>
        ),
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
        title: (
          <>
            {isTableInSelectAllMode
              ? ""
              : intl.formatMessage({
                  id: "label.email",
                })}
          </>
        ),
        dataIndex: "email",
        key: "email",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      }),
      {
        title: () => (
          <>
            {isTableInSelectAllMode ? (
              ""
            ) : (
              <p className={styles.columnHeading}>
                {intl.formatMessage({ id: "label.mobileNumber" })}
              </p>
            )}
          </>
        ),
        dataIndex: "mobile",
        key: "mobile",
        renderText: {
          visible: true,
          textStyles: [styles.tableCell].join(" "),
        },
      },
      renderColumn({
        title: (
          <>
            {isTableInSelectAllMode
              ? ""
              : intl.formatMessage({
                  id: "label.queryType",
                })}
          </>
        ),
        dataIndex: "query_type",
        key: "query_type",
        renderText: {
          visible: true,
          textStyles: [styles.centerText, styles.tableCell].join(" "),
        },
      }),
      renderColumn({
        title: (
          <>
            {isTableInSelectAllMode ? (
              ""
            ) : (
              <Typography
                className={styles.columnHeading}
                onClick={() =>
                  fetchData({
                    queryParamsObject: {
                      perPage: pageSize,
                      page: current,
                      keyword: searchedValue,
                      queryType: filterArray,
                      sortDirection: toggleSorting(sortedOrder.sortDirection),
                      sortField: "created_at",
                    },
                    onSuccessCallback: () => {
                      setSearchParams((prevValue) => {
                        prevValue.set(
                          SORTING_QUERY_PARAMS.SORTED_DIRECTION,
                          toggleSorting(sortedOrder.sortDirection)
                        );
                        prevValue.set(SORTING_QUERY_PARAMS.SORTED_KEY, "name");
                        return prevValue;
                      });
                      setSortedOrder((prev) => {
                        return {
                          ...prev,
                          sortDirection: toggleSorting(prev.sortDirection),
                          sortKeyName: "created_at",
                        };
                      });
                    },
                  })
                }
              >
                {intl.formatMessage({ id: "label.createdOn" })}
                <Image
                  src={getImage("arrowDownDarkGrey")}
                  preview={false}
                  className={[sortArrowStyles].join(" ")}
                />
              </Typography>
            )}
          </>
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
        render: () => (
          <Image
            src={getImage("eye")}
            alt="eye"
            preview={false}
            onClick={(rowData) => navigate(`query/${rowData?.id}`)}
          />
        ),
      }),
      renderColumn({
        title: (
          <>
            {isTableInSelectAllMode ? (
              <Typography
                className={styles.greenText}
                onClick={handleMarkMutipleQueriesAsAnswered}
              >
                {intl.formatMessage({
                  id: "label.markSelectedQueriesAsAnswered",
                })}
              </Typography>
            ) : (
              ""
            )}
          </>
        ),
        dataIndex: "check",
        key: "check",
        render: (_, rowData) => {
          const isAnswered = rowData?.status?.toLowerCase() === "answered";
          return (
            <div className={isTableInSelectAllMode ? styles.iconBox : ""}>
              <Image
                src={getImage(`${!isAnswered ? "checkIcon" : "greenTick"}`)}
                alt="check"
                preview={false}
                className={
                  isTableInSelectAllMode || isAnswered
                    ? styles.nonClickable
                    : styles.clickable
                }
                onClick={() => {
                  if (!isTableInSelectAllMode && !isAnswered) {
                    setIsConfirmationModalOpen(true);
                    setSelectedItemsList([rowData?.id]);
                  }
                }}
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
