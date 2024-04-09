import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import styles from "./AllJobApplicantDetail.module.scss";
import { TwoRow } from "../../core/layouts";
import CustomGrid from "../../components/CustomGrid";
import { formatDate, formatTime } from "../../constant/utils";
import { useParams } from "react-router-dom";
import ContentHeader from "../ContentHeader";
import useResponsive from "../../core/hooks/useResponsive";
import CustomButton from "../../components/CustomButton";
import { ReactComponent as PlusIcon } from "../../themes/base/assets/images/calendar.svg";
import useFetch from "../../core/hooks/useFetch";
import { ADMIN_ROUTE, APPLICANT, APPLICANTS, JOBS } from "../../constant/apiEndpoints";


const AllJobApplicantDetailModal = () => {
  const intl = useIntl();
  const { applicantId, jobId } = useParams();
  console.log(applicantId, jobId)
  const responsive = useResponsive();

  const {
    data: applicantDetails,
    error,
    isError,
    isLoading,
    fetchData,
  } = useFetch({
    url: ADMIN_ROUTE + JOBS + `/${jobId}` + APPLICANT + `/${applicantId}`,
  });

  // const primaryScheduleDate = new Date(applicantDetailData?.primary_schedule);

  // const renderJobDetailText = (heading, value, isMandatory, label, index) => {
  //   return (
  //     <TwoRow
  //       className={styles.gridItem}
  //       topSection={
  //         <Typography className={styles.headingText}>
  //           {intl.formatMessage({
  //             id: `label.${heading}`,
  //           })}
  //           {isMandatory ? <span className={styles.redText}> *</span> : null}
  //         </Typography>
  //       }
  //       bottomSection={
  //         <Typography className={styles.blackText}>
  //           {value ? value : "-"}
  //         </Typography>
  //       }
  //     />
  //   );
  // };

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={intl.formatMessage({ id: "label.companies" })}
        customStyles={styles.headerResponsiveStyle}
        rightSection={
          <CustomButton
            btnText={intl.formatMessage({ id: "label.addCompany" })}
            IconElement={PlusIcon}
            iconStyles={styles.btnIconStyles}
            customStyle={styles.btnCustomStyles}
          />
        }
      />
    </div>
  );
};

export default AllJobApplicantDetailModal;
