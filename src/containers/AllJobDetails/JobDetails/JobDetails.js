import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../../core/layouts";

import CustomGrid from "../../../components/CustomGrid";
import {
  JOB_DETAILS_JOB_DESCRIPTION,
  JOB_DETAILS_JOB_OPENING_CLOSING_DETAILS,
  JOB_DETAILS_SALARY_DETAILS,
  JOB_DETAILS_TYPE_INFORMATION,
  OTHER_DETAILS_FEILDS,
} from "./JobDetailsFielsDetails";
import styles from "./JobDetails.module.scss";

const JobDetails = ({ jobDetails }) => {
  const intl = useIntl();

  const job_details_type_information = JOB_DETAILS_TYPE_INFORMATION(
    "Onsite",
    "Yes",
    "Full time",
    "Active"
  );
  const job_details_salary_details = JOB_DETAILS_SALARY_DETAILS(
    "Yes",
    "10000000",
    "1000000"
  );
  const job_details_job_opening_closing_details =
    JOB_DETAILS_JOB_OPENING_CLOSING_DETAILS("10/11/2023", "10/12/2023");
  const other_details_feilds = OTHER_DETAILS_FEILDS(
    "www.google.com",
    "Registred",
    "Nil Rated",
    "-",
    "-"
  );
  const job_details_job_description = JOB_DETAILS_JOB_DESCRIPTION(
    "Regular",
    "YES",
    "APM",
    "2 years",
    "-",
    "Indian",
    "Revenue Accounts",
    ["Hydrabad", "banglore"]
  );

  const functional_areas = [
    "Audit",
    "Compulsary Tac Audit",
    "certification Audit",
  ];

  return (
    <div className={styles.mainContainer}>
      <TwoRow
        className={styles.companyDetails}
        topSection={
          <TwoRow
            className={styles.gridItem}
            topSection={
              <Typography className={styles.grayText}>
                {intl.formatMessage({
                  id: `label.company_name`,
                })}
                <span className={styles.redText}> *</span>
              </Typography>
            }
            bottomSection={
              <div className={styles.blackText}>www.google.com</div>
            }
          />
        }
        bottomSection={
          <TwoRow
            topSection={
              <CustomGrid>
                <TwoRow
                  className={styles.gridItem}
                  topSection={
                    <Typography className={styles.grayText}>
                      {intl.formatMessage({
                        id: `label.jobId`,
                      })}
                      <span className={styles.redText}> *</span>
                    </Typography>
                  }
                  bottomSection={
                    <div className={styles.blackText}>
                      job_200707121733_0003
                    </div>
                  }
                />
                <TwoRow
                  className={styles.gridItem}
                  topSection={
                    <Typography className={styles.grayText}>
                      {intl.formatMessage({
                        id: `label.approved_by_admin`,
                      })}
                      <span className={styles.redText}> *</span>
                    </Typography>
                  }
                  bottomSection={<div className={styles.blackText}>Yes</div>}
                />
              </CustomGrid>
            }
            bottomSection={
              <div className="styles.jobSummaryContainer">
                <TwoRow
                  className={styles.gridItem}
                  topSection={
                    <Typography className={styles.grayText}>
                      {intl.formatMessage({
                        id: `label.job_summary`,
                      })}
                      <span className={styles.redText}> *</span>
                    </Typography>
                  }
                  bottomSection={
                    <div className={styles.blackText}>
                      The Revenue Accountant will be an integral part of our
                      financial team responsible for ensuring the accuracy and
                      integrity of our revenue accounting operations.
                    </div>
                  }
                />
                <TwoRow
                  className={styles.gridItem}
                  topSection={
                    <Typography className={styles.grayText}>
                      {intl.formatMessage({
                        id: `label.job_details`,
                      })}
                      <span className={styles.redText}> *</span>
                    </Typography>
                  }
                  bottomSection={
                    <TwoRow
                      className={styles.jobDetailsCard}
                      topSection={
                        <div className={styles.blackText}>
                          The Revenue Accountant will be an integral part of our
                          financial team responsible for ensuring the accuracy
                          and integrity of our revenue accounting operations.
                          This position calls for an individual who can manage
                          multiple tasks simultaneously and display a deep
                          understanding of revenue recognition rules and
                          regulations. The ideal candidate will be adept at
                          implementing systems and controls that will uphold the
                          accuracy of our reported financial data.
                        </div>
                      }
                      bottomSection={
                        <TwoRow
                          topSection={
                            <Typography className={styles.grayText}>
                              {intl.formatMessage({
                                id: `label.responsibilities`,
                              })}
                            </Typography>
                          }
                          bottomSection={
                            <div className={styles.blackText}>
                              The Revenue Accountant will be an integral part of
                              our financial team responsible for ensuring the
                              accuracy and integrity of our revenue accounting
                              operations.
                            </div>
                          }
                        />
                      }
                    />
                  }
                />
                <CustomGrid>
                  {job_details_job_description.map((item) => (
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
                        <>
                          {item.id === 8 ? (
                            item.value.map((val, index) => (
                              <Typography
                                key={index}
                                className={styles.periodText}
                              >
                                {val}
                              </Typography>
                            ))
                          ) : (
                            <div className={styles.blackText}>{item.value}</div>
                          )}
                        </>
                      }
                    />
                  ))}
                </CustomGrid>
                <TwoRow
                  className={styles.functionAreasContainer}
                  topSection={
                    <Typography className={styles.headingText}>
                      {intl.formatMessage({ id: "label.funtional_areas" })}
                    </Typography>
                  }
                  bottomSection={
                    <div className={styles.sourceOfInformation}>
                      {functional_areas?.map((val, index) => (
                        <Typography key={index} className={styles.periodText}>
                          {val}
                        </Typography>
                      ))}
                    </div>
                  }
                />
                <TwoRow
                  className={styles.gridItem}
                  topSection={
                    <Typography className={styles.grayText}>
                      {intl.formatMessage({
                        id: `label.sort_profile_of_the_company`,
                      })}
                      <span className={styles.redText}> *</span>
                    </Typography>
                  }
                  bottomSection={
                    <div className={styles.blackText}>
                      The Revenue Accountant will be an integral part of our
                      financial team responsible for ensuring the accuracy and
                      integrity of our revenue accounting operations.
                    </div>
                  }
                />
                <CustomGrid>
                  {other_details_feilds.map((item) => (
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
                <TwoRow
                  topSection={
                    <TwoRow
                      className={styles.gridItem}
                      topSection={
                        <Typography className={styles.grayText}>
                          {intl.formatMessage({
                            id: `label.essential_qualification`,
                          })}
                          <span className={styles.redText}> *</span>
                        </Typography>
                      }
                      bottomSection={<div className={styles.blackText}>-</div>}
                    />
                  }
                  bottomSection={
                    <TwoRow
                      className={styles.gridItem}
                      topSection={
                        <Typography className={styles.grayText}>
                          {intl.formatMessage({
                            id: `label.desired_qualification`,
                          })}
                          <span className={styles.redText}> *</span>
                        </Typography>
                      }
                      bottomSection={<div className={styles.blackText}>-</div>}
                    />
                  }
                />
                <CustomGrid>
                  {job_details_job_opening_closing_details.map((item) => (
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
                <CustomGrid>
                  {job_details_salary_details.map((item) => (
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
                <TwoRow
                  className={styles.gridItem}
                  topSection={
                    <Typography className={styles.grayText}>
                      {intl.formatMessage({
                        id: `label.no_of_vacancy`,
                      })}
                      <span className={styles.redText}> *</span>
                    </Typography>
                  }
                  bottomSection={<div className={styles.blackText}>20</div>}
                />
                <CustomGrid>
                  {job_details_type_information.map((item) => (
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
              </div>
            }
          />
        }
      />
    </div>
  );
};

export default JobDetails;
