import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { Typography, Upload } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import MessageComponent from "../../components/MessageComponent";
import MessageInfoComponent from "../../components/MessageInfoComponent/MessageInfoComponent";
import useShowNotification from "../../core/hooks/useShowNotification";
import useHandleInfiniteScroll from "../../services/api-services/Pagination/useInfiniteScroll";
import useUploadImageApi from "../../services/api-services/Image/useUploadImageApi";
import { ReactComponent as Attachment } from "../../themes/base/assets/icons/attachment.svg";
import useResponsive from "../../core/hooks/useResponsive";
import { ReactComponent as ActiveIcon } from "../../themes/base/assets/images/send message.svg";
import { getDateStatus, getTime } from "../../constant/utils";
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
  const messageListRef = useRef();

  // useStates hooks
  const [messageValue, setMessageValue] = useState("");
  const scrollToLatestMessageRef = useRef(null);

  useEffect(() => {
    if (scrollToLatestMessageRef.current) {
      const element = scrollToLatestMessageRef.current;
      element.scrollIntoView({ behaviour: "smooth" });
    }
  }, []);

  useHandleInfiniteScroll(handleLoadMore, messageListRef);

  const { handleUploadImage } = useUploadImageApi();

  const { showNotification, notificationContextHolder } = useShowNotification();

  // functions
  const handleInputChange = (val) => {
    setMessageValue(val.target.value);
  };

  const handleOnSendMessageText = () => {
    if (!messageValue?.length && !messageValue?.trim()?.length) {
      return;
    }
    const payload = {
      reply_text: messageValue,
    };
    handleSend(payload);
    setMessageValue("");
  };

  const handleSendImage = (imageName) => {
    const payload = {
      reply_text: "",
      file_name: imageName,
    };
    handleSend(payload);
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
      handleUploadImage({
        file: file?.file,
        onSuccessCallback: (fileUrl, fileName) => {
          handleSendImage(fileName);
        },
        onErrorCallback: (errorString) => {
          showNotification(errorString, "error");
        },
      });
    }
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
                return (
                  <>
                    {!!messageFlag && (
                      <div className={styles.flagContainer}>
                        {renderHorizontalLine()}
                        <Typography className={styles.messageFlag}>
                          {messageFlag}
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
                    <div ref={scrollToLatestMessageRef} />
                  </>
                );
              })}
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
            <form className={styles.textInputFormContainer}>
              <TwoColumn
                className={styles.textInputContainer}
                leftSectionStyle={{ flex: 1 }}
                leftSection={
                  <>
                    <CustomInput
                      disabled={isSendingMessage}
                      customContainerStyles={styles.customContainerStyles}
                      customInputStyles={[
                        styles.customInputStyles,
                        styles.inputField,
                      ].join(" ")}
                      onChange={(val) => handleInputChange(val)}
                      SuffixIcon={Attachment}
                      onSuffixElementClick={() =>
                        document.querySelector("#fileUploadTrigger").click()
                      }
                      value={messageValue}
                      placeholder={intl.formatMessage({
                        id: "label.typeHere",
                      })}
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
                    isBtnDisable={isSendingMessage || !messageValue}
                    IconElement={ActiveIcon}
                    onClick={() => {
                      handleOnSendMessageText();
                    }}
                  />
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
