import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { usePut } from "../../core/hooks/useApiRequest";
import useShowNotification from "../../core/hooks/useShowNotification";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { RoundDetailsContext } from "../../globalContext/RoundDetails/roundDetailsProvider";
import { urlService } from "../../Utils/urlService";
import { getErrorMessage } from "../../constant/utils";
import { API_STATUS, ROUND_ID } from "../../constant/constant";
import {
  CAMPUS_INTERVIEW,
  CORE_ROUTE,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { SESSION } from "../../routes/routeNames";
import styles from "./CampusInterviewSettings.module.scss";

const CampusInterviewContent = () => {
  const intl = useIntl();
  const location = useLocation();
  const responsive = useResponsive();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const navigate = useNavigate();
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );

  const hasRoundTwo = location?.pathname.includes("round2");
  const [roundDetailState] = useContext(RoundDetailsContext);
  const { showNotification, notificationContextHolder } = useShowNotification();
  const isEditable = !!currentGlobalSession?.is_editable;
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
    getRoundTwoInitialFields: getCompanyRoundTwoFields,
    handleInputChange: handleCompanyInputChange,
    onRemoveInterviewType,
    onSelectInterviewType,
    selectedInterviewType,
    isButtonDisable: isCompanySettingsInvalid,
  } = useCompanySettings({
    companyDetails: campusInterviewData,
    hasRoundTwo,
  });

  const {
    errors,
    formErrors,
    formFields,
    getInitialFields,
    getRoundTwoInitialFields,
    handleAdd,
    handleInputChange,
    handleRemove,
    handleCandidateDataChange,
    selectedCenterTableData,
    isButtonDisable: isCandidateSettingsInvalid,
    tableData,
  } = useCandidateSettings({
    candidateDetails: campusInterviewData,
    isEditable,
    hasRoundTwo,
  });

  const onClickCancel = () => {
    if (hasRoundTwo) {
      navigate(`/${selectedModule?.key}/${SESSION}?mode=view&tab=3`);
    } else {
      navigate(`/${selectedModule?.key}/${SESSION}?mode=view&tab=2`);
    }
  };

  const {
    makeRequest: updateCampusInterviewDetails,
    isLoading: isUpdatingCompausInterviewDetails,
  } = usePut({
    url:
      CORE_ROUTE +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${roundId}` +
      CAMPUS_INTERVIEW,
  });

  const currentCenters = !hasRoundTwo
    ? roundDetailState?.roundOneCenters
    : roundDetailState?.roundTwoCenters;

  const onClickSave = () => {
    const consentData = tableData
      .filter(
        (item) =>
          !!item.centre_name ||
          !!item.from_date ||
          !!item.to_date ||
          !!item.from_time ||
          !!item.to_time
      )
      .map((item, index) => {
        const roundCentreMapping = currentCenters?.find(
          (consentItem) => consentItem.name === item.centre_name
        );
        if (hasRoundTwo) {
          return {
            id: item?.id || null,
            round_centre_mapping_id: roundCentreMapping?.id,
            from_date: item.from_date,
            to_date: item.to_date,
          };
        } else {
          return {
            id: item?.id || null,
            round_centre_mapping_id: roundCentreMapping?.id,
            from_date: item.from_date,
            to_date: item.to_date,
            from_time: item.from_time,
            to_time: item.to_time,
          };
        }
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

    const roundTwoPayload = {
      data: {
        id: campusInterviewData?.id || null,
        ps_round_id: roundId,
        consent: consentData,
        candidate_settings: {
          max_interview_allowed_candidate: formFields?.max_no_of_interview,
          max_offer_accepted_candidate: formFields?.max_no_of_offer,
          center_change_start_date_candidate:
            selectedCenterTableData[0]?.big_centre_start_date,
          center_change_end_date_candidate:
            selectedCenterTableData[0]?.big_centre_end_date,
        },
        company_settings: {
          max_no_vacancy_company: companySettingsFields?.max_no_of_vacancy,
          shortlist_ratio: companySettingsFields?.shortlist_ratio,
          company_interview_types:
            companySettingsFields?.company_interview_types,
        },
      },
    };

    updateCampusInterviewDetails({
      body: hasRoundTwo ? roundTwoPayload : payload,
      onSuccessCallback: () => {
        showNotification({
          text: intl.formatMessage({ id: "label.data_saved_successfully" }),
          type: API_STATUS.SUCCESS,
        });
      },
      onErrorCallback: (errorMessage) => {
        const errors =
          errorMessage?.errors ||
          errorMessage?.data?.data?.errors ||
          errorMessage?.data?.message;
        const messages = Object.values(errors).flat();
        showNotification({
          text: messages,
          type: API_STATUS.ERROR,
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
        isMiddleFillSpace={isErrorWhileCampusInterviews}
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
                      getRoundTwoInitialFields,
                      handleAdd,
                      hasRoundTwo,
                      handleCandidateDataChange,
                      handleInputChange,
                      handleRemove,
                      selectedCenterTableData,
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
                      getRoundTwoInitialFields: getCompanyRoundTwoFields,
                      handleInputChange: handleCompanyInputChange,
                      hasRoundTwo,
                      isEditable,
                      onRemoveInterviewType,
                      onSelectInterviewType,
                      selectedInterviewType,
                    }}
                  />
                }
                bottomSection={
                  !hasRoundTwo && (
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
                  )
                }
              />
            )}
            {isErrorWhileCampusInterviews &&
              !isLoadingInterviewCampusDetails && (
                <div className={styles.errorContainer}>
                  <ErrorMessageBox
                    errorHeading={intl.formatMessage({ id: "label.error" })}
                    errorText={getErrorMessage(
                      erroWhileGettinginterviewDetails
                    )}
                    onRetry={() => getCampusInterviewData({})}
                  />
                </div>
              )}
          </>
        }
        bottomSection={
          !isLoadingInterviewCampusDetails &&
          isEditable &&
          !isErrorWhileCampusInterviews && (
            <ActionAndCancelButtons
              actionBtnText={intl.formatMessage({
                id: "session.saveChanges",
              })}
              cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
              isActionBtnDisable={
                hasRoundTwo
                  ? isCompanySettingsInvalid() || isCandidateSettingsInvalid()
                  : isCompanySettingsInvalid() ||
                    isCandidateSettingsInvalid() ||
                    isPaymentSettingsInvalid()
              }
              isLoading={isUpdatingCompausInterviewDetails}
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
