import React from "react";

import useResponsive from "../../core/hooks/useResponsive";
import { TwoColumn, TwoRow } from "../../core/layouts";

import ChatSection from "../../containers/ChatSection";
import IconHeader from "../../containers/IconHeader";
import TicketDetails from "../../containers/TicketDetails";
import styles from "./TicketScreen.module.scss";
import { ticket_replies } from "../../dummyData";

const TicketChatScreen = () => {
  const responsive = useResponsive();

  return (
    <TwoRow
      className={styles.mainContainer}
      bottomSectionStyle={{ flex: 1 }}
      topSection={<IconHeader />}
      bottomSection={
        responsive.isMd ? (
          <TwoColumn
            className={styles.bottomContainer}
            leftSectionStyle={{ flex: 5 }}
            rightSectionStyle={{ flex: 2 }}
            leftSection={<ChatSection data={ticket_replies} />}
            rightSection={<TicketDetails />}
          />
        ) : (
          <ChatSection data={ticket_replies} />
        )
      }
    />
  );
};

export default TicketChatScreen;
