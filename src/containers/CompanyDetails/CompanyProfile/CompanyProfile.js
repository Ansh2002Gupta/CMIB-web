import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import { Image, Typography } from "antd";

import { TwoRow } from "../../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import CustomGrid from "../../../components/CustomGrid";
import {
  COMPANY_DETAILS_FEILDS,
  CONTACT_PERSONAL_INFORMATION_FEILDS,
  OTHER_DETAILS_FEILDS,
} from "./CompanyProfileFieldDetails";
import { COMPANY_PROFILE } from "../../../companyDetailsDummyData";
import styles from "./CompanyProfile.module.scss";

const CompanyProfile = ({ companyProfileDetails }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  // console.log("companyDetails", companyDetails);

  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState(companyProfileDetails);

  const dumm = {
    id: 16,
    address: "ADDRESS",
    approval_date: null,
    approved: null,
    approved_by: null,
    contact_person_designation: null,
    contact_person_name: null,
    contact_salutation: null,
    created_at: "2024-01-19T17:08:33.000000Z",
    credit_amount: null,
    deleted_at: null,
    email: "kashish+12@unthinkable.co",
    gstin: null,
    mobile_country_code: null,
    mobile_number: null,
    name: "COMPANY_NAME",
    pan: null,
    po_number: null,
    tan: null,
    type: "deemed export",
    updated_at: "2024-01-19T17:08:33.000000Z",
    user_id: null,
    company_module_access: null,
  };

  const company_details_fields = COMPANY_DETAILS_FEILDS(
    formData?.name || "-",
    formData?.entity || "-",
    formData?.frn_number || "-",
    formData?.number_of_partner || "-",
    formData?.type || "-",
    formData?.address || "-",
    formData?.email || "-",
    formData?.mobile_country_code || "-",
    formData?.mobile_number || "-"
  );

  const contact_personal_information_fields =
    CONTACT_PERSONAL_INFORMATION_FEILDS(
      formData?.salutation || "-",
      formData?.name || "-",
      formData?.designation || "-",
      formData?.mobile_country_code || "-",
      formData?.mobile_number || "-",
      formData?.email || "-"
    );

  const other_details = OTHER_DETAILS_FEILDS(
    formData?.company_details || "-",
    formData?.website || "-",
    formData?.nature_of_supplier || "-",
    formData?.company_type || "-"
  );

  return (
    <div className={styles.mainContainer}>
      <TwoRow
        className={styles.companyDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.companyDetails" })}
          </Typography>
        }
        bottomSection={
          <CustomGrid>
            {company_details_fields.map((item) => (
              <TwoRow
                key={item.id}
                className={styles.gridItem}
                topSection={
                  <Typography className={styles.grayText}>
                    {intl.formatMessage({
                      id: `label.${item.headingIntl}`,
                    })}
                    <span className={styles.redText}> *</span>
                  </Typography>
                }
                bottomSection={
                  <div className={styles.blackText}>{item.value}</div>
                }
              />
            ))}
          </CustomGrid>
        }
      />
      <TwoRow
        className={styles.companyDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.contactPersonalInformation" })}
          </Typography>
        }
        bottomSection={
          <CustomGrid>
            {contact_personal_information_fields.map((item) => (
              <TwoRow
                key={item.id}
                className={styles.gridItem}
                topSection={
                  <Typography className={styles.grayText}>
                    {intl.formatMessage({
                      id: `label.${item.headingIntl}`,
                    })}
                    <span className={styles.redText}> *</span>
                  </Typography>
                }
                bottomSection={
                  <div className={styles.blackText}>{item.value}</div>
                }
              />
            ))}
          </CustomGrid>
        }
      />
      <TwoRow
        className={styles.companyDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.otherDetails" })}
          </Typography>
        }
        bottomSection={
          <CustomGrid>
            {other_details.map((item, index) => {
              const itemStyle = !index ? styles.fullWidthItem : "";
              return (
                <TwoRow
                  key={item.id}
                  className={`${styles.gridItem} ${itemStyle}`}
                  topSection={
                    <Typography className={styles.grayText}>
                      {intl.formatMessage({
                        id: `label.${item.headingIntl}`,
                      })}
                      <span className={styles.redText}> *</span>
                    </Typography>
                  }
                  bottomSection={
                    item.id === 2 ? (
                      <a className={styles.anchor} href={item.value}>
                        {item.value}
                      </a>
                    ) : (
                      <div className={styles.blackText}>{item.value}</div>
                    )
                  }
                />
              );
            })}
          </CustomGrid>
        }
      />
      <TwoRow
        className={styles.companyDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.sourceOfInformation" })}
          </Typography>
        }
        bottomSection={
          <div className={styles.sourceOfInformation}>
            {formData?.source_of_information?.map((val, index) => (
              <Typography key={index} className={styles.periodText}>
                {val}
              </Typography>
            ))}
          </div>
        }
      />
      <TwoRow
        className={styles.companyLogo}
        topSection={
          <div>
            <Typography className={styles.headingText}>
              {intl.formatMessage({ id: "label.companyLogo" })}
            </Typography>
            <Typography className={styles.logoText}>
              {intl.formatMessage({ id: "label.companyIciaMessage" })}
            </Typography>
          </div>
        }
        bottomSection={
          <div className={styles.logo}>
            <div className={styles.logoBox}>
              <Image
                src={formData.company_logo ?? getImage("TempCompanyLogo")}
                preview={false}
              />
            </div>
            <div className={styles.logoName}>{formData?.logo_name}</div>
          </div>
        }
      />
    </div>
  );
};

export default CompanyProfile;
