import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

import { ThreeRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import CandidateSettings from "../CandidateSettings/CandidateSettings";
import CompanySettings from "../CompanySettings";
import ContentHeader from "../ContentHeader";
import PaymentSettings from "../PaymentSettings";
import useCandidateSettings from "../CandidateSettings/Conrollers/useCandidateSettings";
import useCompanySettings from "../CompanySettings/Conrollers/useCompanySettings";
import usePaymentSettings from "../PaymentSettings/Conrollers/usePaymentSettings";
import useResponsive from "../../core/hooks/useResponsive";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { SESSION } from "../../routes/routeNames";
import styles from "./CampusInterviewSettings.module.scss";

const CampusInterviewContent = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const navigate = useNavigate();
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );
  const isEditable = currentGlobalSession?.is_editable;

  const {
    formErrors: PaymentSettingsError,
    formFields: paymentFields,
    getInitialFields: getPaymentFields,
    handleInputChange: handlePaymentInputChange,
    onRemoveCompanyItem,
    onSelectCompanyItem,
    selectedCompanyList,
    isButtonDisable: isPaymentSettingsInvalid,
  } = usePaymentSettings();

  const {
    formErrors: companySettingsError,
    formFields: companySettingsFields,
    getInitialFields: getCompanyFields,
    handleInputChange: handleCompanyInputChange,
    initialFormState,
    onRemoveInterviewType,
    onSelectInterviewType,
    selectedInterviewType,
    isButtonDisable: isCompanySettingsInvalid,
  } = useCompanySettings();

  const {
    errors,
    formErrors,
    formFields,
    getInitialFields,
    handleAdd,
    handleInputChange,
    handleRemove,
    handleCandidateDataChange,
    isButtonDisable: isCandidateSettingsInvalid,
    tableData,
  } = useCandidateSettings();

  const onClickCancel = () => {
    navigate(`/${selectedModule?.key}/${SESSION}?mode=view&tab=2`);
  };

  const onClickSave = () => {
    //TODO: API call to save changes
  };

  return (
    <ThreeRow
      className={styles.mainContainer}
      topSectionClassName={styles.topSectionStyle}
      topSection={
        <ContentHeader
          customStyles={`${styles.campusInterviewHeader} ${
            !responsive?.isMd ? styles.customStyles : ""
          }`}
          headerText={intl.formatMessage({
            id: "label.setCampusInterviewSettings",
          })}
        />
      }
      middleSection={
        <ThreeRow
          className={styles.candidateContentSection}
          topSection={
            <CandidateSettings
              {...{
                errors,
                formErrors,
                formFields,
                getInitialFields,
                handleAdd,
                handleCandidateDataChange,
                handleInputChange,
                handleRemove,
                isEditable,
                tableData,
              }}
            />
          }
          middleSection={
            <CompanySettings
              {...{
                formErrors: companySettingsError,
                formFields: companySettingsFields,
                getInitialFields: getCompanyFields,
                handleInputChange: handleCompanyInputChange,
                initialFormState,
                isEditable,
                onRemoveInterviewType,
                onSelectInterviewType,
                selectedInterviewType,
              }}
            />
          }
          bottomSection={
            <PaymentSettings
              {...{
                formErrors: PaymentSettingsError,
                formFields: paymentFields,
                getInitialFields: getPaymentFields,
                handleInputChange: handlePaymentInputChange,
                isEditable,
                onRemoveCompanyItem,
                onSelectCompanyItem,
                selectedCompanyList,
              }}
            />
          }
        />
      }
      bottomSection={
        isEditable && (
          <ActionAndCancelButtons
            actionBtnText={intl.formatMessage({
              id: "session.saveChanges",
            })}
            cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
            isActionBtnDisable={
              isPaymentSettingsInvalid() ||
              isCompanySettingsInvalid() ||
              isCandidateSettingsInvalid()
            }
            onActionBtnClick={onClickSave}
            onCancelBtnClick={onClickCancel}
          />
        )
      }
    />
  );
};

export default CampusInterviewContent;
