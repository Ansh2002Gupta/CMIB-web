import React, { useContext, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { Image, Typography, Upload } from "antd";

import { ThemeContext } from "core/providers/theme";
import { TwoColumn, TwoRow } from "../../core/layouts";

import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import MessageComponent from "../../components/MessageComponent";
import MessageInfoComponent from "../../components/MessageInfoComponent/MessageInfoComponent";
import useShowNotification from "../../core/hooks/useShowNotification";
import useHandleInfiniteScroll from "../../services/api-services/Pagination/useInfiniteScroll";
import useUploadImageApi from "../../services/api-services/Image/useUploadImageApi";
import { MESSAGE_MAX_LENGTH } from "../../constant/constant";
import { ReactComponent as Attachment } from "../../themes/base/assets/icons/attachment.svg";
import useResponsive from "../../core/hooks/useResponsive";
import { ReactComponent as ActiveIcon } from "../../themes/base/assets/images/send message.svg";
import {
  formatDate,
  getDateStatus,
  getImageSource,
  getTime,
} from "../../constant/utils";
import { classes } from "./ChatSection.styles";
import styles from "./ChatSection.module.scss";

const ChatSection = ({
  data,
  handleLoadMore,
  handleSend,
  loadingMore,
  isSendingMessage,
  ticketDetails,
}) => {
  // 3rd party hooks
  const intl = useIntl();
  const responsive = useResponsive();
  const { getImage } = useContext(ThemeContext);

  // useStates hooks
  const [messageValue, setMessageValue] = useState("");
  const [file, setFile] = useState("");
  const scrollToLatestMessageRef = useRef(null);
  const inputAttachmentRef = useRef();
  const inputRef = useRef();
  const messageListRef = useRef();

  const handleScrollToLastMessage = (scrollref) => {
    if (scrollref.current) {
      const element = scrollref.current;
      element.scrollIntoView({ behaviour: "smooth" });
    }
  };

  useEffect(() => {
    handleScrollToLastMessage(scrollToLatestMessageRef);
  }, []);

  useHandleInfiniteScroll(handleLoadMore, messageListRef);

  const { handleUploadImage, isLoading: isImageUpload } = useUploadImageApi();

  const { showNotification, notificationContextHolder } = useShowNotification();

  const handleInputChange = (val) => {
    setMessageValue(val.target.value);
  };

  const handleOnSendMessageText = async (e) => {
    e.preventDefault();
    const trimmedValue = messageValue.trim();
    if (!trimmedValue && !file) {
      return;
    }
    if (!!file) {
      handleUploadImage({
        file: file?.file,
        onSuccessCallback: async (fileUrl, fileName) => {
          const payload = { reply_text: messageValue, file_name: fileName };
          await handleSend(payload);
          handleScrollToLastMessage(scrollToLatestMessageRef);
        },
        onErrorCallback: (errorString) => {
          showNotification(errorString, "error");
        },
      });
    } else {
      const payload = { reply_text: messageValue };
      await handleSend(payload);
      handleScrollToLastMessage(scrollToLatestMessageRef);
    }
    setMessageValue("");
    setFile("");
    inputRef.current.focus();
  };

  const handleOnUploadImage = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const isAllowedType = allowedTypes.includes(file?.file?.type);
    const isLessThan5MB = file?.file?.size / 1024 / 1024 < 5;

    if (!isAllowedType) {
      showNotification({
        text: intl.formatMessage({ id: "label.onlyJpgAndPngFile" }),
        type: "error",
        headingText: intl.formatMessage({ id: "label.errorMessage" }),
      });
      return Upload.LIST_IGNORE;
    }
    if (!isLessThan5MB) {
      showNotification({
        text: intl.formatMessage({ id: "label.fileUpto5MB" }),
        type: "error",
      });
      return Upload.LIST_IGNORE;
    }

    if (isAllowedType && isLessThan5MB) {
      setFile(file);
      handleScrollToLastMessage(inputAttachmentRef);
    }
  };

  const getSendButtonStatus = () => {
    if (isSendingMessage) {
      return true;
    }
    if (!!file) {
      return false;
    }
    if (!!messageValue) {
      return false;
    }
    if (!!file && !!messageValue) {
      return false;
    }
    return true;
  };

  const shouldShowAvatar = (currentIndex) => {
    const comparisonIndex = currentIndex - 1;
    if (currentIndex === 0) {
      return true;
    }
    if (comparisonIndex < 0 || comparisonIndex >= data.length) {
      return false;
    }
    const currentMessage = data[currentIndex];
    const comparisonMessage = data[comparisonIndex];
    if (currentMessage?.author?.type !== comparisonMessage?.author?.type) {
      return true;
    }
    const currentTime = getTime(currentMessage?.created_at);
    const comparisonTime = getTime(comparisonMessage?.created_at);
    return currentTime !== comparisonTime;
  };

  const renderHorizontalLine = () => {
    return <div className={styles.horizontalLine} />;
  };

  let messageLastFlag = "";
  let isFirstMessage = true;

  return (
    <>
      {notificationContextHolder}
      <TwoRow
        className={styles.mainContainer}
        topSection={
          <div className={styles.loaderAndChatContainer}>
            {loadingMore && <CustomLoader size="medium" />}
            <div className={styles.messagesContainer} ref={messageListRef}>
              {data?.map((item, index) => {
                const messageFlag = getDateStatus(item?.created_at);

                if (isFirstMessage || messageLastFlag !== messageFlag) {
                  isFirstMessage = false;
                  messageLastFlag = messageFlag;

                  const key = `message-${item?.id || index}`;
                  return (
                    <React.Fragment key={key}>
                      {!!messageLastFlag && (
                        <div className={styles.flagContainer}>
                          {renderHorizontalLine()}
                          <Typography className={styles.messageFlag}>
                            {messageLastFlag}
                          </Typography>
                          {renderHorizontalLine()}
                        </div>
                      )}
                      {item?.author?.type.toLowerCase() === "system" && (
                        <MessageInfoComponent message={item?.message} />
                      )}
                      <MessageComponent
                        messageData={item}
                        index={index}
                        shouldShowAvatar={shouldShowAvatar}
                      />
                    </React.Fragment>
                  );
                } else {
                  return (
                    <>
                      {item?.author?.type.toLowerCase() === "system" && (
                        <MessageInfoComponent message={item?.message} />
                      )}
                      <MessageComponent
                        messageData={item}
                        index={index}
                        shouldShowAvatar={shouldShowAvatar}
                      />
                    </>
                  );
                }
              })}
              <div ref={scrollToLatestMessageRef} />
            </div>
          </div>
        }
        isTopFillSpace
        bottomSectionStyle={
          responsive.isMd
            ? classes.bottomSectionStyle
            : classes.mobileBottomSectionStyle
        }
        bottomSection={
          ticketDetails?.status.toLowerCase() === "in-progress" && (
            <form
              className={styles.textInputFormContainer}
              onSubmit={(e) => {
                handleOnSendMessageText(e);
              }}
            >
              <TwoRow
                topSection={
                  <TwoColumn
                    className={styles.textInputContainer}
                    leftSectionStyle={{ flex: 1 }}
                    leftSection={
                      <>
                        <CustomInput
                          ref={inputRef}
                          disabled={isSendingMessage}
                          customContainerStyles={styles.customContainerStyles}
                          customInputStyles={[
                            styles.customInputStyles,
                            styles.inputField,
                          ].join(" ")}
                          onChange={(val) => handleInputChange(val)}
                          SuffixIcon={Attachment}
                          maxLength={MESSAGE_MAX_LENGTH}
                          onSuffixElementClick={() => {
                            document
                              .querySelector("#fileUploadTrigger")
                              .click();
                          }}
                          value={messageValue}
                          placeholder={intl.formatMessage({
                            id: "label.typeHere",
                          })}
                          type="text"
                        />
                        <Upload
                          customRequest={handleOnUploadImage}
                          accept=".jpg,.jpeg,.png"
                          className={styles.upload}
                        >
                          <button id="fileUploadTrigger" type="button" />
                        </Upload>
                      </>
                    }
                    rightSection={
                      <CustomButton
                        customStyle={styles.sendImage}
                        isBtnDisable={getSendButtonStatus()}
                        IconElement={ActiveIcon}
                        type="submit"
                        loading={isSendingMessage || isImageUpload}
                      />
                    }
                  />
                }
                bottomSection={
                  !!file && (
                    <div
                      className={styles.uploadImageStyle}
                      ref={inputAttachmentRef}
                    >
                      <Image
                        src={getImageSource(file?.file)}
                        className={styles.imageStyle}
                      />
                      <div className={styles.crossImageContainer}>
                        <Image
                          onClick={() => setFile("")}
                          src={getImage("cross")}
                          preview={false}
                        />
                      </div>
                    </div>
                  )
                }
              />
            </form>
          )
        }
      />
    </>
  );
};

export default ChatSection;
