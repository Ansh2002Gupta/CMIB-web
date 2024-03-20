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
import useFetch from "../../core/hooks/useFetch";
import { usePatch } from "../../core/hooks/useApiRequest";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  CAMPUS_INTERVIEW,
  CORE_ROUTE,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { SESSION } from "../../routes/routeNames";
import styles from "./CampusInterviewSettings.module.scss";
import { urlService } from "../../Utils/urlService";
import { ROUND_ID } from "../../constant/constant";

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
  // const isEditable = currentGlobalSession?.is_editable;
  const isEditable = true;
  const roundId = urlService.getQueryStringValue(ROUND_ID);

  const {
    data: orientationCentres,
    error: errorWhileGettingCentres,
    fetchData: getOrientationCentres,
    isLoading: isGettingOrientationCentres,
    isSuccess: fetchCentersSuccessFlag,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${roundId}` +
      CAMPUS_INTERVIEW,
    // otherOptions: { skipApiCallOnMount: true },
  });

  const dum = {
    id: 247,
    ps_round_id: null,
    max_interview_allowed_candidate: null,
    max_offer_accepted_candidate: null,
    big_center_change_start_date_candidate: null,
    big_center_change_end_date_candidate: null,
    small_center_change_start_date_candidate: null,
    small_center_change_end_date_candidate: null,
    max_no_vacancy_company: null,
    multiplier_company: null,
    shotlist_candidate_allowed_company: null,
    company_interview_types: null,
    cgst: null,
    sgst: null,
    igst: null,
    no_gst: null,
    disconunt_rate: null,
    member_registration_fee: null,
    shortlist_ratio: null,
    candidate_consent: [
      {
        id: 21,
        centre_name: "ABCDE",
        from_date: null,
        to_date: null,
        from_time: null,
        to_time: null,
      },
    ],
  };

  // console.log("orientationCentres", orientationCentres);

  const {
    formErrors: PaymentSettingsError,
    formFields: paymentFields,
    getInitialFields: getPaymentFields,
    handleInputChange: handlePaymentInputChange,
    onRemoveCompanyItem,
    onSelectCompanyItem,
    selectedCompanyList,
    isButtonDisable: isPaymentSettingsInvalid,
  } = usePaymentSettings({ paymentDetails: orientationCentres });

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
  } = useCompanySettings({ companyDetails: orientationCentres });

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
  } = useCandidateSettings({ candidateDetails: orientationCentres });

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
    //TODO: API call to save changes
    console.log("paymentFields", paymentFields);
    console.log("companySettingsFields", companySettingsFields);
    console.log("formFields", formFields);
    console.log("tableData", tableData);
    const consentData = tableData.map((item, index) => {
      return {
        id: index + 1,
        round_centre_mapping_id: index + 1,
        from_date: item.from_date,
        to_date: item.to_date,
        from_time: item.from_time,
        to_time: item.to_time,
      };
    });

    console.log("consentData", consentData);

    const payload = {
      data: {
        id: "1",
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
        },
      },
    };

    updateCampusInterviewDetails({
      body: payload,
      onSuccessCallback: () => {
        getOrientationCentres({});
      },
    });
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
