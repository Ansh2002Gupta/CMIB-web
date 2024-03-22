import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Image, Typography } from "antd";

import { TwoRow } from "../../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import CustomGrid from "../../../components/CustomGrid";
import {
  COMPANY_DETAILS_FIELDS,
  CONTACT_PERSONAL_INFORMATION_FIELDS,
  OTHER_DETAILS_FEILDS,
} from "./CompanyProfileFieldDetails";
import styles from "./CompanyProfile.module.scss";

const CompanyProfile = ({ companyProfileDetails }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  const company_details_fields = COMPANY_DETAILS_FIELDS(
    companyProfileDetails?.name || "",
    companyProfileDetails?.entity || "",
    companyProfileDetails?.frn_number || "",
    companyProfileDetails?.number_of_partner || "",
    companyProfileDetails?.company_type || "",
    companyProfileDetails?.address || "",
    companyProfileDetails?.email || "",
    companyProfileDetails?.std_country_code || "",
    companyProfileDetails?.telephone_number || ""
  );

  const other_details = OTHER_DETAILS_FEILDS(
    companyProfileDetails?.company_details || "-",
    companyProfileDetails?.website || "-",
    companyProfileDetails?.nature_of_supplier || "-",
    companyProfileDetails?.company_type || "-"
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
            {company_details_fields.map(
              (item) =>
                !!item.value && (
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
                )
            )}
          </CustomGrid>
        }
      />
      {companyProfileDetails?.contact_person_details.map(
        (contactDetails, index) => {
          const contact_personal_information_fields =
            CONTACT_PERSONAL_INFORMATION_FIELDS(
              contactDetails?.salutation || "-",
              contactDetails?.name || "-",
              contactDetails?.designation || "-",
              contactDetails?.mobile || "-",
              contactDetails?.email || "-"
            );
          return (
            <TwoRow
              key={index}
              className={styles.companyDetails}
              topSection={
                <Typography className={styles.headingText}>
                  {intl.formatMessage({
                    id: "label.contactPersonalInformation",
                  })}
                </Typography>
              }
              bottomSection={
                <CustomGrid>
                  {contact_personal_information_fields.map(
                    (item) =>
                      !!item.value && (
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
                      )
                  )}
                  {contactDetails?.roles && contactDetails.roles.length > 0 && (
                    <TwoRow
                      key="roles"
                      className={styles.gridItem}
                      topSection={
                        <Typography className={styles.grayText}>
                          {intl.formatMessage({
                            id: "label.modules",
                          })}
                          <span className={styles.redText}> *</span>
                        </Typography>
                      }
                      bottomSection={
                        <div className={styles.sourceOfInformation}>
                          {contactDetails.roles.map((role, roleIndex) => (
                            <Typography
                              key={index}
                              className={styles.periodText}
                            >
                              {role.name}
                            </Typography>
                          ))}
                        </div>
                      }
                    />
                  )}
                </CustomGrid>
              }
            />
          );
        }
      )}

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
            {companyProfileDetails?.source_of_information?.map((val, index) => (
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
                className={styles.logoImage}
                src={
                  companyProfileDetails?.company_logo ??
                  getImage("TempCompanyLogo")
                }
                preview
              />
            </div>
          </div>
        }
      />
      <div className={styles.companyDetails}>
        <Typography className={styles.additionalInformationText}>
          {intl.formatMessage({ id: "label.balanceCredit" })}
          <span className={styles.headingText}>
            {companyProfileDetails?.credit_amount ?? 0}
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default CompanyProfile;
