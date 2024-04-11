import React from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { getLabelForPath } from "../../routes/helpers/breadCrumbHelpers";
import { urlService } from "../../Utils/urlService";
import styles from "./BreadCrumbs.module.scss";

const BreadCrumbs = () => {
  const location = useLocation();
  const intl = useIntl();
  const isEdit = urlService.getQueryStringValue("mode") === "edit";
  const addSlashInPathName = location.pathname?.endsWith("/")
    ? location.pathname
    : location.pathname + "/";
  const segments = addSlashInPathName.split("/");
  if (parseInt(segments.slice(2, -1)?.slice(-1))) {
    segments.pop();
  }
  const pathSegments = segments.slice(2, -1);
  const pathSegmentsUpdated = pathSegments.filter(item => isNaN(item) || item.trim() === '');
  const { navigateScreen: navigate } = useNavigateScreen();

  const breadcrumbItems = pathSegmentsUpdated
    .map((item, index) => {
      const isLastItem = index === pathSegmentsUpdated.length - 1;
      const itemName = intl.formatMessage({
        id: getLabelForPath({ isEdit, path: item, pathSegmentsUpdated }),
      });

      const onClick = !isLastItem
        ? () => navigate(index - (pathSegmentsUpdated.length - 1))
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
    .filter(() => pathSegmentsUpdated.length > 1);

  return (
    <div className={styles.mainContainer}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
