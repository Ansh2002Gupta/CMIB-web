import React from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./BreadCrumbs.module.scss";

const BreadCrumbs = () => {
  const location = useLocation();
  const intl = useIntl();
  const segments = location.pathname.split("/");
  console.log(segments, "segments..");
  const pathSegments = segments.slice(2, -1).filter(Boolean);
  const { navigateScreen: navigate } = useNavigateScreen();

  const breadcrumbItems = pathSegments.map((item, index) => {
    const isLastItem = index === pathSegments.length - 1;
    const pathTo = `/${segments[1]}/${pathSegments
      .slice(0, index + 1)
      .join("/")}`;

    return (
      <Breadcrumb.Item
        key={index}
        className={isLastItem ? styles.nonclickable : styles.clickable}
        onClick={() => !isLastItem && navigate(pathTo)}
      >
        {intl.formatMessage({ id: `label.path.${item}` })}
      </Breadcrumb.Item>
    );
  });

  return (
    <div className={styles.mainContainer}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
