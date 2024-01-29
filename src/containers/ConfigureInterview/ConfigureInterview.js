import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Table, Typography } from "antd";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import getConfigureDateCoumns from "./ConfigureInterviewConfig";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { CONFIGURE_INTERVIEW_DATES } from "../../dummyData";
import styles from "./ConfigureInterview.module.scss";

const ConfigureInterview = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();
  const columns = getConfigureDateCoumns(intl, getImage, renderColumn);

  const handleOnSubmit = () => {};
  const handleCancel = () => {};

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.topContainer}
          topSection={
            <Typography className={styles.titleText}>
              {intl.formatMessage({ id: "label.configureInterviewDates" })}
            </Typography>
          }
          bottomSection={
            <Table
              columns={columns}
              dataSource={CONFIGURE_INTERVIEW_DATES}
              pagination={false}
              rowClassName={styles.rowtext}
              scroll={{ x: "max-content" }}
              className={[styles.table, "customTable"]}
              rowKey="id"
            />
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
          isActionBtnDisable={false}
          onCancelBtnClick={handleCancel}
        />
      }
    />
  );
};

export default ConfigureInterview;
