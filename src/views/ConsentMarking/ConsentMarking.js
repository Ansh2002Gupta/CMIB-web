import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import ConsentMarkingContent from "../../containers/ConsentMarkingContent";
import HeaderAndTitle from "../../components/HeaderAndTitle";
import styles from "./ConsentMarking.module.scss";

const ConsentMarking = () => {
  const intl = useIntl();
  const isEdit = true;

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <HeaderAndTitle
          headingLabel={intl.formatMessage({
            id: "label.registrationConsentSchedule",
          })}
          titleLabel={intl.formatMessage({
            id: "label.consentMarkingScheduleWarning",
          })}
        />
      }
      bottomSection={<ConsentMarkingContent {...{ isEdit }} />}
    />
  );
};

export default ConsentMarking;
