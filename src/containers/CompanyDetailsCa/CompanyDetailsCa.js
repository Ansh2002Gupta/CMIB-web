import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import DetailsCard from "../DetailsCard";
import EditButton from "../../components/EditButton/EditButton";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import useFetch from "../../core/hooks/useFetch";
import { useCompanyDetailsCa } from "./useCompanyDetailsCa";
import { ADMIN_ROUTE, REGISTERED_COMPANIES } from "../../constant/apiEndpoints";
import { classes } from "./CompanyDetailsCa.styles";
import styles from "./CompanyDetailsCa.module.scss";

const CompanyDetailsCa = () => {
  const intl = useIntl();
  const { companyId } = useParams();
  const isEditable = false;
  const {
    data,
    error: errorWhileGettingCompanyData,
    isLoading: isGettingCompanyData,
    fetchData: getCompanyData,
  } = useFetch({
    url: ADMIN_ROUTE + REGISTERED_COMPANIES + "/" + companyId,
  });

  const getData = (data) =>
    data && Object.keys(data)?.length
      ? {
          company_name: data?.name,
          company_entity: data?.entity,
          comapny_frn: data?.frn_number,
          company_partners: data?.number_of_partners,
          current_industry: data?.current_industry,
          correspondance_address: data?.address,
          company_state: data?.company?.state_code, //
          company_email: data?.email,
          company_username: data?.company?.name, //
          company_std: data?.std_country_code,
          company_telephone: data?.telephone_number,
          salutation: data?.contact_person_details[0]?.salutation,
          contact_person_name: data?.contact_person_details[0]?.name,
          contact_person_designation:
            data?.contact_person_details[0]?.designation,
          contact_mobile_number: data?.contact_person_details[0]?.mobile,
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

  const {
    company_details_data,
    company_logo_data,
    contact_person_details_data,
    source_of_information_data,
    other_details_data,
  } = useCompanyDetailsCa({
    state,
    isEditable,
  });

  const onRetry = () => {
    getCompanyData({});
  };

  return (
    <>
      {isGettingCompanyData ? (
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
        <TwoRow
          style={classes.mainSectionStyle}
          topSection={
            <div>
              <EditButton
                label={intl.formatMessage({ id: "label.editCompanyDetails" })}
                customEditStyle={styles.ButtonCustomContainerStyle}
              />
            </div>
          }
          topSectionStyle={classes.topSectionStyle}
          bottomSection={
            <div className={styles.mainContainer}>
              <DetailsCard
                headerText={intl.formatMessage({
                  id: "label.companyDetails",
                })}
                details={company_details_data}
              />
              <DetailsCard
                headerText={intl.formatMessage({
                  id: "label.contactPersonalInformation",
                })}
                details={contact_person_details_data}
              />
              <DetailsCard
                headerText={intl.formatMessage({ id: "label.otherDetails" })}
                details={other_details_data}
              />
              <DetailsCard
                headerText={intl.formatMessage({
                  id: "label.sourceOfInformation",
                })}
                details={source_of_information_data}
              />
              {state?.company_logo_image && (
                <DetailsCard
                  headerText={intl.formatMessage({ id: "label.companyLogo" })}
                  details={company_logo_data}
                  isSingleComponent
                />
              )}
            </div>
          }
        />
      )}
    </>
  );
};
export default CompanyDetailsCa;
