import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import CompanySettings from "../CompanySettings";
import ContentHeader from "../ContentHeader";
import PaymentSettings from "../PaymentSettings";
import useCompanySettings from "../CompanySettings/Conrollers/useCompanySettings";
import usePaymentSettings from "../PaymentSettings/Conrollers/usePaymentSettings";
import useResponsive from "../../core/hooks/useResponsive";
import { ThreeRow } from "../../core/layouts";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { SESSION } from "../../routes/routeNames";
import styles from "./CampusInterviewSettings.module.scss";

const CampusInterviewContent = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const navigate = useNavigate();
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

  const onClickCancel = () => {
    navigate(`/${selectedModule?.key}/${SESSION}?mode=view&tab=2`);
  };

  return (
    <ThreeRow
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
      middleSection={
        <ThreeRow
          topSection={<></>}
          middleSection={
            <CompanySettings
              {...{
                formErrors: companySettingsError,
                formFields: companySettingsFields,
                getInitialFields: getCompanyFields,
                handleInputChange: handleCompanyInputChange,
                initialFormState,
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
                onRemoveCompanyItem,
                onSelectCompanyItem,
                selectedCompanyList,
              }}
            />
          }
        />
      }
      bottomSection={
        <ActionAndCancelButtons
          actionBtnText={intl.formatMessage({
            id: "session.saveChanges",
          })}
          cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
          isActionBtnDisable={
            isPaymentSettingsInvalid() || isCompanySettingsInvalid()
          }
          onActionBtnClick={() => {}}
          onCancelBtnClick={onClickCancel}
        />
      }
    />
  );
};

export default CampusInterviewContent;
