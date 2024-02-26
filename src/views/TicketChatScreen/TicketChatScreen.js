import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ChatSection from "../../containers/ChatSection";
import CustomLoader from "../../components/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import IconHeader from "../../containers/IconHeader";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import TicketDetails from "../../containers/TicketDetails";
import { CORE_ROUTE, REPLIES, TICKET_LIST } from "../../constant/apiEndpoints";
import useCloseTicketApi from "../../services/api-services/Tickets/useCloseTicketApi";
import useSendChatMessageApi from "../../services/api-services/Tickets/useSendChatMessageApi";
import useFetch from "../../core/hooks/useFetch";
import useShowNotification from "../../core/hooks/useShowNotification";
import useResponsive from "../../core/hooks/useResponsive";
import styles from "./TicketScreen.module.scss";

const TicketChatScreen = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);
  const [ticketStatus, setTicketStatus] = useState(false);
  const [isDetailsScreen, setIsDetailScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { id } = useParams();
  const {
    data: chatData,
    error,
    fetchData,
    isError,
    isLoading,
  } = useFetch({
    url: CORE_ROUTE + TICKET_LIST + `/${id}` + REPLIES,
  });

  const {
    data: ticketDetails,
    error: errorWhileFetchingTicketData,
    fetchData: fetchTicketData,
    isError: isGetErrorWhileFetchingTicket,
    isLoading: isFetchingTicketData,
  } = useFetch({
    url: CORE_ROUTE + TICKET_LIST + `/${id}`,
  });

  const {
    closeTicket,
    isError: isErrorCloseTicket,
    isLoading: isLoadingCloseTicket,
  } = useCloseTicketApi();

  const { sendMessage, isLoading: isSendingMessage } = useSendChatMessageApi();
  const { showNotification } = useShowNotification();

  const handleTicketClosed = () => {
    closeTicket({
      ticketId: id,
      onSuccessCallback: () => {
        fetchData({
          page: 1,
        });
        fetchTicketData({});
        setIsFirstPageReceived(false);
      },
    });
  };

  const handleOnMarkTicketAsClosed = () => {
    handleTicketClosed({
      ticketId: id,
      onSuccessCallback: () => {
        fetchData({
          queryParamsObject: {
            page: 1,
          },
          onSuccessCallback: () => {
            showNotification({
              text: intl.formatMessage({
                id: "label.ticketClosedSuccessfully",
              }),
              type: "success",
            });
          },
          onErrorCallback: (errorString) => {
            showNotification(errorString, "success");
            showNotification({
              text: errorString,
              type: "error",
            });
          },
        });
      },
    });
  };

  useEffect(() => {
    const fetchChatData = async () => {
      const requestedParams = {
        page: currentPage,
      };
      const initialData = await fetchData({
        queryParamsObject: requestedParams,
      });
      if (initialData && initialData?.records.length > 0) {
        setCurrentRecords(initialData?.records);
      }
      setIsFirstPageReceived(true);
    };
    fetchChatData();
  }, []);

  const handleSend = async (payload) => {
    if (isLoading) {
      return;
    }
    let newRecords = [];
    const newData = await sendMessage({
      ticketId: id,
      payload,
      onErrorCallback: (errorString) => showNotification(errorString, "error"),
    });

    newRecords.push(newData);
    setCurrentRecords((prevRecords) => [...newRecords, ...prevRecords]);
  };

  const isOnLastPage = currentPage === chatData?.meta?.lastPage;

  const handleLoadMore = async () => {
    if (chatData?.meta?.currentPage === chatData?.meta?.lastPage) {
      return;
    }
    if (isOnLastPage || loadingMore) {
      return;
    }
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    const newData = await fetchData({
      queryParamsObject: { page: nextPage },
    });
    if (newData && newData.records.length > 0) {
      setCurrentRecords((prevRecords) => [...prevRecords, ...newData.records]);
      setLoadingMore(false);
    }
    setCurrentPage(nextPage);
  };

  const handlePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const handlePopupClick = () => {
    handlePopup();
    setIsDetailScreen(true);
  };

  let reversedData = [];
  if (currentRecords?.length > 0) {
    reversedData = [...currentRecords].reverse();
  }

  const renderChatSection = () => {
    return (
      <>
        <ChatSection
          data={reversedData}
          {...{
            fetchData,
            isError,
            isLoading,
            error,
            id,
            handleLoadMore,
            isOnLastPage,
            ticketDetails,
            handleSend,
            isSendingMessage,
            loadingMore,
            ticketStatus,
          }}
        />
      </>
    );
  };

  const renderTicketDetails = () => {
    return (
      <TicketDetails
        {...{
          data: ticketDetails,
          fetchData: fetchTicketData,
          isLoading: isFetchingTicketData,
        }}
      />
    );
  };

  return (
    <>
      {isError && isGetErrorWhileFetchingTicket && (
        <div className={styles.erroContainerBox}>
          <ErrorMessageBox
            errorHeading={intl.formatMessage({ id: "label.errorMessage" })}
            errorText={intl.formatMessage({
              id: "label.generalGetApiFailedErrorMessage",
            })}
            onRetry={fetchData}
          />
        </div>
      )}
      {isFetchingTicketData && isLoading && !isFirstPageReceived ? (
        <CustomLoader />
      ) : (
        <>
          {!!currentRecords?.length && (
            <TwoRow
              className={styles.mainContainer}
              isBottomFillSpace
              topSection={
                <>
                  <IconHeader
                    {...{ fetchData, id }}
                    ticketData={ticketDetails}
                    isError={isErrorCloseTicket}
                    isLoading={isLoadingCloseTicket}
                    onLeftIconPress={handleOnMarkTicketAsClosed}
                    ticketStatus={ticketStatus}
                    onClickIconMore={handlePopup}
                    isDetailsScreen={isDetailsScreen}
                    onIconBackPress={() => {
                      setIsDetailScreen(false);
                    }}
                  />

                  {showPopup && (
                    <PopupMessage
                      message={"Ticket Details Screen"}
                      customStyle={styles.popupMessage}
                      onPopupClick={handlePopupClick}
                    />
                  )}
                </>
              }
              bottomSection={
                responsive.isMd ? (
                  <TwoColumn
                    className={styles.bottomContainer}
                    leftSectionStyle={{ flex: 5 }}
                    rightSectionStyle={{ flex: 2 }}
                    leftSection={renderChatSection()}
                    rightSection={renderTicketDetails()}
                  />
                ) : isDetailsScreen ? (
                  renderTicketDetails()
                ) : (
                  renderChatSection()
                )
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default TicketChatScreen;
