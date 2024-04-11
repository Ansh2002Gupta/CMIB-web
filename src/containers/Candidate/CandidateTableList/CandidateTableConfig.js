import { Image } from "antd";
import styles from "./CandidateTable.module.scss";

export const getQueryColumn = ({
  intl,
  getImage,
  renderColumn,
  queriesColumnProperties = {},
  goToCandidateDetailsPage,
}) => {
  const { isSelectedFromTick, selectedItemsList, toggleSelectedQueriesId } =
    queriesColumnProperties;
  const isTableInSelectAllMode =
    selectedItemsList?.length !== 0 && !isSelectedFromTick;

  return [
    renderColumn({
      title: (
        <span>
          {intl.formatMessage({ id: "label.memberName" })}
          <Image
            src={getImage("arrowDownNoCircle")}
            alt="More"
            style={{ marginLeft: 10, height: 10 }}
          />
        </span>
      ),
      dataIndex: "member_name",
      key: "member_name",
      renderText: { isTextBold: true, visible: true, isCapitalize: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.memberId" }),
      dataIndex: "member_id",
      key: "member_id",
      renderText: { visible: true, textStyles: styles.studentStyles },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.memberEmail" }),
      dataIndex: "member_email",
      key: "member_email",
      renderText: { visible: true, textStyles: styles.studentStyles },
    }),

    renderColumn({
      dataIndex: "more",
      key: "more",
      renderMenu: {
        items: [
          {
            key: 1,
            label: intl.formatMessage({ id: "label.viewCandidatesDetails" }),
          },
        ],
        onMenuClick: (rowData) => goToCandidateDetailsPage(rowData),
        menuPreview: false,
        menuSrc: getImage("more"),
        visible: true,
      },
    }),
  ];
};
