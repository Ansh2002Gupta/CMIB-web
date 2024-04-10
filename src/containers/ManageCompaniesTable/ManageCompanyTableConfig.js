import styles from "./ManageCompiesTable.module.scss";
import { SORT_VALUES } from "../../constant/constant";

const getCompaniesColumn = ({
  intl,
  getImage,
  goToCompanyDetailsPage,
  handleSorting,
  setSortBy,
  sortBy,
  renderColumn,
}) => {
  return [
    renderColumn({
      title: intl.formatMessage({ id: "label.approvedCompanyName" }),
      dataIndex: "name",
      key: "name",
      sortKey: "name",
      setSortBy: setSortBy,
      columnSortByHandler: handleSorting,
      customIconStyle: [
        styles[sortBy],
        sortBy === SORT_VALUES.ASCENDING || sortBy === SORT_VALUES.DESCENDING
          ? styles.active
          : "",
      ],
      renderSorterColumn: true,
      renderText: { isTextBold: true, visible: true, isCapitalize: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.userName" }),
      dataIndex: "user_name",
      key: "user_name",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.entity" }),
      dataIndex: "entity",
      key: "entity",
      renderText: { visible: true },
    }),
    renderColumn({
      dataIndex: "more",
      key: "more",
      renderMenu: {
        items: [
          {
            key: 1,
            label: intl.formatMessage({ id: "label.viewCompanyDetails" }),
          },
        ],
        onMenuClick: (rowData) => goToCompanyDetailsPage(rowData),
        menuPreview: false,
        menuSrc: getImage("more"),
        visible: true,
      },
    }),
  ];
};

export default getCompaniesColumn;
