import React from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../ContentHeader";
import PaymentSettings from "../PaymentSettings";
import useResponsive from "../../core/hooks/useResponsive";
import { TwoRow } from "../../core/layouts";
import styles from "./CampusInterviewSettings.module.scss";

const CampusInterviewContent = () => {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <TwoRow
      className={styles.mainContainer}
      topSectionClassName={styles.topSectionStyle}
      topSection={
        <ContentHeader
          customStyles={!responsive?.isMd ? styles.customStyles : ""}
          headerText={intl.formatMessage({
            id: "label.setCampusInterviewSettings",
          })}
        />
      }
      bottomSection={<PaymentSettings />}
    />
  );
};

export default CampusInterviewContent;
