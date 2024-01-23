import moment from "moment";
import { useIntl } from "react-intl";
import { Dropdown, Image, Switch } from "antd";

import CustomDateTimePicker from "../../../components/CustomDateTimePicker";
import styles from "./renderColumn.module.scss";
import "./Override.css";

const useRenderColumn = () => {
  const intl = useIntl();

  const renderColumn = ({
    dataIndex,
    defaultSortOrder,
    isRequiredField,
    key,
    renderDateTime = {},
    render,
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
      customContainerStyles,
      customTimeStyle,
      defaultValue,
      disabled = false,
      isEditable = true,
      isRequired = false,
      onChange = () => {},
      placeholder = "",
      type,
    } = renderDateTime;

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
        return (
          <p className={styles.columnHeading}>
            {title}
            {isRequiredField && (
              <>
                &nbsp;<span className={styles.isRequiredStar}>*</span>
              </>
            )}
          </p>
        );
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

    render && (columnObject.render = render);

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

    render && (columnObject.render = render); // correct this

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

    renderDateTime.visible &&
      (columnObject.render = (value, record) => {
        return (
          <CustomDateTimePicker
            {...{
              customContainerStyles,
              customTimeStyle,
              defaultValue,
              disabled,
              isEditable,
              isRequired,
              type,
              placeholder,
              value,
            }}
            onChange={(val) => {
              onChange(val, record);
            }}
          />
        );
      });

    return columnObject;
  };

  return { renderColumn };
};

export default useRenderColumn;
