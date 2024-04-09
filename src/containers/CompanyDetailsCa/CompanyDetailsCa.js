import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons/ActionAndCancelButtons";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import DetailsCard from "../DetailsCard";
import EditButton from "../../components/EditButton/EditButton";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import useFetch from "../../core/hooks/useFetch";
import { usePut } from "../../core/hooks/useApiRequest";
import { urlService } from "../../Utils/urlService";
import useShowNotification from "../../core/hooks/useShowNotification";
import { useCompanyDetailsCa } from "./useCompanyDetailsCa";
import { getValidMode } from "../../Utils/validation";
import {
  ADMIN_ROUTE,
  COMPANY_ROUTE,
  PROFILE_END_POINT,
  REGISTERED_COMPANIES,
} from "../../constant/apiEndpoints";
import {
  FORM_STATES,
  NOTIFICATION_TYPES,
  PAGINATION_PROPERTIES,
} from "../../constant/constant";
import { classes } from "./CompanyDetailsCa.styles";
import styles from "./CompanyDetailsCa.module.scss";

const CompanyDetailsCa = () => {
  const intl = useIntl();
  const { companyId } = useParams();
  const [isEditable, setIsEditable] = useState(
    getValidMode(urlService.getQueryStringValue(PAGINATION_PROPERTIES.MODE)) ===
      FORM_STATES?.EDITABLE
  );
  const {
    data,
    error: errorWhileGettingCompanyData,
    isLoading: isGettingCompanyData,
    fetchData: getCompanyData,
  } = useFetch({
    url: ADMIN_ROUTE + REGISTERED_COMPANIES + "/" + companyId,
  });

  const { isLoading: isCompanyEditing, makeRequest: editCompanyData } = usePut({
    url:
      ADMIN_ROUTE + "/" + COMPANY_ROUTE + PROFILE_END_POINT + "/" + companyId,
  });

  const { showNotification, notificationContextHolder } = useShowNotification();

  const onChangeValue = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getData = (data) =>
    data && Object.keys(data)?.length
      ? {
          company_name: data?.name,
          company_entity: data?.entity,
          comapny_frn: data?.frn_number,
          company_partners: data?.number_of_partners,
          current_industry: data?.current_industry,
          correspondance_address: data?.address,
          company_state: data?.state, //
          company_email: data?.email,
          company_username: data?.user_name, //
          company_std: data?.std_country_code,
          company_telephone: data?.telephone_number,
          salutation: data?.contact_person_details[0]?.salutation,
          contact_person_name: data?.contact_person_details[0]?.name,
          contact_person_designation:
            data?.contact_person_details[0]?.designation,
          contact_mobile_number: data?.contact_person_details[0]?.mobile,
          contact_mobile_country_code:
            data?.contact_person_details[0]?.mobile_country_code,
          contact_email: data?.contact_person_details[0]?.email,
          short_profile_company: data?.company_details,
          website: data?.website,
          nature_of_supplier: data?.nature_of_suppliers,
          company_type: data?.company_type,
          source: data?.source_of_information,
          company_logo_image: data?.company_logo,
        }
      : {};

  const [state, setState] = useState(getData(data));

  useEffect(() => {
    setState(getData(data));
  }, [data]);

  useEffect(() => {
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.MODE,
      getValidMode(urlService.getQueryStringValue(PAGINATION_PROPERTIES.MODE))
    );
  }, [urlService]);

  const {
    company_details_data,
    company_logo_data,
    contact_person_details_data,
    isLoading: isGettingOptions,
    isValidAllFields,
    source_of_information_data,
    other_details_data,
    handleCompany_detailBlur,
    handleContact_person_detailBlur,
    handleOther_detailBlur,
    handleSource_of_informationBlur,
    handleCompany_logoBlur,
  } = useCompanyDetailsCa({
    state,
    isEditable,
  });

  const onRetry = () => {
    getCompanyData({});
  };

  const onClickSave = () => {
    let payload = {
      name: state?.company_name,
      entity: state?.company_entity,
      frn_number: state?.comapny_frn,
      number_of_partners: state?.company_partners,
      current_industry: state?.current_industry,
      address: state?.correspondance_address,
      state: state?.company_state, //
      email: state?.company_email,
      user_name: state?.company_username, //
      std_country_code: state?.company_std,
      telephone_number: state?.company_telephone,
      contact_person_details: [
        { salutation: state?.salutation },
        { name: state?.contact_person_name },
        { designation: state?.contact_person_designation },
        { mobile: state?.contact_mobile_number },
        { email: state?.contact_email },
        { mobile_country_code: state?.contact_mobile_country_code },
      ],
      company_details: state?.short_profile_company,
      website: state?.website,
      nature_of_suppliers: state?.nature_of_supplier,
      company_type: state?.company_type,
      source_of_information: state?.source,
      company_logo: state?.company_logo_image,
    };
    editCompanyData({
      body: payload,
      onSuccessCallback: () => {
        showNotification({
          text: intl.formatMessage({ id: "label.company_update_success" }),
          type: NOTIFICATION_TYPES.SUCCESS,
        });
      },
      onErrorCallback: (errMessage) => {
        showNotification({
          text: errMessage,
          type: NOTIFICATION_TYPES.ERROR,
          headingText: intl.formatMessage({ id: "label.errorMessage" }),
        });
      },
    });
  };

  return (
    <>
      {notificationContextHolder}
      {isGettingCompanyData || isGettingOptions ? (
        <CustomLoader />
      ) : errorWhileGettingCompanyData ? (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            {...{ onRetry }}
            errorText={errorWhileGettingCompanyData}
            errorHeading={intl.formatMessage({
              id: "label.error",
            })}
          />
        </div>
      ) : (
        !!data &&
        !isGettingCompanyData &&
        !errorWhileGettingCompanyData && (
          <TwoRow
            style={classes.mainSectionStyle}
            topSection={
              isEditable ? (
                <></>
              ) : (
                <div>
                  <EditButton
                    label={intl.formatMessage({
                      id: "label.editCompanyDetails",
                    })}
                    customEditStyle={styles.ButtonCustomContainerStyle}
                    onClick={() => {
                      setIsEditable(true);
                      urlService.setQueryStringValue(
                        PAGINATION_PROPERTIES.MODE,
                        FORM_STATES?.EDITABLE
                      );
                    }}
                  />
                </div>
              )
            }
            topSectionStyle={classes.topSectionStyle}
            bottomSection={
              <div className={styles.mainContainer}>
                <DetailsCard
                  headerText={intl.formatMessage({
                    id: "label.companyDetails",
                  })}
                  details={company_details_data}
                  isEditable={isEditable}
                  onChangeValue={onChangeValue}
                  onBlur={handleCompany_detailBlur}
                />
                <DetailsCard
                  headerText={intl.formatMessage({
                    id: "label.contactPersonalInformation",
                  })}
                  details={contact_person_details_data}
                  isEditable={isEditable}
                  onChangeValue={onChangeValue}
                  onBlur={handleContact_person_detailBlur}
                />
                <DetailsCard
                  headerText={intl.formatMessage({ id: "label.otherDetails" })}
                  details={other_details_data}
                  isEditable={isEditable}
                  onChangeValue={onChangeValue}
                  onBlur={handleOther_detailBlur}
                />
                <DetailsCard
                  headerText={intl.formatMessage({
                    id: "label.sourceOfInformation",
                  })}
                  details={source_of_information_data}
                  isEditable={isEditable}
                  onChangeValue={onChangeValue}
                  onBlur={handleSource_of_informationBlur}
                />
                {(isEditable || state?.company_logo_image) && (
                  <DetailsCard
                    headerText={intl.formatMessage({ id: "label.companyLogo" })}
                    details={company_logo_data}
                    isSingleComponent
                    isEditable={isEditable}
                    onChangeValue={onChangeValue}
                    onBlur={handleCompany_logoBlur}
                  />
                )}
                {isEditable && (
                  <ActionAndCancelButtons
                    actionBtnText={intl.formatMessage({
                      id: "session.saveChanges",
                    })}
                    cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                    isActionBtnDisable={isCompanyEditing || isValidAllFields}
                    isLoading={isCompanyEditing}
                    onActionBtnClick={onClickSave}
                    onCancelBtnClick={() => {
                      setState(getData(data));
                      setIsEditable(false);
                      urlService.setQueryStringValue(
                        PAGINATION_PROPERTIES.MODE,
                        FORM_STATES?.EDITABLE
                      );
                    }}
                  />
                )}
              </div>
            }
          />
        )
      )}
    </>
  );
};
export default CompanyDetailsCa;
