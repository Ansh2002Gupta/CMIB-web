import React, { useContext } from "react";

import { ThreeRow, TwoRow } from "../../core/layouts";

import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { formatDate, splitName } from "../../constant/utils";
import styles from "./TicketDetails.module.scss";
import useFetch from "../../core/hooks/useFetch";
import { Typography } from "antd";
import { useIntl } from "react-intl";
import { CORE_ROUTE, TICKET_LIST } from "../../constant/apiEndpoints";
import CustomLoader from "../../components/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox";

const TicketDetails = ({ data, fetchData, isError, isLoading, error }) => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const intl = useIntl();

  const errorString = error?.data?.message || error;

  const { firstName, lastName } = splitName(data?.assigned_to?.name);

  return (
    <>
      {isError && (
        <div className={styles.errorBox}>
          <ErrorMessageBox
            errorHeading={intl.formatMessage({ id: "label.errorMessage" })}
            errorText={errorString}
            onRetry={() => fetchData({})}
            customContainerStyles={styles.errorContainer}
          />
        </div>
      )}
      {isLoading && !errorString && <CustomLoader />}
      {!isLoading && !errorString && (
        <TwoRow
          className={styles.profileContainer}
          topSectionStyle={{ width: "100%" }}
          topSection={
            <ThreeRow
              className={styles.profileDetails}
              topSection={
                <ProfileIcon
                  firstName={firstName}
                  lastName={lastName}
                  profileImage={userProfileDetails?.userDetails?.profile_photo}
                />
              }
              middleSection={
                <Typography className={styles.nameText}>
                  {data?.assigned_to?.name}
                </Typography>
              }
              bottomSection={
                <Typography className={styles.ticketIdText}>
                  {data?.readable_id}
                </Typography>
              }
            />
          }
          bottomSectionStyle={{ width: "100%" }}
          bottomSection={
            <ThreeRow
              className={styles.bottomContainer}
              topSection={
                <TwoRow
                  className={styles.contentDetails}
                  topSection={
                    <Typography className={styles.contentHeadingText}>
                      {intl.formatMessage({ id: "label.role" })}
                    </Typography>
                  }
                  bottomSection={
                    <Typography className={styles.contentDetailText}>
                      {data?.assigned_to?.type}
                    </Typography>
                  }
                />
              }
              middleSection={
                <TwoRow
                  className={styles.contentDetails}
                  topSection={
                    <Typography className={styles.contentHeadingText}>
                      {intl.formatMessage({ id: "label.queryType" })}
                    </Typography>
                  }
                  bottomSection={
                    <Typography className={styles.contentDetailText}>
                      {data?.query_type}
                    </Typography>
                  }
                />
              }
              bottomSection={
                <TwoRow
                  className={styles.contentDetails}
                  topSection={
                    <Typography className={styles.contentHeadingText}>
                      {intl.formatMessage({ id: "label.createdOn" })}
                    </Typography>
                  }
                  bottomSection={
                    <Typography className={styles.contentDetailText}>
                      {formatDate({
                        date: data?.created_at,
                      })}
                    </Typography>
                  }
                />
              }
            />
          }
        />
      )}
    </>
  );
};

export default TicketDetails;
