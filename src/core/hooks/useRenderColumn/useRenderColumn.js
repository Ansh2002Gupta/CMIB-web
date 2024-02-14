import dayjs from "dayjs";
import { useIntl } from "react-intl";
import { Dropdown, Image, Switch } from "antd";

import { TwoColumn } from "../../layouts";

import AutoPlaceComplete from "../../../components/AutoPlaceComplete";
import CustomDateTimePicker from "../../../components/CustomDateTimePicker";
import { formatDate } from "../../../constant/utils";
import styles from "./renderColumn.module.scss";
import "./Override.css";

const useRenderColumn = () => {
  const intl = useIntl();

  const renderColumn = ({
    customColumnHeading,
    customStyles,
    dataIndex,
    defaultSortOrder,
    isRequiredField,
    key,
    renderAutoPlace = {},
    renderDateTime = {},
    render,
    renderImage = {},
    renderMenu = {},
    renderText = {},
    renderSwitch = {},
    renderTwoImage = {},
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
      mobile,
    } = renderText;

    const {
      swithActiveLabel,
      swithInActiveLabel,
      switchToggleHandler = () => {},
      isActionable = true,
      checkIsSwitchEditable = () => {},
      switchStyle,
    } = renderSwitch;

    const {
      leftAlt = "",
      rightAlt = "",
      customTwoImageStyle = "",
      leftCustomImageStyle = "",
      rightCustomImageStyle,
      leftSrc = "",
      rightSrc = "",
      leftOnClick = () => {},
      rightOnClick = () => {},
      leftPreview,
      rightPreview,
    } = renderTwoImage;

    const textRenderFormat = ({ text }) => {
      if (isTypeDate) {
        return formatDate({ date: text });
      }
      if (includeDotAfterText) {
        return `${text} .`;
      }
      return text;
    };

    title &&
      (columnObject.title = () => {
        return (
          <p className={[styles.columnHeading, customColumnHeading].join(" ")}>
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
            dayjs(new Date(a[sortKey])).unix() -
            dayjs(new Date(b[sortKey])).unix();
        }
        if (sortTypeText) {
          return (a, b) => a[sortKey].localeCompare(b[sortKey]);
        }
        return sorter;
      })());

    defaultSortOrder && (columnObject.defaultSortOrder = defaultSortOrder);

    sortDirection && (columnObject.sortDirection = sortDirection);

    renderAutoPlace.visible &&
      (columnObject.render = () => {
        return <AutoPlaceComplete />;
      });

    renderText?.visible &&
      (columnObject.render = (text, rowData) => {
        return {
          props: {
            className: customStyles ? customStyles : styles.tableCellStyles,
          },
          children: mobile ? (
            <p
              className={[
                textStyles,
                isTextBold ? styles.boldText : "",
                styles.textEllipsis,
                isCapitalize ? styles.capitalize : "",
              ].join(" ")}
            >
              {`${
                rowData?.mobile_country_code
                  ? rowData?.mobile_country_code
                  : "+91"
              }-${text}`}
            </p>
          ) : (
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
            {isActionable && (
              <Switch
                disabled={!checkIsSwitchEditable(data)}
                checked={status}
                onClick={() => switchToggleHandler(data)}
                className={status ? styles.switchBgColor : ""}
              />
            )}
            <p className={switchStyle}>
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
        return {
          props: {
            className: customStyles,
          },
          children: (
            <Image
              alt={alt}
              src={src}
              preview={preview}
              className={`${customImageStyle} ${styles.editIcon}`}
              onClick={onClick ? () => onClick(rowData) : () => {}}
            />
          ),
        };
      });

    renderTwoImage.visible &&
      (columnObject.render = (_, rowData) => {
        return {
          props: { className: styles.twoImageContainer },
          children: (
            <TwoColumn
              className={`${customTwoImageStyle} ${styles.twoImageStyle}`}
              leftSection={
                <Image
                  alt={leftAlt}
                  src={leftSrc}
                  preview={leftPreview}
                  className={`${leftCustomImageStyle} ${styles.editIcon}`}
                  onClick={leftOnClick ? () => leftOnClick(rowData) : () => {}}
                />
              }
              rightSection={
                <Image
                  alt={rightAlt}
                  src={rightSrc}
                  preview={rightPreview}
                  className={`${rightCustomImageStyle} ${styles.editIcon}`}
                  onClick={
                    rightOnClick ? () => rightOnClick(rowData) : () => {}
                  }
                />
              }
            />
          ),
        };
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
        return {
          props: {
            className: customStyles,
          },
          children: (
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
          ),
        };
      });

    return columnObject;
  };

  return { renderColumn };
};

export default useRenderColumn;
