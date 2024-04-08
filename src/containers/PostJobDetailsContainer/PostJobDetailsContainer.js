import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Image, Typography } from "antd";

import { TwoRow, TwoColumn } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import DetailsCard from "../DetailsCard/DetailsCard";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import useFetch from "../../core/hooks/useFetch";
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
              !errorWhileGettingJobs && <div>hi</div>
            )
          }
        />
      }
    </>
  );
};

export default PostJobDetailsContainer;
