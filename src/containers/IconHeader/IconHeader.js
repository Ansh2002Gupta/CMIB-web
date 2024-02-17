import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoColumn } from "../../core/layouts";

import Chip from "../../components/Chip/Chip";
import CustomButton from "../../components/CustomButton/CustomButton";
import { ReactComponent as CheckIcon } from "../../themes/base/assets/images/white check icon.svg";
import useCloseTicketApi from "../../services/api-services/Tickets/useCloseTicketApi";
import useShowNotification from "../../core/hooks/useShowNotification";
import styles from "./IconHeader.module.scss";

const IconHeader = ({ fetchData, id, ticketData }) => {
  const intl = useIntl();
  const readable_id = ticketData?.readable_id || "--";
  const status = ticketData?.status || "--";
  const { showNotification, notificationContextHolder } = useShowNotification();

  const {
    errorWhileClosingTicket,
    closeTicketData,
    closeTicket,
    isError,
    isLoading,
    isSuccess,
    apiStatus,
    setErrorWhileClosingTicket,
  } = useCloseTicketApi();

  const handleOnMarkTicketAsClosed = () => {
    //integate API for marking ticker as closed
    closeTicket({
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

  let chipStatus = "";
  if (status?.toLowerCase() === "progress") {
    chipStatus = "blue";
  }
  if (status?.toLowerCase() === "pending") {
    chipStatus = "orange";
  }
  if (status?.toLowerCase() === "closed") {
    chipStatus = "green";
  }

  return (
    <>
      {notificationContextHolder}
      <TwoColumn
        className={styles.mainContainer}
        leftSection={
          <TwoColumn
            className={styles.box}
            leftSection={
              <Typography className={styles.adminId}>{readable_id}</Typography>
            }
            rightSection={<Chip color={chipStatus} label={status} />}
          />
        }
        rightSection={
          <CustomButton
            IconElement={CheckIcon}
            btnText={intl.formatMessage({ id: "label.markClosed" })}
            onClick={handleOnMarkTicketAsClosed}
            customStyle={styles.btn}
          />
        }
      />
    </>
  );
};

export default IconHeader;
