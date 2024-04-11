import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../../core/layouts";

import CustomGrid from "../../../components/CustomGrid";
import styles from "./Exams.module.scss";
import { FOUNDATION_FIELD, INTER_AND_FINAL_FIELD } from "./ExamsFieldDetails";
import { EXAMS_DETAIL } from "../../../CandidateDetailsDummyData";


const Exams = () => {
  const intl = useIntl();
  const [formData, setFormData] = useState(EXAMS_DETAIL);

  const personal_details_fields = FOUNDATION_FIELD(
    formData?.foundation?.month,
    formData?.foundation?.year,
    formData?.foundation?.marks_in_per,
    formData?.foundation?.rank_medal,
    formData?.foundation?.foundation_attempt_count,
  );

  const corresponding_addresss_fields = INTER_AND_FINAL_FIELD(
    formData?.inter?.month,
    formData?.inter?.year,
    formData?.inter?.marks_in_per,
    formData?.inter?.rank_medal,
  );

  const permanent_address_fields = INTER_AND_FINAL_FIELD(
    formData?.final?.month,
    formData?.final?.year,
    formData?.final?.marks_in_per,
    formData?.final?.rank_medal,
  );

  return (
    <div className={styles.mainContainer}>
      <TwoRow
        className={styles.examsDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.caFoundation" })}
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
        className={styles.examsDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.caInter" })}
            
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
        className={styles.examsDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.caFinal" })}
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

export default Exams;
