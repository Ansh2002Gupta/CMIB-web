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

const CompanyProfile = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState(COMPANY_PROFILE);

  const company_details_fields = COMPANY_DETAILS_FEILDS(
    formData?.name,
    formData?.entity,
    formData?.frn_number,
    formData?.number_of_partner,
    formData?.industry_type,
    formData?.address,
    formData?.state,
    formData?.email,
    formData?.username,
    formData?.std_country_code,
    formData?.telephone_number
  );

  const contact_personal_information_fields =
    CONTACT_PERSONAL_INFORMATION_FEILDS(
      formData?.contact_details?.salutation,
      formData?.contact_details?.name,
      formData?.contact_details?.designation,
      formData?.contact_details?.mobile_country_code,
      formData?.contact_details?.mobile_number,
      formData?.contact_details?.email
    );

  const other_details = OTHER_DETAILS_FEILDS(
    formData?.company_details,
    formData?.website,
    formData?.nature_of_supplier,
    formData?.company_type
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
