import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { Table, Typography } from "antd";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import getConfigureDateCoumns from "./ConfigureInterviewConfig";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { CONFIGURE_INTERVIEW_DATES } from "../../dummyData";
import { SETUP_MOCK_INTERVIEW, SESSION } from "../../routes/routeNames";
import styles from "./ConfigureInterview.module.scss";

const ConfigureInterview = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [searchParams, setSearchParams] = useSearchParams();
  const isEdit = searchParams.get("mode") === "edit";
  const [tableData, setTableData] = useState(CONFIGURE_INTERVIEW_DATES);
  const columns = getConfigureDateCoumns(intl, isEdit, getImage, renderColumn);

  const [addTableData, setAddTableData] = useState({
    id: Math.random().toString(),
    isAddRow: true,
    scheduleDate: null,
    startTime: null,
    endTime: null,
    facilitiesNumber: null,
    slotDurationInMinutes: "",
  });

  const handleOnSubmit = () => {};
  const handleCancel = () => {
    navigate(`${SESSION}/${SETUP_MOCK_INTERVIEW}`);
  };

  const extendedTableData = isEdit ? [...tableData, addTableData] : tableData;

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
              dataSource={extendedTableData}
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
