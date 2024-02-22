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

  const { firstName, lastName } = splitName(data?.chat_partner_details?.name);

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
          topSection={
            <ThreeRow
              className={styles.profileDetails}
              topSection={
                <ProfileIcon
                  firstName={firstName}
                  lastName={lastName}
                  profileImage={data?.chat_partner_details?.profile_photo}
                />
              }
              middleSection={
                <Typography className={styles.nameText}>
                  {data?.chat_partner_details?.name}
                </Typography>
              }
              bottomSection={
                <>
                  {data?.chat_partner_details?.type.toLowerCase() ===
                  "company" ? (
                    <Typography className={styles.ticketIdText}>
                      {data?.chat_partner_details?.type}
                    </Typography>
                  ) : (
                    <Typography className={styles.ticketIdText}>
                      {data?.chat_partner_details?.registeration_no}
                    </Typography>
                  )}
                </>
              }
            />
          }
          bottomSection={
            <ThreeRow
              className={styles.bottomContainer}
              topSection={
                <TwoRow
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
                  bottomSection={
                    <TwoRow
                      className={styles.contentDetails}
                      topSection={
                        <Typography className={styles.contentHeadingText}>
                          {intl.formatMessage({ id: "label.company_name" })}
                        </Typography>
                      }
                      bottomSection={
                        <Typography className={styles.contentDetailText}>
                          {data?.chat_partner_details?.company_name || "-"}
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
