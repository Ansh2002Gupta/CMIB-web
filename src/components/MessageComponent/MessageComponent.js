import React, { useContext } from "react";
import { Image, Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { splitName, formatDate, getMessageInfo } from "../../constant/utils";
import styles from "./MessageComponent.module.scss";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";

const MessageComponent = ({ messageData, index, shouldShowAvatar }) => {
  const { firstName, lastName } = splitName(messageData?.author?.name);

  const [userProfileDetails] = useContext(UserProfileContext);
  const isSender = getMessageInfo(messageData, userProfileDetails?.userDetails);

  switch (isSender) {
    case "sender":
      return (
        <>
          {shouldShowAvatar(index) ? (
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
                      topSection={
                        <Typography className={styles.fromMessageText}>
                          {messageData?.message}
                        </Typography>
                      }
                      bottomSection={
                        !!messageData?.file && (
                          <Image
                            className={styles.chatImage}
                            preview={false}
                            src={messageData?.file}
                          />
                        )
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
            <TwoRow
              className={styles.textAndImageContainer}
              topSection={
                <div className={styles.noAvatarContainer}>
                  <Typography className={styles.fromMessageText}>
                    {messageData?.message}
                  </Typography>
                </div>
              }
              bottomSection={
                !!messageData?.file && (
                  <Image
                    className={styles.chatImage}
                    preview={false}
                    src={messageData?.file}
                  />
                )
              }
            />
          )}
        </>
      );
    case "receiver":
      return (
        <>
          {shouldShowAvatar(index) ? (
            <TwoColumn
              className={styles.leftMessageContaier}
              leftSection={
                <ProfileIcon
                  imageContainerStyle={styles.leftImageContainerStyle}
                  profileImageStyle={styles.profileImageStyle}
                  {...{ firstName, lastName }}
                  profileImage={messageData?.author?.profile_photo}
                />
              }
              rightSection={
                <>
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
                      <TwoRow
                        topSection={
                          <div className={styles.leftTextMessage}>
                            <Typography className={styles.toMessageText}>
                              {messageData?.message}
                            </Typography>
                          </div>
                        }
                        bottomSection={
                          !!messageData?.file && (
                            <Image
                              className={styles.chatImage}
                              preview={false}
                              src={messageData?.file}
                            />
                          )
                        }
                      />
                    }
                  />
                </>
              }
            />
          ) : (
            <>
              <TwoRow
                className={styles.leftMessageContaierWithoutAvatar}
                topSection={
                  <Typography className={styles.toMessageText}>
                    {messageData?.message}
                  </Typography>
                }
                bottomSection={
                  !!messageData?.file && (
                    <Image
                      className={styles.chatImage}
                      preview={false}
                      src={messageData?.file}
                    />
                  )
                }
              />
            </>
          )}
        </>
      );

    default:
      return <></>;
  }
};

export default MessageComponent;
