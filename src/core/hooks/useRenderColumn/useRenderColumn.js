import moment from "moment";
import { useIntl } from "react-intl";
import { Image, Switch } from "antd";

import styles from "./renderColumn.module.scss";

const useRenderColumn = () => {
  const intl = useIntl();

  const renderColumn = ({
    dataIndex,
    defaultSortOrder,
    key,
    renderImage = {},
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

    const { dateFormat = "DD/MM/YYYY", isTextBold, isTypeDate } = renderText;

    const {
      swithActiveLabel,
      swithInActiveLabel,
      switchToggleHandler = () => {},
    } = renderSwitch;

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
      (columnObject.render = (text) => (
        <p
          className={[
            isTextBold ? styles.boldText : "",
            styles.textEllipsis,
          ].join(" ")}
        >
          {isTypeDate ? moment(new Date(text)).format(dateFormat) : text}
        </p>
      ));

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

    return columnObject;
  };

  return { renderColumn };
};

export default useRenderColumn;
