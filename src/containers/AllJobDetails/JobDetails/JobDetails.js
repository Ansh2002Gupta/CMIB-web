import React from "react";
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
  jobType,
} from "./JobDetailsFielsDetails";
import styles from "./JobDetails.module.scss";
import { formatDate } from "../../../constant/utils";
import CustomTextEditor from "../../../components/CustomTextEditor";

const JobDetailsView = ({ jobDetails }) => {
  const intl = useIntl();

  const isUrgentJob = jobDetails?.is_urgent ? "Yes" : "No";
  const is_salary_negotiable = jobDetails?.is_salary_negotiable ? "Yes" : "No";
  const isFlexiHours = jobDetails?.flexi_hours ? "Yes" : "No";
  const jobStatus = jobDetails?.status ? "Active" : "Inactive";
  const approvedByAdmin = jobDetails?.company?.approved ? "Yes" : "No";

  const job_details_type_information = JOB_DETAILS_TYPE_INFORMATION(
    jobDetails?.work_mode?.name,
    isFlexiHours
  );
  const job_details_salary_details = JOB_DETAILS_SALARY_DETAILS(
    is_salary_negotiable,
    jobDetails?.min_salary,
    jobDetails?.max_salary
  );
  const job_details_job_opening_closing_details =
    JOB_DETAILS_JOB_OPENING_CLOSING_DETAILS(
      formatDate({ date: jobDetails?.opening_date }),
      formatDate({ date: jobDetails?.closing_date })
    );
  const other_details_feilds = OTHER_DETAILS_FEILDS(
    jobDetails?.company?.website,
    jobDetails?.company?.nature_of_suppliers,
    jobDetails?.company?.type,
    jobDetails?.gender_preference?.label,
    jobDetails?.category_prefrence?.name
  );
  const job_details_job_description = JOB_DETAILS_JOB_DESCRIPTION(
    jobDetails?.type?.name,
    isUrgentJob,
    jobDetails?.company?.type,
    jobDetails?.min_experience,
    jobDetails?.max_experience,
    jobDetails?.nationality?.name,
    jobDetails?.designation,
    jobDetails?.locations
  );

  const renderJobDetailText = (heading, value, isMandatory) => {
    return (
      <TwoRow
        className={styles.gridItem}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({
              id: `label.${heading}`,
            })}
            {isMandatory ? <span className={styles.redText}> *</span> : null}
          </Typography>
        }
        bottomSection={
          <Typography className={styles.blackText}>
            {value ? value : "-"}
          </Typography>
        }
      />
    );
  };

  const YEAR = jobDetails?.contract_period?.years > 1 ? "years" : "year";
  const MONTH = jobDetails?.contract_period?.months > 1 ? "months" : "month";
  const DAYS = jobDetails?.contract_period?.days > 1 ? "days" : "day";
  const contactPeriod = `${jobDetails?.contract_period?.years} ${YEAR} ${jobDetails?.contract_period?.months} ${MONTH} ${jobDetails?.contract_period?.days} ${DAYS}`;

  return (
    <div className={styles.mainContainer}>
      <TwoRow
        className={styles.companyDetails}
        topSection={renderJobDetailText(
          "company_name",
          jobDetails?.company?.name,
          true
        )}
        bottomSection={
          <TwoRow
            topSection={
              <CustomGrid>
                {renderJobDetailText("jobId", jobDetails?.job_id, true)}
                {renderJobDetailText(
                  "approved_by_admin",
                  approvedByAdmin,
                  true
                )}
              </CustomGrid>
            }
            bottomSection={
              <div className="styles.jobSummaryContainer">
                {renderJobDetailText("job_summary", jobDetails?.summary, true)}
                <CustomTextEditor
                  disabled
                  label={intl.formatMessage({
                    id: `label.job_details`,
                  })}
                  value={jobDetails?.detail}
                  isMandatory
                />
                <CustomGrid>
                  {job_details_job_description.map((item) => (
                    <TwoRow
                      key={item.id}
                      className={styles.gridItem}
                      topSection={
                        <Typography className={styles.headingText}>
                          {intl.formatMessage({
                            id: `label.${item.headingIntl}`,
                          })}
                          {item.isMandatory ? (
                            <span className={styles.redText}> *</span>
                          ) : null}
                        </Typography>
                      }
                      bottomSection={
                        <div className={styles.sourceOfInformation}>
                          {item.label === "jobLocation" ? (
                            item?.value?.map((val, index) => (
                              <Typography
                                key={index}
                                className={styles.periodText}
                              >
                                {val?.city}
                              </Typography>
                            ))
                          ) : (
                            <div className={styles.blackText}>
                              {item.value ? item.value : "-"}
                            </div>
                          )}
                        </div>
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
                      {jobDetails?.functional_areas?.map((val, index) => (
                        <Typography key={index} className={styles.periodText}>
                          {val?.name}
                        </Typography>
                      ))}
                    </div>
                  }
                />
                {renderJobDetailText(
                  "sort_profile_of_the_company",
                  jobDetails?.company?.company_details,
                  true
                )}
                <CustomGrid>
                  {other_details_feilds.map((item) => (
                    <div>
                      {renderJobDetailText(
                        item.headingIntl,
                        item?.value,
                        item.isMandatory
                      )}
                    </div>
                  ))}
                </CustomGrid>
                <TwoRow
                  topSection={renderJobDetailText(
                    "essential_qualification",
                    jobDetails?.essential_qualification,
                    false
                  )}
                  bottomSection={renderJobDetailText(
                    "desired_qualification",
                    jobDetails?.desired_qualification,
                    false
                  )}
                />
                <CustomGrid>
                  {job_details_job_opening_closing_details.map((item) =>
                    renderJobDetailText(
                      item.headingIntl,
                      item?.value,
                      item.isMandatory
                    )
                  )}
                </CustomGrid>
                <CustomGrid>
                  {job_details_salary_details.map((item) =>
                    renderJobDetailText(
                      item.headingIntl,
                      item?.value,
                      item.isMandatory
                    )
                  )}
                </CustomGrid>
                {renderJobDetailText(
                  "no_of_vacancy",
                  jobDetails?.vacancy,
                  true
                )}
                <CustomGrid>
                  {job_details_type_information.map((item) =>
                    renderJobDetailText(item.headingIntl, item?.value, true)
                  )}
                  {jobDetails?.is_contractual
                    ? renderJobDetailText(
                        "contractualPeriod",
                        contactPeriod,
                        false
                      )
                    : null}
                  {jobDetails?.is_for_disabled ? (
                    <>
                      {renderJobDetailText(
                        "typeOfDisabilty",
                        jobDetails?.disability_type,
                        false
                      )}
                      {renderJobDetailText(
                        "disabiltyPercentage",
                        jobDetails?.disability_percentage,
                        false
                      )}
                    </>
                  ) : null}
                  {jobDetails?.type?.name === jobType.REGULAR ||
                  jobDetails?.type?.name === jobType.SPECIALLY_ABLE ||
                  jobDetails?.type?.name === jobType.RETIRED
                    ? renderJobDetailText(
                        "fullTimePartTime",
                        jobDetails?.service_type,
                        true
                      )
                    : null}
                  {renderJobDetailText("jobStatus", jobStatus, false)}
                </CustomGrid>
              </div>
            }
          />
        }
      />
    </div>
  );
};

export default JobDetailsView;
