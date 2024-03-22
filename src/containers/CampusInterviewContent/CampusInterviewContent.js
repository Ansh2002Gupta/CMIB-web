import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

import { ThreeRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import CandidateSettings from "../CandidateSettings/CandidateSettings";
import CustomLoader from "../../components/CustomLoader";
import CompanySettings from "../CompanySettings";
import ContentHeader from "../ContentHeader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import PaymentSettings from "../PaymentSettings";
import useCandidateSettings from "../CandidateSettings/Conrollers/useCandidateSettings";
import useCompanySettings from "../CompanySettings/Conrollers/useCompanySettings";
import usePaymentSettings from "../PaymentSettings/Conrollers/usePaymentSettings";
import useResponsive from "../../core/hooks/useResponsive";
import useFetch from "../../core/hooks/useFetch";
import { usePatch } from "../../core/hooks/useApiRequest";
import useShowNotification from "../../core/hooks/useShowNotification";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { urlService } from "../../Utils/urlService";
import { SESSION } from "../../routes/routeNames";
import {
  CAMPUS_INTERVIEW,
  CORE_ROUTE,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { ROUND_ID } from "../../constant/constant";
import { getErrorMessage } from "../../constant/utils";
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
  const { showNotification, notificationContextHolder } = useShowNotification();
  const isEditable = currentGlobalSession?.is_editable;
  const roundId = urlService.getQueryStringValue(ROUND_ID);

  const {
    data: campusInterviewData,
    error: erroWhileGettinginterviewDetails,
    fetchData: getCampusInterviewData,
    isLoading: isLoadingInterviewCampusDetails,
    isError: isErrorWhileCampusInterviews,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${roundId}` +
      CAMPUS_INTERVIEW,
    otherOptions: { skipApiCallOnMount: true },
  });

  useEffect(() => {
    if (selectedModule?.key && roundId) {
      getCampusInterviewData({});
    }
  }, [selectedModule?.key, roundId]);

  const {
    formErrors: PaymentSettingsError,
    formFields: paymentFields,
    getInitialFields: getPaymentFields,
    handleInputChange: handlePaymentInputChange,
    onRemoveCompanyItem,
    onSelectCompanyItem,
    selectedCompanyList,
    isButtonDisable: isPaymentSettingsInvalid,
  } = usePaymentSettings({
    paymentDetails: campusInterviewData,
  });

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
  } = useCompanySettings({
    companyDetails: campusInterviewData,
  });

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
  } = useCandidateSettings({
    candidateDetails: campusInterviewData,
  });

  const onClickCancel = () => {
    navigate(`/${selectedModule?.key}/${SESSION}?mode=view&tab=2`);
  };

  const {
    makeRequest: updateCampusInterviewDetails,
    isLoading: isUpdatingCompausInterviewDetails,
  } = usePatch({
    url:
      CORE_ROUTE +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${roundId}` +
      CAMPUS_INTERVIEW,
  });

  const onClickSave = () => {
    const consentData = tableData.map((item, index) => {
      const roundCentreMapping = campusInterviewData?.candidate_consent?.find(
        (consentItem) => consentItem.id === item.centre
      );
      return {
        id: item?.centre,
        round_centre_mapping_id: roundCentreMapping?.round_centre_mapping_id,
        from_date: item.from_date,
        to_date: item.to_date,
        from_time: item.from_time,
        to_time: item.to_time,
      };
    });

    const payload = {
      data: {
        id: campusInterviewData?.id || null,
        ps_round_id: roundId,
        consent: consentData,
        candidate_settings: {
          max_interview_allowed_candidate: formFields?.max_no_of_interview,
          max_offer_accepted_candidate: formFields?.max_no_of_offer,
          big_center_change_start_date_candidate:
            formFields?.big_centre_start_date,
          big_center_change_end_date_candidate: formFields?.big_centre_end_date,
          small_center_change_start_date_candidate:
            formFields?.small_centre_start_date,
          small_center_change_end_date_candidate:
            formFields?.small_centre_end_date,
        },
        company_settings: {
          max_no_vacancy_company: companySettingsFields?.max_no_of_vacancy,
          multiplier_company: companySettingsFields?.multiplier,
          shotlist_candidate_allowed_company:
            companySettingsFields?.shortlist_students_allowed,
          company_interview_types:
            companySettingsFields?.company_interview_types,
        },
        payment_settings: {
          cgst: paymentFields?.cgst,
          sgst: paymentFields?.sgst,
          igst: paymentFields?.igst,
          no_gst: paymentFields?.no_gst,
          disconunt_rate: paymentFields?.discount_rate,
          member_registration_fee: paymentFields?.member_registration_fee,
        },
      },
    };
    updateCampusInterviewDetails({
      body: payload,
      onSuccessCallback: () => {
        getCampusInterviewData({});
      },
      onErrorCallback: (errorMessage) => {
        showNotification({
          text: errorMessage,
          type: "error",
        });
      },
    });
  };

  return (
    <>
      {notificationContextHolder}
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
          <>
            {isLoadingInterviewCampusDetails && <CustomLoader />}
            {!isLoadingInterviewCampusDetails && !!campusInterviewData && (
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
                      campusInterviewData,
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
            )}
            {isErrorWhileCampusInterviews &&
              !isLoadingInterviewCampusDetails && (
                <ErrorMessageBox
                  errorHeading={intl.formatMessage({ id: "lable.errors." })}
                  errorText={getErrorMessage(erroWhileGettinginterviewDetails)}
                  onRetry={() => getCampusInterviewData({})}
                />
              )}
          </>
        }
        bottomSection={
          (isEditable || !isErrorWhileCampusInterviews) && (
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
    </>
  );
};

export default CampusInterviewContent;
