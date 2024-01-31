import React from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { Typography } from "antd";

import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./BreadCrumbs.module.scss";

const BreadCrumbs = () => {
  const location = useLocation();
  const intl = useIntl();
  const pathSegments = location.pathname.split("/").slice(1).slice(0, -1);
  const { navigateScreen: navigate } = useNavigateScreen();

  return (
    <div className={styles.mainContainer}>
      {pathSegments.map((item, index) => (
        <Typography
          className={
            index < pathSegments.length - 1
              ? styles.clickable
              : styles.nonclickable
          }
          onClick={() => {
            if (index < pathSegments.length - 1) {
              navigate(`/${item}`);
            }
          }}
        >
          {intl.formatMessage({ id: `label.path.${item}` })}
          {index < pathSegments.length - 1 && <span> /&nbsp;</span>}
        </Typography>
      ))}
    </div>
  );
};
export default BreadCrumbs;
