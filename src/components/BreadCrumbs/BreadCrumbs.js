import React from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { urlService } from "../../Utils/urlService";
import styles from "./BreadCrumbs.module.scss";

const BreadCrumbs = () => {
  const location = useLocation();
  const intl = useIntl();
  const isEdit = urlService.getQueryStringValue("mode") === "edit";
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

      const onClick = !isLastItem
        ? () => navigate(index - (pathSegments.length - 1))
        : () => {};

      return (
        <Breadcrumb.Item
          key={index}
          className={isLastItem ? styles.nonclickable : styles.clickable}
          onClick={onClick}
        >
          {itemName}
        </Breadcrumb.Item>
      );
    })
    .filter((item) => pathSegments.length > 1);

  return (
    <div className={styles.mainContainer}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
