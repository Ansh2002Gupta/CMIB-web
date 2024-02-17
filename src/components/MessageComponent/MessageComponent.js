import React, { useContext } from "react";
import { Image, Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { splitName, formatDate, getMessageInfo } from "../../constant/utils";
import styles from "./MessageComponent.module.scss";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";

const MessageComponent = ({ messageData }) => {
  // const { firstName, lastName } = splitName(messageData?.from?.name);
  const firstName = "Utkarsh";
  const lastName = "Sharma";

  const [userProfileDetails] = useContext(UserProfileContext);
  const isSender = getMessageInfo(messageData, userProfileDetails?.userDetails);

  return isSender ? (
    <TwoColumn
      className={styles.rightMessageContaier}
      leftSection={
        <TwoRow
          topSection={
            <Typography className={styles.rightTimeText}>
              {formatDate({
                date: messageData?.created_at,
                dateFormat: "hh:mm A",
              })}
            </Typography>
          }
          bottomSection={
            <TwoRow
              className={styles.textAndImageContainer}
              topSectionStyle={{
                justifyContent: "flex-end",
              }}
              topSection={
                <Typography className={styles.fromMessageText}>
                  {messageData?.message}
                </Typography>
              }
              bottomSection={
                <Image
                  className={styles.chatImage}
                  preview={false}
                  // src={
                  //   "https://media.istockphoto.com/id/1454842745/photo/tourism.jpg?s=1024x1024&w=is&k=20&c=BNjHc6s8vfj2Ikp7IkCgbQxIgx129376UltSJ8gicO0="
                  // }
                  src={messageData?.file}
                />
              }
            />
          }
        />
      }
      rightSection={
        <ProfileIcon
          imageContainerStyle={styles.rightImageContainerStyle}
          profileImageStyle={styles.profileImageStyle}
          {...{ firstName, lastName }}
          profileImage={messageData?.author?.profile_photo}
        />
      }
    />
  ) : (
    <TwoColumn
      className={styles.leftMessageContaier}
      leftSection={
        <ProfileIcon
          imageContainerStyle={styles.leftImageContainerStyle}
          profileImageStyle={styles.profileImageStyle}
          {...{ firstName, lastName }}
          profileImage={messageData?.from?.profile_photo}
        />
      }
      rightSection={
        <TwoRow
          topSection={
            <Typography className={styles.leftTimeText}>
              {formatDate({
                date: messageData?.created_at,
                dateFormat: "hh:mm A",
              })}
            </Typography>
          }
          bottomSection={
            <Typography className={styles.toMessageText}>
              {messageData?.message}
            </Typography>
          }
        />
      }
    />
  );
};

export default MessageComponent;
