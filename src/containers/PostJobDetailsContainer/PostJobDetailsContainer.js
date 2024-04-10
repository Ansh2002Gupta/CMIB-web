import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Image, Typography } from "antd";

import { TwoRow, TwoColumn } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import DetailsCard from "../DetailsCard/DetailsCard";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import useFetch from "../../core/hooks/useFetch";
import { usePostJobDetails } from "./usePostJobDetails";
import { ADMIN_ROUTE, JOBS } from "../../constant/apiEndpoints";
import { classes } from "./PostedJobDetails.styles";
import styles from "./PostJobDetailsContainer.module.scss";

const PostJobDetailsContainer = ({ jobId, setIsModalOpen }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const {
    data: jobDetails,
    isLoading: isGettingJobDetails,
    error: errorWhileGettingJobs,
    fetchData: getJobDetails,
  } = useFetch({
    url: ADMIN_ROUTE + JOBS + `/${jobId}`,
  });

  const getData = (data) =>
    data && Object.keys(data)?.length
      ? {
          company_name: data?.company_name,
          approved: data?.approved,
          jobId: data?.job_id,
          summary: data?.summary,
          detail: data?.detail,
          type: data?.type?.name,
          is_urgent: data?.is_urgent,
          industry: data?.industry,
          min_experience: data?.min_experience,
          max_experience: data?.max_experience,
          designation: data?.designation,
          location: data?.location,
          functional_areas: data?.functional_areas,
          nationality: data?.nationality,
          company_details: data?.company_detail,
          website: data?.website,
          company_type: data?.company_type,
          gender_preference: data?.gender_preference?.label,
          category_preference: data?.category_preference,
          essential_qualification: data?.essential_qualification,
          desired_qualification: data?.desired_qualification,
          opening_date: data?.opening_date,
          closing_date: data?.closing_date,
          is_salary_negotiable: data?.is_salary_negotiable,
          min_salary: data?.min_salary,
          max_salary: data?.max_salary,
          vacancy: data?.vacancy,
          mode: data?.mode,
          flexi_hours: data?.flexi_hours,
          service_type: data?.service_type,
          status: data?.status,
        }
      : {};

  const [state, setState] = useState(getData(jobDetails));

  useEffect(() => {
    setState(getData(jobDetails));
  }, [jobDetails]);

  const { job_details_data } = usePostJobDetails({
    state,
    isEditable: false,
  });

  const onRetry = () => {
    getJobDetails({});
  };

  return (
    <>
      {
        <TwoRow
          className={styles.modalContainerStyle}
          topSection={
            <TwoColumn
              isLeftFillSpace
              leftSection={
                <Typography className={styles.headerText}>
                  {intl.formatMessage({ id: "label.postedJobDetails" })}
                </Typography>
              }
              rightSection={
                <Image
                  src={getImage("cross")}
                  preview={false}
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className={styles.crossIcon}
                  style={classes.crossIcon}
                />
              }
            />
          }
          bottomSection={
            isGettingJobDetails ? (
              <CustomLoader />
            ) : errorWhileGettingJobs ? (
              <div className={styles.errorContainer}>
                <ErrorMessageBox
                  {...{ onRetry }}
                  errorText={
                    errorWhileGettingJobs?.message ||
                    intl.formatMessage({ id: "label.somethingWentWrong" })
                  }
                  errorHeading={intl.formatMessage({
                    id: "label.error",
                  })}
                />
              </div>
            ) : (
              !!jobDetails &&
              !isGettingJobDetails &&
              !errorWhileGettingJobs && (
                <DetailsCard
                  details={job_details_data}
                  customMainStyles={classes.customMainStyles}
                />
              )
            )
          }
        />
      }
    </>
  );
};

export default PostJobDetailsContainer;
