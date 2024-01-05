import moment from "moment";
import { useIntl } from "react-intl";
import { Dropdown, Image, Switch } from "antd";
import styles from "./renderColumn.module.scss";
import "./Override.css";

const useRenderColumn = () => {
  const intl = useIntl();

  const renderColumn = ({
    dataIndex,
    defaultSortOrder,
    key,
    renderImage = {},
    renderMenu = {},
    renderText = {},
    renderSwitch = {},
    sortDirection,
    sorter,
    sortKey,
    sortTypeDate,
    sortTypeText,
    title,
  }) => {
    const columnObject = {};

    const {
      alt = "",
      customImageStyle = "",
      src = "",
      onClick = () => {},
      preview,
    } = renderImage;

    const {
      items = [],
      menuSrc = "",
      onMenuClick = () => {},
      menuPreview,
      triggerType = "",
    } = renderMenu;

    const {
      dateFormat = "DD/MM/YYYY",
      includeDotAfterText,
      isTextBold,
      isTypeDate,
      textStyles,
      isCapitalize,
    } = renderText;

    const {
      swithActiveLabel,
      swithInActiveLabel,
      switchToggleHandler = () => {},
    } = renderSwitch;

    const textRenderFormat = ({ text }) => {
      if (isTypeDate) {
        return moment(new Date(text)).format(dateFormat);
      }
      if (includeDotAfterText) {
        return `${text} .`;
      }
      return text;
    };

    title &&
      (columnObject.title = () => {
        return <p className={styles.columnHeading}>{title}</p>;
      });

    dataIndex && (columnObject.dataIndex = dataIndex);

    key && (columnObject.key = key);

    (sortTypeDate || sortTypeText || sorter) &&
      (columnObject.sorter = (() => {
        if (sortTypeDate) {
          return (a, b) =>
            moment(new Date(a[sortKey])).unix() -
            moment(new Date(b[sortKey])).unix();
        }
        if (sortTypeText) {
          return (a, b) => a[sortKey].localeCompare(b[sortKey]);
        }
        return sorter;
      })());

    defaultSortOrder && (columnObject.defaultSortOrder = defaultSortOrder);

    sortDirection && (columnObject.sortDirection = sortDirection);

    renderText?.visible &&
      (columnObject.render = (text) => {
        return {
          props: {
            className: styles.tableCellStyles,
          },
          children: (
            <p
              className={[
                textStyles,
                isTextBold ? styles.boldText : "",
                styles.textEllipsis,
                isCapitalize ? styles.capitalize : "",
              ].join(" ")}
            >
              {textRenderFormat({ text })}
            </p>
          ),
        };
      });

    renderSwitch.visible &&
      (columnObject.render = (_, data) => {
        const { status } = data;
        return (
          <div className={styles.centreStatusContainer}>
            <Switch
              checked={status}
              onClick={() => switchToggleHandler(data)}
              className={status ? styles.switchBgColor : ""}
            />
            <p>
              {status
                ? swithActiveLabel || intl.formatMessage({ id: "label.active" })
                : swithInActiveLabel ||
                  intl.formatMessage({ id: "label.inactive" })}
            </p>
          </div>
        );
      });

    renderImage.visible &&
      (columnObject.render = (_, rowData) => {
        return (
          <Image
            alt={alt}
            src={src}
            preview={preview}
            className={`${customImageStyle} ${styles.editIcon}`}
            onClick={onClick ? () => onClick(rowData) : () => {}}
          />
        );
      });

    renderMenu.visible &&
      (columnObject.render = (_, rowData) => {
        const menuItems = {
          items: items.map((item) => ({
            key: item.key,
            label: (
              <div
                onClick={onMenuClick ? () => onMenuClick(rowData) : () => {}}
                className={styles.dropdownMenuItem}
              >
                {item.label}
              </div>
            ),
          })),
        };
        return (
          <Dropdown menu={menuItems} trigger={[triggerType || "click"]}>
            <Image
              src={menuSrc}
              className={styles.moreIcon}
              preview={menuPreview}
            />
          </Dropdown>
        );
      });

    return columnObject;
  };

  return { renderColumn };
};

export default useRenderColumn;
