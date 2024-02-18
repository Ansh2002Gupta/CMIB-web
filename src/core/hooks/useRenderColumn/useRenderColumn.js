import { useContext, useState } from "react";
import dayjs from "dayjs";
import { useIntl } from "react-intl";
import { Dropdown, Image, Switch, Tooltip, Typography } from "antd";

import { TwoColumn } from "../../layouts";

import AutoPlaceComplete from "../../../components/AutoPlaceComplete";
import CustomCheckBox from "../../../components/CustomCheckBox/CustomCheckBox";
import CustomDateTimePicker from "../../../components/CustomDateTimePicker";
import CustomInput from "../../../components/CustomInput";
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
    customIconStyle,
    columnSortByHandler,
    dataIndex,
    defaultSortOrder,
    isRequiredField,
    key,
    renderAutoPlaceComplete = {},
    renderDateTime = {},
    render,
    renderImage = {},
    renderInput = {},
    renderMenu = {},
    renderSorterColumn,
    renderText = {},
    renderTextWithCheckBoxes = {},
    renderSwitch = {},
    renderTwoImage = {},
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
      errorMessage,
      isEditable = true,
      isRequired = false,
      onChange = () => {},
      placeholder = "",
      type,
    } = renderDateTime;

    const {
      alt = "",
      alternateSrc = "",
      alternateOnClick = () => {},
      customImageStyle = "",
      src = "",
      onClick = () => {},
      preview,
    } = renderImage;

    const {
      customInputContainerStyles,
      customInputNumberStyles,
      customInputStyles,
      customSelectInputStyles,
      inputDisabled,
      inputErrorMessage,
      inputPlaceholder = "",
      inputType,
      onInputChange,
    } = renderInput;

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
                columnSortByHandler(newSortOrder);
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
              src={rowData?.isAddRow ? alternateSrc : src}
              preview={preview}
              className={`${customImageStyle} ${styles.editIcon}`}
              onClick={() =>
                rowData?.isAddRow ? alternateOnClick(rowData) : onClick(rowData)
              }
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
                isEditable,
                isRequired,
                type,
                placeholder,
                value,
              }}
              errotTimeInput={
                record?.isAddRow && errorMessage && styles.errotTimeInput
              }
              onChange={(val) => {
                onChange(val, record);
              }}
              disabled={disabled || !record?.isAddRow}
              errorMessage={record?.isAddRow && errorMessage}
            />
          ),
        };
      });

    renderInput.visible &&
      (columnObject.render = (value, record) => {
        return (
          <CustomInput
            {...{
              value,
              customInputNumberStyles,
              customInputStyles,
              customSelectInputStyles,
            }}
            disabled={inputDisabled || !record?.isAddRow}
            placeholder={inputPlaceholder}
            type={inputType}
            customContainerStyles={customInputContainerStyles}
            onChange={onInputChange}
            errorMessage={record.isAddRow && inputErrorMessage}
            isError={record.isAddRow && inputErrorMessage ? true : false}
            errorInput={
              record.isAddRow && inputErrorMessage && styles.errotTimeInput
            }
          />
        );
      });

    return columnObject;
  };

  return { renderColumn };
};

export default useRenderColumn;
