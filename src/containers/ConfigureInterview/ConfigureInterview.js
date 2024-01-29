import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons/ActionAndCancelButtons";
import styles from "./ConfigureInterview.module.scss";
import { stubFalse } from "lodash";

const ConfigureInterview = () => {
  const intl = useIntl();

  const handleOnSubmit = () => {};
  const handleCancel = () => {};

  return (
    <TwoRow
      topSection={
        <TwoRow
          className={styles.mainContainer}
          topSection={
            <Typography className={styles.titleText}>
              {intl.formatMessage({ id: "label.configureInterviewDates" })}
            </Typography>
          }
        />
      }
      bottomSection={
        <ActionAndCancelButtons
          actionBtnText={intl.formatMessage({
            id: "label.saveChanges",
          })}
          cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
          onActionBtnClick={handleOnSubmit}
          isActionBtnDisable={stubFalse}
          onCancelBtnClick={handleCancel}
        />
      }
    />
  );
};

export default ConfigureInterview;
