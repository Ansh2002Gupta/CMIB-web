import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import { Image, Typography } from "antd";

import { TwoRow } from "../../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import CustomGrid from "../../../components/CustomGrid";
import styles from "./CandidateProfile.module.scss";
import { PERSONAL_DETAILS_FEILDS } from "./CandidateProfileFieldDetails";
import { CORRESPONDENCE_ADDRESS_FEILDS } from "./CandidateProfileFieldDetails";
import { CANDIDATE_PROFILE } from "../../../CandidateDetailsDummyData";
import { PERMANENT_ADDRESS_FEILDS } from "./CandidateProfileFieldDetails";

const CandidateProfile = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState(CANDIDATE_PROFILE);

  const personal_details_fields = PERSONAL_DETAILS_FEILDS(
    formData?.gender,
    formData?.marital_status,
    formData?.date_of_birth,
    formData?.email,
    formData?.passport,
    formData?.passport_no
  );

  const corresponding_addresss_fields = CORRESPONDENCE_ADDRESS_FEILDS(
    formData?.corresponding_addresss?.address1,
    formData?.corresponding_addresss?.address2,
    formData?.corresponding_addresss?.address3,
    formData?.corresponding_addresss?.country,
    formData?.corresponding_addresss?.state,
    formData?.corresponding_addresss?.city,
    formData?.corresponding_addresss?.pin_code,
    formData?.corresponding_addresss?.mobile_no,
    formData?.corresponding_addresss?.phone_no,
    formData?.corresponding_addresss?.nationality,
  );

  const permanent_address_fields = PERMANENT_ADDRESS_FEILDS(
    formData?.permanent_address?.address1,
    formData?.permanent_address?.address2,
    formData?.permanent_address?.address3,
    formData?.permanent_address?.country,
    formData?.permanent_address?.state,
    formData?.permanent_address?.city,
    formData?.permanent_address?.pin_code,
  );

  return (
    <div className={styles.mainContainer}>
      <TwoRow
        className={styles.candidateDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.personalDetails" })}
          </Typography>
        }
        bottomSection={
          <CustomGrid>
            {personal_details_fields.map((item) => (
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
        className={styles.candidateDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.correspondingAddress" })}
          </Typography>
        }
        bottomSection={
          <CustomGrid>
            {corresponding_addresss_fields.map((item) => (
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
        className={styles.candidateDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.permanentAddress" })}
          </Typography>
        }
        bottomSection={
          <CustomGrid>
            {permanent_address_fields.map((item) => (
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
    </div>
  );
};

export default CandidateProfile;
