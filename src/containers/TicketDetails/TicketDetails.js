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

// Need to complete implementation of the remaining API.
const TicketDetails = () => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const { firstName, lastName } = splitName(
    userProfileDetails?.userDetails?.name
  );
  console.log({ vvv: userProfileDetails?.userDetails });
  const ticketDetailsConfig = [{}];
  const id = 1;

  const { data, error, fetchData, isError, isLoading, isSuccess, setData } =
    useFetch({
      url: CORE_ROUTE + TICKET_LIST + `/${id}`,
    });

  const errorString = error?.data?.message || error;

  const intl = useIntl();

  // const handleOnRetry = () => {};

  return (
    <>
      {isError && (
        <div className={styles.errorBox}>
          <ErrorMessageBox
            errorHeading={intl.formatMessage({ id: "label.errorMessage" })}
            errorText={errorString}
            onRetry={fetchData}
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
                  {userProfileDetails?.userDetails?.name}
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
                      {data?.query_type}
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
                      {"Query Type"}
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
