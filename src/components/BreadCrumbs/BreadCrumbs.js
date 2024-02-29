import React from "react";
import { useIntl } from "react-intl";
import { useLocation, useSearchParams } from "react-router-dom";
import { Breadcrumb } from "antd";

import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { SESSION_PATHS } from "../../constant/constant";
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

  const getLabelForPath = (path, isEdit) => {
    const detailPageBreadCrumbLabelId = {
      "setup-centers": "label.session.setupCenters.details",
      "orientation-centers": "label.session.orientationCenters.details",
      "setup-mock-interview": "label.session.setupMockInterview.details",
      "consent-marking": "label.session.consentMarking.details",
      "campus-interview": "label.session.campusInterview.details",
      users: "label.users.details",
    };

    if (SESSION_PATHS.includes(path)) {
      return intl.formatMessage({ id: `label.session.${path}` });
    }
    if (path === "details" && isEdit) {
      return intl.formatMessage({ id: "label.path.editDetails" });
    }
    if (path === "details") {
      const relevantSegment = pathSegments.find(
        (segment) => segment === "users" || SESSION_PATHS.includes(segment)
      );
      const labelId = detailPageBreadCrumbLabelId[relevantSegment] || "";
      return intl.formatMessage({ id: labelId });
    }
    return intl.formatMessage({ id: `label.path.${path}` });
  };

  const breadcrumbItems = pathSegments
    .map((item, index) => {
      const isLastItem = index === pathSegments.length - 1;
      const itemName = getLabelForPath(item, isEdit);

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
