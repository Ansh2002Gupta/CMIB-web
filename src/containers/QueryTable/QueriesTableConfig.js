import { Image, Typography } from "antd";
import { toggleSorting } from "../../constant/utils";
import { SORTING_QUERY_PARAMS } from "../../constant/constant";

import styles from "./QueryTable.module.scss";

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

  const getSortedData = ({
    sortKeyName,
    direction,
    setSortByNameObj,
    setSortByCreatedAtObj,
  }) => {
    fetchData({
      queryParamsObject: {
        perPage: pageSize,
        page: current,
        q: searchedValue,
        queryType: filterArray,
        sortDirection: toggleSorting(direction),
        sortField: sortKeyName,
      },
      onSuccessCallback: () => {
        setSearchParams((prevValue) => {
          prevValue.set(
            SORTING_QUERY_PARAMS.SORTED_DIRECTION,
            toggleSorting(direction)
          );
          prevValue.set(SORTING_QUERY_PARAMS.SORTED_KEY, sortKeyName);
          return prevValue;
        });

        setSortByName((prev) => {
          return {
            ...prev,
            ...setSortByNameObj,
          };
        });

        setSortByCreatedAt((prev) => {
          return {
            ...prev,
            ...setSortByCreatedAtObj,
          };
        });
      },
    });
  };

  return [
    renderColumn({
      titleWithCheckBoxes: !isTableInSelectAllMode
        ? intl.formatMessage({ id: "label.queriesId" })
        : intl.formatMessage({ id: "label.selectAll" }),
      onToggleCheckBox: toggleSelectAllItems,
      customColumnHeading: [
        styles.columnHeading,
        isTableInSelectAllMode ? styles.greenText : "",
      ].join(" "),
      isIntermidiate: areSomeItemsSelected,
      isChecked: areAllItemsSelected,
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
                getSortedData({
                  sortKeyName: "name",
                  direction: sortByName?.direction,
                  setSortByNameObj: {
                    direction: toggleSorting(sortByName?.direction),
                    isDisable: false,
                  },
                  setSortByCreatedAtObj: {
                    isDisable: true,
                  },
                })
              }
            >
              {intl.formatMessage({ id: "label.studentOrCompany" })}
              <div className={styles.sortintArrawContainer}>
                <Image
                  src={getImage(
                    `${
                      sortByName?.isDisable
                        ? "disabledArrow"
                        : "arrowDownDarkGrey"
                    }`
                  )}
                  preview={false}
                  className={[
                    styles[sortByName?.direction],
                    styles.centerContent,
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
      renderChip: {
        visible: true,
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
                getSortedData({
                  sortKeyName: "created_at",
                  direction: sortByCreatedAt?.direction,
                  setSortByNameObj: {
                    isDisable: true,
                  },
                  setSortByCreatedAtObj: {
                    direction: toggleSorting(sortByCreatedAt?.direction),
                    isDisable: false,
                  },
                })
              }
            >
              {intl.formatMessage({ id: "label.createdOn" })}
              <div className={styles.sortintArrawContainer}>
                <Image
                  src={getImage(
                    `${
                      sortByCreatedAt?.isDisable
                        ? "disabledArrow"
                        : "arrowDownDarkGrey"
                    }`
                  )}
                  preview={false}
                  className={[
                    styles[sortByCreatedAt?.direction],
                    styles.arrowSytles,
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
          <div
            className={[
              styles.iconContainer,
              isTableInSelectAllMode ? styles.iconBox : "",
            ].join(" ")}
          >
            <Image
              src={getImage("eye")}
              alt="eye"
              className={styles.clickable}
              preview={false}
              onClick={() => navigate(`/control/query/${rowData?.id}`)}
            />
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
