import React from "react";
import { useIntl } from "react-intl";
import { useLocation, useSearchParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./BreadCrumbs.module.scss";

const BreadCrumbs = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const intl = useIntl();
  const isEdit = searchParams.get("mode") === "edit";
  const addSlashInPathName =
    location.pathname?.slice(-1) === "/"
      ? location.pathname
      : location.pathname + "/";
  const segments = addSlashInPathName.split("/");
  if (parseInt(segments.slice(2, -1)?.slice(-1))) {
    segments.pop();
  }
  const pathSegments = segments.slice(2, -1);
  const { navigateScreen: navigate } = useNavigateScreen();

  const breadcrumbItems = pathSegments
    .map((item, index) => {
      const isLastItem = index === pathSegments.length - 1;
      const itemName =
        item === "details" && isEdit
          ? intl.formatMessage({ id: "label.path.editDetails" })
          : intl.formatMessage({ id: `label.path.${item}` });

      return {
        title: itemName,
        key: index,
        onClick: !isLastItem
          ? () => navigate(index - (pathSegments.length - 1))
          : () => {},
      };
    })
    .filter((item) => pathSegments.length > 1);

  const items = breadcrumbItems.map((item) => ({
    ...item,
    className: item.onClick ? styles.clickable : styles.nonclickable,
  }));

  return (
    <div className={styles.mainContainer}>
      <Breadcrumb items={items} />
    </div>
  );
};

export default BreadCrumbs;
