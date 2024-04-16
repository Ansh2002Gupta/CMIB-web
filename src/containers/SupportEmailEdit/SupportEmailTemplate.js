import React from "react";
import styles from "./SupportEmailEdit.module.scss";
import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import { useIntl } from "react-intl";
import { Typography } from "antd";
import CustomInput from "../../components/CustomInput";
import SupportAssigneeDropdown from "./SupportAssigneeDropdown";
import CustomLoader from "../../components/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";

const SupportEmailTemplate = ({
  data,
  isSupportDataLoading,
  handleChangeData,
  handleSaveDetails,
  isSaveDataLoading,
  handleCancel,
  handleBlur,
  supportDataError,
  fetchSupportData,
  isSaveButtonEnabled,
}) => {
  const intl = useIntl();

  const renderCustomInput = (inputData, slug) => {
    const {
      key,
      label,
      placeholder,
      value = "",
      isDropdown,
      error,
    } = inputData;

    if (isDropdown) {
      return (
        <SupportAssigneeDropdown
          key={key}
          label={label}
          placeholder={placeholder}
          style={styles.customContainerStyles}
          value={value}
          handleChangeData={(val) => handleChangeData(val, key, slug)}
        />
      );
    }

    return (
      <CustomInput
        key={key}
        type="text"
        isError={!!error}
        errorMessage={error}
        value={value}
        onBlur={() => handleBlur(key, slug)}
        customInputStyles={[styles.textInput, styles.input].join(" ")}
        onChange={(e) => handleChangeData(e.target.value, key, slug)}
        placeholder={placeholder}
        label={label}
        customLabelStyles={styles.fieldLabel}
        customContainerStyles={styles.customContainerStyles}
      />
    );
  };

  const renderItem = (data) => {
    const { name, slug, row } = data;
    return (
      <div key={slug} className={styles.renderItem}>
        <Typography className={styles.contentHeaderText}>{name}</Typography>
        <div className={styles.fieldRow}>
          {row.map((val) => renderCustomInput(val, slug))}
        </div>
      </div>
    );
  };

  if (isSupportDataLoading) {
    return (
      <div className={styles.supportLoading}>
        <CustomLoader />
      </div>
    );
  }

  if (supportDataError) {
    return (
      <div className={styles.errorContainerBox}>
        <ErrorMessageBox
          errorHeading={intl.formatMessage({ id: "label.errorMessage" })}
          errorText={supportDataError?.data?.message}
          onRetry={() => fetchSupportData({})}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.editContainer}>
        <Typography className={styles.headingText}>
          {intl.formatMessage({ id: "label.queryTypeWiseEmailSetup" })}
        </Typography>
        {data?.map((data) => renderItem(data))}
      </div>
      <ActionAndCancelButtons
        actionBtnText={intl.formatMessage({ id: "label.saveChanges" })}
        cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
        isLoading={isSaveDataLoading}
        onActionBtnClick={handleSaveDetails}
        onCancelBtnClick={handleCancel}
        isActionBtnDisable={isSaveButtonEnabled}
      />
    </div>
  );
};

export default SupportEmailTemplate;
