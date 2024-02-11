import React from "react";
import { Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { splitName } from "../../constant/utils";
import styles from "./MessageComponent.module.scss";

const MessageComponent = ({ messageData }) => {
  const { firstName, lastName } = splitName(messageData?.from?.name);

  return messageData?.from?.id === 1 ? (
    <TwoColumn
      className={styles.rightMessageContaier}
      leftSection={
        <TwoRow
          topSection={
            <Typography className={styles.rightTimeText}>
              {messageData?.created_at}
            </Typography>
          }
          bottomSection={
            <Typography className={styles.fromMessageText}>
              {messageData?.reply_text}
            </Typography>
          }
        />
      }
      rightSection={
        <ProfileIcon
          profileImageStyle={styles.profileImageStyle}
          {...{ firstName, lastName }}
          profileImage={messageData?.from?.profile_photo}
        />
      }
    />
  ) : (
    <TwoColumn
      className={styles.leftMessageContaier}
      leftSection={
        <ProfileIcon
          profileImageStyle={styles.profileImageStyle}
          {...{ firstName, lastName }}
          profileImage={messageData?.from?.profile_photo}
        />
      }
      rightSection={
        <TwoRow
          topSection={
            <Typography className={styles.leftTimeText}>
              {messageData?.created_at}
            </Typography>
          }
          bottomSection={
            <Typography className={styles.toMessageText}>
              {messageData?.reply_text}
            </Typography>
          }
        />
      }
    />
  );
};

export default MessageComponent;
