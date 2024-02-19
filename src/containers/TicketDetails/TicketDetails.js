import React, { useContext } from "react";

import { useIntl } from "react-intl";
import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";

import ErrorMessageBox from "../../components/ErrorMessageBox";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { formatDate, splitName } from "../../constant/utils";
import { Typography } from "antd";
import useResponsive from "../../core/hooks/useResponsive";
import styles from "./TicketDetails.module.scss";

const TicketDetails = ({ data, fetchData, isError, error }) => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const intl = useIntl();
  const responsive = useResponsive();

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
      {responsive.isMd ? (
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
                      {data?.chat_partner_details?.type}
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
      ) : (
        <div className={styles.container}>
          <ThreeRow
            className={styles.mainContainer}
            topSection={
              <TwoColumn
                leftSection={
                  <TwoRow
                    className={styles.contentDetails}
                    topSection={
                      <Typography className={styles.contentHeadingText}>
                        {intl.formatMessage({ id: "label.tickeNumber" })}
                      </Typography>
                    }
                    bottomSection={
                      <Typography className={styles.contentDetailText}>
                        {data?.readable_id}
                      </Typography>
                    }
                  />
                }
                isLeftFillSpace
                rightSection={
                  <TwoRow
                    className={styles.contentDetails}
                    topSection={
                      <Typography className={styles.contentHeadingText}>
                        {intl.formatMessage({ id: "label.status" })}
                      </Typography>
                    }
                    bottomSection={
                      <Typography className={styles.contentDetailText}>
                        {data?.status}
                      </Typography>
                    }
                  />
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
                    {intl.formatMessage({ id: "label.date_create_on" })}
                  </Typography>
                }
                bottomSection={
                  <Typography className={styles.contentDetailText}>
                    {formatDate({ date: data?.created_at })}
                  </Typography>
                }
              />
            }
          />
        </div>
      )}
    </>
  );
};

export default TicketDetails;
