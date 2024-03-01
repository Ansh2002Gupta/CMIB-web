import React from "react";
import { useIntl } from "react-intl";
import { useLocation, useSearchParams } from "react-router-dom";
import { Breadcrumb } from "antd";

import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { getLabelForPath } from "../../routes/helpers/breadCrumbHelpers";
import styles from "./BreadCrumbs.module.scss";

const BreadCrumbs = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const intl = useIntl();
  const isEdit = searchParams.get("mode") === "edit";
  const addSlashInPathName = location.pathname?.endsWith("/")
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
      const itemName = intl.formatMessage({
        id: getLabelForPath({ isEdit, path: item, pathSegments }),
      });

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
    .filter(() => pathSegments.length > 1);

  return (
    <div className={styles.mainContainer}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
