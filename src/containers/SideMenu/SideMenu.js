import React from "react";
import { Button } from "antd";

import Base from "../../core/layouts/Base/Base";

import {
  ROUTE,
  DASHBOARD,
  SUBSCRIPTIONS,
  SESSION
} from "../../routes/routeNames";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./sideMenu.module.scss";

const SideMenu = () => {
  const { navigateScreen: navigate } = useNavigateScreen();

  return (
    <Base className={styles.sideMenuOptionsContainer}>
      <Button onClick={() => navigate(DASHBOARD)}>Dashboard</Button>
      <Button onClick={() => navigate(SUBSCRIPTIONS)}>Menu Subscriptons</Button>
      <Button onClick={() => navigate(SESSION)}>Session</Button>
      <Button onClick={() => navigate(ROUTE)}>Configurations</Button>
      <Button>Manage Payments</Button>
      <Button>Manage Candidates</Button>
      <Button>Manage Companies</Button>
      <Button>All Jobs</Button>
      <Button>Reports</Button>
    </Base>
  );
};

export default SideMenu;
