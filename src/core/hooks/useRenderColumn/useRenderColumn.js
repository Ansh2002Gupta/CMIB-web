import { useContext } from "react";
import dayjs from "dayjs";
import { useIntl } from "react-intl";
import { Checkbox, Dropdown, Image, Switch, Tooltip, Typography } from "antd";

import { TwoColumn } from "../../layouts";

import AutoPlaceComplete from "../../../components/AutoPlaceComplete";
import Chip from "../../../components/Chip/Chip";
import CustomCheckBox from "../../../components/CustomCheckBox/CustomCheckBox";
import CustomDateTimePicker from "../../../components/CustomDateTimePicker";
import { ThemeContext } from "core/providers/theme";
import { formatDate, toggleSorting } from "../../../constant/utils";
import styles from "./renderColumn.module.scss";
import "./Override.css";

const useRenderColumn = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  const renderColumn = ({
    customColumnHeading,
    customStyles,
    customIconStyle = {},
    columnSortByHandler,
    dataIndex,
    defaultSortOrder,
    isRequiredField,
    key,
    renderAutoPlaceComplete = {},
    renderDateTime = {},
    render,
    renderChip = {},
    renderImage = {},
    renderMenu = {},
    renderSorterColumn,
    renderText = {},
    renderTextWithCheckBoxes = {},
    renderSwitch = {},
    renderTwoImage = {},
    renderTitleWithCheckbox = {},
    setSortBy,
    sortDirection,
    sorter,
    sortIcon = "arrowDownDarkGrey",
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
      onClickCheckbox = () => {},
      customCheckBoxContainerStyles = "",
      checkBoxList = [],
      isCheckBoxTextBold,
    } = renderTextWithCheckBoxes;

    const {
      includeDotAfterText,
      isTextBold,
      isTypeDate,
      textStyles,
      isCapitalize,
      isRequiredTooltip,
      mobile,
      isIntl,
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

    const {
      titleWithCheckBoxes,
      isIntermidiate,
      isChecked,
      onToggleCheckBox,
      customCheckBoxSytles = "",
    } = renderTitleWithCheckbox;

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

    const textRenderFormat = ({ text }) => {
      if (isTypeDate) {
        return formatDate({ date: text });
      }
      if (includeDotAfterText) {
        return `${text} .`;
      }
      if (isIntl) {
        return intl.formatMessage({ id: `label.${text}` });
      }
      return text;
    };

    const getRenderText = (text) => {
      return (
        <p
          className={[
            textStyles,
            isTextBold ? styles.boldText : "",
            styles.textEllipsis,
            isCapitalize ? styles.capitalize : "",
          ].join(" ")}
        >
          {textRenderFormat({ text: text || "-" })}
        </p>
      );
    };

    title &&
      (columnObject.title = () => {
        return renderSorterColumn ? (
          <Typography
            className={[styles.columnHeading].join(" ")}
            onClick={() => {
              setSortBy((prev) => {
                const newSortOrder = toggleSorting(prev);
                columnSortByHandler({
                  sortDirection: newSortOrder,
                  sortField: columnObject.key,
                });
                return newSortOrder;
              });
            }}
          >
            <div className={styles.sortingArrowContainer}>
              {title}
              <Image
                src={getImage(sortIcon)}
                preview={false}
                className={[styles.centerContent, ...customIconStyle].join(" ")}
              />
            </div>
          </Typography>
        ) : (
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

    renderTitleWithCheckbox?.visible &&
      (columnObject.title = () => {
        return (
          <div>
            <Checkbox
              indeterminate={isIntermidiate}
              checked={isChecked}
              className={[
                styles.chipContainer,
                customColumnHeading,
                customCheckBoxSytles,
              ].join(" ")}
              onChange={onToggleCheckBox}
            >
              {titleWithCheckBoxes}
            </Checkbox>
          </div>
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
          return (a, b) => a[sortKey]?.localeCompare(b[sortKey]);
        }
        return sorter;
      })());

    defaultSortOrder && (columnObject.defaultSortOrder = defaultSortOrder);

    sortDirection && (columnObject.sortDirection = sortDirection);

    renderAutoPlaceComplete.visible &&
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
          ) : isRequiredTooltip ? (
            <Tooltip title={text}>{getRenderText(text)}</Tooltip>
          ) : (
            getRenderText(text)
          ),
        };
      });

    renderChip?.visible &&
      (columnObject.render = (_, rowData) => {
        const { status } = rowData;
        const styleClassForContainer = getStatusStyles(status)[0];
        const styleClassForText = getStatusStyles(status)[1];
        return (
          <Chip
            label={status}
            bgColor={[
              styles.chipContainer,
              styles[styleClassForContainer],
            ].join(" ")}
            textColor={styles[styleClassForText]}
          />
        );
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
            className: customStyles || "",
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

    render && (columnObject.render = render);

    renderTextWithCheckBoxes.visible &&
      (columnObject.render = (textToRender, rowData) => {
        const { id } = rowData;
        return (
          <CustomCheckBox
            checked={checkBoxList?.includes(id)}
            onChange={() => onClickCheckbox(rowData)}
            customStyles={[customCheckBoxContainerStyles].join("")}
          >
            <p className={isCheckBoxTextBold ? styles.boldText : ""}>
              {textToRender || "--"}
            </p>
          </CustomCheckBox>
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
