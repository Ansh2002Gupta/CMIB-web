import { Checkbox, Image, Typography } from "antd";
import { toggleSorting } from "../../constant/utils";
import { SORTING_QUERY_PARAMS } from "../../constant/constant";

import styles from "./QueryTable.module.scss";

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
  intl,
  getImage,
  navigate,
  renderColumn,
  queriesColumnProperties = {},
  fetchData,
  paginationAndSearchProperties,
  setSearchParams,
  setIsConfirmationModalOpen,
  toggleSelectAllItems,
  areAllItemsSelected,
  areSomeItemsSelected,
  setSortByName,
  setSortByCreatedAt,
  sortByCreatedAt,
  sortByName,
}) => {
  const {
    selectedItemsList,
    toggleSelectedQueriesId,
    handleMarkMutipleQueriesAsAnswered,
    setSelectedItemsList,
    setIsSingleSelect,
  } = queriesColumnProperties;
  const { pageSize, current, searchedValue, filterArray } =
    paginationAndSearchProperties;
  const isTableInSelectAllMode = selectedItemsList?.length !== 0;

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
              className={[styles.columnHeading].join(" ")}
              onClick={() =>
                fetchData({
                  queryParamsObject: {
                    perPage: pageSize,
                    page: current,
                    q: searchedValue,
                    queryType: filterArray,
                    sortDirection: toggleSorting(sortByName?.direction),
                    sortField: "name",
                  },
                  onSuccessCallback: () => {
                    setSearchParams((prevValue) => {
                      prevValue.set(
                        SORTING_QUERY_PARAMS.SORTED_DIRECTION,
                        toggleSorting(sortByName?.direction)
                      );
                      prevValue.set(SORTING_QUERY_PARAMS.SORTED_KEY, "name");
                      return prevValue;
                    });
                    setSortByName((prev) => {
                      return {
                        ...prev,
                        direction: toggleSorting(prev?.direction),
                        isDisable: false,
                      };
                    });
                    setSortByCreatedAt((prev) => {
                      return {
                        ...prev,
                        isDisable: true,
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
                  className={[
                    styles[sortByName?.direction],
                    styles.centerContent,
                    !sortByName?.isDisable ? styles.active : "",
                  ].join(" ")}
                />
              </div>
            </Typography>
          ) : (
            ""
          )}
        </>
      ),
      customColumnHeading: styles.extraWidth,
      dataIndex: "name",
      key: "name",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: (
        <span className={styles.extraWidth}>
          {isTableInSelectAllMode
            ? ""
            : intl.formatMessage({
                id: "label.nonRegisteredStudentOrCompany",
              })}
        </span>
      ),
      customColumnHeading: styles.extraWidth,
      dataIndex: "type",
      key: "type",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
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
            className={[styles.statusBox, styles[styleClassForContainer]].join(
              " "
            )}
          >
            <Typography
              className={[
                styles[styleClassForText],
                styles.defaultStatusStyles,
              ]}
            >
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
        isRequiredTooltip: true,
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
        isRequiredTooltip: true,
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
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
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
                    q: searchedValue,
                    queryType: filterArray,
                    sortDirection: toggleSorting(sortByCreatedAt?.direction),
                    sortField: "created_at",
                  },
                  onSuccessCallback: () => {
                    setSearchParams((prevValue) => {
                      prevValue.set(
                        SORTING_QUERY_PARAMS.SORTED_DIRECTION,
                        toggleSorting(sortByCreatedAt?.direction)
                      );
                      prevValue.set(
                        SORTING_QUERY_PARAMS.SORTED_KEY,
                        "created_at"
                      );
                      return prevValue;
                    });

                    setSortByName((prev) => {
                      return {
                        ...prev,
                        isDisable: true,
                      };
                    });
                    setSortByCreatedAt((prev) => {
                      return {
                        ...prev,
                        direction: toggleSorting(prev.direction),
                        isDisable: false,
                      };
                    });
                  },
                })
              }
            >
              {intl.formatMessage({ id: "label.createdOn" })}
              <div className={styles.sortintArrawContainer}>
                <Image
                  src={getImage("arrowDownDarkGrey")}
                  preview={false}
                  className={[
                    styles[sortByCreatedAt?.direction],
                    styles.arrowSytles,
                    !sortByCreatedAt?.isDisable ? styles.active : "",
                  ].join(" ")}
                />
              </div>
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
      render: (_, rowData) => {
        return (
          <Image
            src={getImage("eye")}
            alt="eye"
            className={styles.clickable}
            preview={false}
            onClick={() => navigate(`query/${rowData?.id}`)}
          />
        );
      },
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
                  setIsSingleSelect(true);
                  setSelectedItemsList([rowData?.id]);
                }
              }}
            />
          </div>
        );
      },
    }),
  ];
};
