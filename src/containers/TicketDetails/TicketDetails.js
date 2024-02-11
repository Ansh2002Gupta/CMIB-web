import React, { useContext } from "react";

import { ThreeRow, TwoRow } from "../../core/layouts";

import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { splitName } from "../../constant/utils";
import styles from "./TicketDetails.module.scss";
import { Typography } from "antd";
import { useIntl } from "react-intl";

const TicketDetails = () => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const { firstName, lastName } = splitName(
    userProfileDetails?.userDetails?.name
  );
  const ticketDetailsConfig = [{}];

  const intl = useIntl();

  return (
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
              {"NRO0123456"}
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
                  {"Candidate/Member"}
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
                  {"10/10/2023"}
                </Typography>
              }
            />
          }
        />
      }
    />
  );
};

export default TicketDetails;
