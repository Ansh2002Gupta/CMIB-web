import React from "react";
import { useIntl } from "react-intl";
import { useLocation, useSearchParams } from "react-router-dom";

import { Breadcrumb } from "antd";

import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./BreadCrumbs.module.scss";

const BreadCrumbs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const intl = useIntl();
  const isEdit = searchParams.get("mode") === "edit";
  const segments = location.pathname.split("/");
  const pathSegments = segments.slice(2, -1);
  const { navigateScreen: navigate } = useNavigateScreen();

  const breadcrumbItems = pathSegments.map((item, index) => {
    const isLastItem = index === pathSegments.length - 1;

    return (
      pathSegments.length > 1 && (
        <Breadcrumb.Item
          key={index}
          className={isLastItem ? styles.nonclickable : styles.clickable}
          onClick={() => {
            console.log(index - (pathSegments.length - 1));
            !isLastItem && navigate(index - (pathSegments.length - 1));
          }}
        >
          {item === "details" && isEdit
            ? intl.formatMessage({ id: `label.path.editDetails` })
            : intl.formatMessage({ id: `label.path.${item}` })}
        </Breadcrumb.Item>
      )
    );
  });

  return (
    <div className={styles.mainContainer}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
