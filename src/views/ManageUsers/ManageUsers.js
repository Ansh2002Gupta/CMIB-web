import React from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ManageUsersContent from "../../containers/ManageUsersContent";
import ManageUserHeader from "../../containers/ManageUsersHeader";
import styles from "./ManageUsers.module.scss";

const ManageUsers = () => {
  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<ManageUserHeader />}
      bottomSection={<ManageUsersContent />}
    />
  );
};

export default ManageUsers;
