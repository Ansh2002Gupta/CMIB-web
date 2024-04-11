import React from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../ContentHeader/ContentHeader";
import styles from "./ManagePaymentsHeader.module.scss";

const ManagePaymentsHeader = () => {
  const intl = useIntl();

  return (
    <div className={styles.headerBox}>
      <ContentHeader
        headerText={intl.formatMessage({
          id: "label.manage_payments",
        })}
        isLeftFillSpace
        customStyles={styles.container}
        customContainerStyle={styles.parentContainer}
      />
    </div>
  );
};

export default ManagePaymentsHeader;
