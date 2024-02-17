import React, { useContext, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { Upload } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "../../core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import MessageComponent from "../../components/MessageComponent";
import useFetch from "../../core/hooks/useFetch";
import useShowNotification from "../../core/hooks/useShowNotification";
import useHandleInfiniteScroll from "../../services/api-services/Pagination/useInfiniteScroll";
import useSendChatMessageApi from "../../services/api-services/Tickets/useSendChatMessageApi";
import useUploadImageApi from "../../services/api-services/Image/useUploadImageApi";
import { ReactComponent as Attachment } from "../../themes/base/assets/icons/attachment.svg";
import { CORE_ROUTE, REPLIES, TICKET_LIST } from "../../constant/apiEndpoints";
import { ReactComponent as ActiveIcon } from "../../themes/base/assets/images/send message.svg";
import { classes } from "./ChatSection.styles";
import styles from "./ChatSection.module.scss";

const ChatSection = ({ id }) => {
  // from where we will get this id,

  const { data, error, fetchData, isError, isLoading } = useFetch({
    url: CORE_ROUTE + TICKET_LIST + `/${id}` + REPLIES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  // 3rd party hooks
  const intl = useIntl();
  const responsive = useResponsive();
  const messageListRef = useRef();

  // useStates hooks
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const isOnLastPage = currentPage === data?.meta?.lastPage;

  // custom hooks
  const getChatData = () => {
    if (isOnLastPage) {
      return;
    }
    fetchData({
      queryParamsObject: {
        page: currentPage,
      },
      onSuccessCallback: (updatedData) => {
        setCurrentPage((prev) => prev + 1);
        setMessages((prev) => {
          return [...updatedData?.records, ...prev];
        });
      },
    });
  };
  useHandleInfiniteScroll(getChatData, messageListRef);
  const { sendMessage, isLoading: isSendingMessage } = useSendChatMessageApi();

  const {
    errorWhileUploadingImage,
    handleUploadImage,
    isLoading: isUploadingImage,
  } = useUploadImageApi();

  const { showNotification, notificationContextHolder } = useShowNotification();

  // functions
  const handleInputChange = (val) => {
    setMessageValue(val.target.value);
  };

  const handleOnRetry = () => {
    fetchData({
      queryParamsObject: {
        page: 1,
      },
      onSuccessCallback: (updatedData) => {
        setMessages(updatedData?.records);
      },
    });
  };

  const handleOnSendMessageText = () => {
    if (!messageValue?.length && !messageValue?.trim()?.length) {
      return;
    }
    sendMessage({
      ticketId: id,
      payload: {
        reply_text: messageValue,
      },
      onErrorCallback: (errorString) => showNotification(errorString, "error"),
      onSuccessCallback: () => {
        setMessageValue("");
        handleOnRetry();
      },
    });
  };

  const handleSendImage = (imageName) => {
    sendMessage({
      ticketId: id,
      payload: {
        file_name: imageName,
      },
      onErrorCallback: (errorString) => showNotification(errorString, "error"),
      onSuccessCallback: () => {
        handleOnRetry();
      },
    });
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

  const isShowLoaderOnMainScreen = currentPage === 0 && isLoading;
  const isShowLoaderOnTopOfChat = currentPage >= 1 && isLoading;

  useEffect(() => {
    fetchData({
      queryParamsObject: {
        page: 1,
      },
      onSuccessCallback: (updatedData) => {
        setCurrentPage((prev) => prev + 1);
        setMessages((prev) => {
          return [...updatedData?.records, ...prev];
        });
      },
    });
  }, []);

  return (
    <>
      {notificationContextHolder}
      {isError && !isOnLastPage && (
        <ErrorMessageBox
          errorHeading={intl.formatMessage({ id: "label.errorMessage" })}
          error={error?.data?.message || error}
          onRetry={handleOnRetry}
        />
      )}
      {isShowLoaderOnMainScreen && <CustomLoader />}
      {!isShowLoaderOnMainScreen && !isError && (
        <TwoRow
          className={styles.mainContainer}
          topSection={
            <div className={styles.loaderAndChatContainer}>
              {isShowLoaderOnTopOfChat && <CustomLoader size="medium" />}
              <div className={styles.messagesContainer} ref={messageListRef}>
                {messages
                  ?.slice()
                  ?.reverse()
                  ?.map((item) => {
                    return <MessageComponent messageData={item} />;
                  })}
              </div>
            </div>
          }
          topSectionStyle={{ flex: 1 }}
          bottomSectionStyle={
            responsive.isMd
              ? classes.bottomSectionStyle
              : classes.mobileBottomSectionStyle
          }
          bottomSection={
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
                      placeholder={intl.formatMessage({ id: "label.typeHere" })}
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
                    isBtnDisable={isSendingMessage}
                    IconElement={ActiveIcon}
                    onClick={() => {
                      handleOnSendMessageText();
                    }}
                  />
                }
              />
            </form>
          }
        />
      )}
    </>
  );
};

export default ChatSection;
